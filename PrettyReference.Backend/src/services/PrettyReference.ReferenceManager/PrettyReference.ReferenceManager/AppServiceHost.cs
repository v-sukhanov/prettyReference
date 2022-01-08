using System.Threading.Tasks;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PrettyReference.ReferenceManager.Core.RefGroupManagers;
using PrettyReference.ReferenceManager.Core.RefManagers;
using PrettyReference.ReferenceManager.Handlers.CreateRefGroup;
using PrettyReference.ReferenceManager.Handlers.DeleteReference;
using PrettyReference.ReferenceManager.Handlers.DeleteRefGroup;
using PrettyReference.ReferenceManager.Handlers.GetReferenceList;
using PrettyReference.ReferenceManager.Handlers.GetRefGroupList;
using PrettyReference.ReferenceManager.Handlers.SaveReference;
using Serilog;

namespace PrettyReference.ReferenceManager
{
        public class AppServiceHost
    {
        public ServiceProvider ServiceProvider { get; private set; }
        private readonly IServiceCollection _serviceCollection;
        private readonly IConfiguration _configuration;
        
        public AppServiceHost(IServiceCollection serviceCollection, IConfiguration configuration)
        {
            _serviceCollection = serviceCollection;
            _configuration = configuration;
        }
        
        private void AddMassTransit(IServiceCollection serviceCollection)
        {
            serviceCollection.AddMassTransit(busConfigurator =>
            {
                busConfigurator.AddConsumer<SaveReferenceHandler>();
                busConfigurator.AddConsumer<GetReferenceHandler>();
                busConfigurator.AddConsumer<DeleteReferenceHandler>();
                busConfigurator.AddConsumer<CreateRefGroupHandler>();
                busConfigurator.AddConsumer<DeleteRefGroupHandler>();
                busConfigurator.AddConsumer<GetRefGroupListHandler>();
                busConfigurator.UsingRabbitMq((context, config) =>
                {
                    config.Host(!string.IsNullOrEmpty(_configuration["RABBITMQ_HOST"]) ? _configuration["RABBITMQ_HOST"] : "rabbitmq", !string.IsNullOrEmpty(_configuration["RABBIT_VIRTUAL_APP"]) ? _configuration["RABBIT_VIRTUAL_APP"] : "/", hostConfigurator =>
                    {
                        hostConfigurator.Username(!string.IsNullOrEmpty(_configuration["RABBIT_USERNAME"]) ? _configuration["RABBIT_USERNAME"] : "guest");
                        hostConfigurator.Password(!string.IsNullOrEmpty(_configuration["RABBIT_PASSWORD"]) ? _configuration["RABBIT_PASSWORD"] : "guest");
        
                        config.ConfigureEndpoints(context);
                    });
                });
            });
        
            serviceCollection.AddMassTransitHostedService();
        }
        
        private void AddServices(IServiceCollection serviceCollection)
        {

            serviceCollection.AddScoped<RefManager>();
            serviceCollection.AddScoped<RefGroupManager>();
            serviceCollection.AddScoped<SaveReferenceHandler>();
            serviceCollection.AddScoped<GetReferenceHandler>();
            serviceCollection.AddScoped<DeleteReferenceHandler>();
            serviceCollection.AddScoped<CreateRefGroupHandler>();
            serviceCollection.AddScoped<DeleteRefGroupHandler>();
            serviceCollection.AddScoped<GetRefGroupListHandler>();
            
            serviceCollection.AddDbContext<AppDbContext>(opts =>
            {
                opts.UseMySql(_configuration["MYSQL"], ServerVersion.Parse("8.0"));
            });
        }
        
        public async Task Start()
        {
            Log.Information("PRETTY-REFERENCE-REFERENCE-MANAGER");
            AddServices(_serviceCollection);
            AddMassTransit(_serviceCollection);
            
            ServiceProvider = _serviceCollection.BuildServiceProvider();
            
            using (var scope = ServiceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                await dbContext.Database.MigrateAsync();
            }
            var busControl = ServiceProvider.GetRequiredService<IBusControl>();
            await busControl.StartAsync();
            Log.Information("PRETTY-REFERENCE-REFERENCE-MANAGER");
         
        }
    }

}