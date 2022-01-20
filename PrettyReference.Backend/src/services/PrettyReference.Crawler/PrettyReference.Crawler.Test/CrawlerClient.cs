using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using PrettyReference.Crawler.Core.CrawlerClients;
using PrettyReference.Crawler.Interface.GetMetaData;
using Serilog;

namespace PrettyReference.Crawler.Test
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        private async Task<AppServiceHost> BuildTestHost()
        {
            var config = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .AddUserSecrets<Tests>()
                .Build();
            var services = new ServiceCollection();

            Log.Information("Starting");
            var host = new AppServiceHost(services, config);
            await host.Start();
            return host;
        }
        
        [Test]
        public async Task GetSiteDate()
        {
            var host = await BuildTestHost();
            var crawlerClient = host.ServiceProvider.GetRequiredService<CrawlerClient>();
            var data = crawlerClient.GetMetaDataByUrl("https://3commas.io/ru/blog/oblako-ishimoku-ili-sposob-shortit-i-longovat-kak-samuraj");
            Assert.Pass();
        }
        
        [Test]
        public async Task GetSiteDataByRabbitMq()
        {
            var host = await BuildTestHost();
            var bus = host.ServiceProvider.GetRequiredService<IBusControl>();
            var response = await bus.Request<GetMetaDataRequest, GetMetaDataResponse>(new GetMetaDataRequest()
            {
                Url = "https://3commas.io/ru/blog/oblako-ishimoku-ili-sposob-shortit-i-longovat-kak-samuraj"
            });
            Assert.Pass();
        }
        
    }

}