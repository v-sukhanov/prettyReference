using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PrettyReference.Crawler.Core.CrawlerClients;
using Serilog;

namespace PrettyReference.Crawler
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
                // busConfigurator.AddConsumer<SendMessageToUserHandler>();
                busConfigurator.UsingRabbitMq((context, config) =>
                {
                    config.Host(!string.IsNullOrEmpty(_configuration["RABBITMQ_HOST"]) ? _configuration["RABBITMQ_HOST"] : "127.0.0.1", !string.IsNullOrEmpty(_configuration["RABBIT_VIRTUAL_APP"]) ? _configuration["RABBIT_VIRTUAL_APP"] : "/", hostConfigurator =>
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
            serviceCollection.AddScoped<CrawlerClient>();
         
            // serviceCollection.AddDbContext<AppDbContext>(opts =>
            // {
            //     opts.UseMySql(_configuration["MYSQL"], ServerVersion.Parse("8.0"));
            // });
        }
        
        public async Task Start()
        {
            Log.Information("PRETTY-REFERENCE-CRAWLER");
            AddServices(_serviceCollection);
            AddMassTransit(_serviceCollection);
        
            ServiceProvider = _serviceCollection.BuildServiceProvider();

            // using (var scope = ServiceProvider.CreateScope())
            // {
            //     var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            //     await dbContext.Database.MigrateAsync();
            // }

            // var busControl = ServiceProvider.GetRequiredService<IBusControl>();
            // await busControl.StartAsync();
            var crawler = ServiceProvider.GetRequiredService<CrawlerClient>();
            Log.Information("PRETTY-REFERENCE-CRAWLER");
        }
    }
}