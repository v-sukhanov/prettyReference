using System.Threading.Tasks;
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
            // AddMassTransit(_serviceCollection);
        
            ServiceProvider = _serviceCollection.BuildServiceProvider();

            // using (var scope = ServiceProvider.CreateScope())
            // {
            //     var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            //     await dbContext.Database.MigrateAsync();
            // }

            // var busControl = ServiceProvider.GetRequiredService<IBusControl>();
            // await busControl.StartAsync();
            var crawler = ServiceProvider.GetRequiredService<CrawlerClient>();
            var data = crawler.GetMetaDataByUrl("https://github.com/sudheerj/angular-interview-questions/blob/master/README.md?utm_source=pocket_mylist");
            Log.Information($"{data.Title}, {data.Image}, {data.Url}, {data.Source}");
            Log.Information("PRETTY-REFERENCE-CRAWLER");
        }
    }
}