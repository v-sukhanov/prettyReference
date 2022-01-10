using System;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using PrettyReference.Crawler;
using PrettyReference.ReferenceManager.Core.RefManagers;
using PrettyReference.ReferenceManager.Interface.DeleteReference;
using PrettyReference.ReferenceManager.Interface.GetRefereceList;
using PrettyReference.ReferenceManager.Interface.GetReferenceList;
using PrettyReference.ReferenceManager.Interface.SaveReference;
using Serilog;

namespace PrettyReference.ReferenceManager.Test
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
        public async Task SaveSiteDate()
        {
            var host = await BuildTestHost();
            var crawlerClient = host.ServiceProvider.GetRequiredService<RefManager>();
            var data = await crawlerClient.GetAndSaveReferenceInformation(
                "https://github.com/dotnet-architecture/eShopOnContainers/tree/dev/src/Web/WebSPA/Client/src/modules",
                new Guid("08d9d2df-ab2c-4cf1-8e72-b07b81ef1906"));
            Assert.Pass();
        }
        
        [Test]
        public async Task SaveSiteByRabbit()
        {
            var host = await BuildTestHost();
            var bus = host.ServiceProvider.GetRequiredService<IBusControl>();
            var data = await bus.Request<SaveReferenceRequest, SaveReferenceResponse>(new SaveReferenceRequest()
            {
                Url = "https://docs.docker.com/compose/reference/",
                GroupId = new Guid("08d9d108-f930-4725-82af-fcc6a501db31")
            });
            Assert.Pass();
        }
        
        [Test]
        public async Task GetSiteDataList()
        {
            var host = await BuildTestHost();
            var crawlerClient = host.ServiceProvider.GetRequiredService<RefManager>();
            var data = crawlerClient.GetReferenceInformationList(null);
            Assert.Pass();
        }
        
        [Test]
        public async Task GetSiteDataListByRabbit()
        {
            var host = await BuildTestHost();
            var bus = host.ServiceProvider.GetRequiredService<IBusControl>();
            var response = await bus.Request<GetReferenceListRequest, GetReferenceListResponse>(new GetReferenceListRequest());
            Assert.Pass();
        }
        
        [Test]
        public async Task DeleteSiteData()
        {
            var host = await BuildTestHost();
            var crawlerClient = host.ServiceProvider.GetRequiredService<RefManager>();
            crawlerClient.DeleteReferenceInformation(new Guid("08d9c9ff-e3a4-4d08-8c21-65f2246b4b93"));
            Assert.Pass();
        }
        
        [Test]
        public async Task DeleteSiteDataByRabbit()
        {
            var host = await BuildTestHost();
            var bus = host.ServiceProvider.GetRequiredService<IBusControl>();
            await bus.Request<DeleteReferenceRequest, DeleteReferenceResponse>(new DeleteReferenceRequest()
            {
                Id = new Guid("08d9ca87-77c3-4fec-88f5-07f921b9dffc")
            });
            Assert.Pass();
        }
    }
}