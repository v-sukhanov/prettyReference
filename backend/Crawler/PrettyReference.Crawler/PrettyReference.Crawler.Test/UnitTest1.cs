using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using PrettyReference.Crawler.Core.CrawlerClients;
using PrettyReference.Crawler.Interface.SabeMetaData;
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
        public async Task GetAndSaveSiteDate()
        {
            var host = await BuildTestHost();
            var crawlerClient = host.ServiceProvider.GetRequiredService<CrawlerClient>();
            var data = crawlerClient.SaveMetaDataByUrl("https://docs.docker.com/compose/reference/");
            Assert.Pass();
        }
        
        [Test]
        public async Task GetAndSaveSiteDateByRabbitMq()
        {
            var host = await BuildTestHost();
            var bus = host.ServiceProvider.GetRequiredService<IBusControl>();
            var response = await bus.Request<SaveMetaDataRequest, SaveMetaDataResponse>(new SaveMetaDataRequest()
            {
                Url = "https://docs.docker.com/compose/reference/"
            });
            Assert.Pass();
        }
    }
}