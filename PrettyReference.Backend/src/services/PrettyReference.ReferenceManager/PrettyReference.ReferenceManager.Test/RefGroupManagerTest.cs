using System;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using PrettyReference.ReferenceManager.Core.RefGroupManagers;
using PrettyReference.ReferenceManager.Core.RefManagers;
using PrettyReference.ReferenceManager.Interface.CreateRefGroup;
using PrettyReference.ReferenceManager.Interface.DeleteReference;
using PrettyReference.ReferenceManager.Interface.DeleteRefGroup;
using PrettyReference.ReferenceManager.Interface.GetRefereceList;
using PrettyReference.ReferenceManager.Interface.GetReferenceList;
using PrettyReference.ReferenceManager.Interface.GetRefGroupList;
using PrettyReference.ReferenceManager.Interface.SaveReference;
using Serilog;

namespace PrettyReference.ReferenceManager.Test
{
        public class RefGroupTest
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
        public async Task CreateGroup()
        {
            var host = await BuildTestHost();
            var refGroupManager = host.ServiceProvider.GetRequiredService<RefGroupManager>();
            refGroupManager.CreateGroup("group1");
            Assert.Pass();
        }
        
        [Test]
        public async Task CreateGroupByRabbit()
        {
            var host = await BuildTestHost();
            var bus = host.ServiceProvider.GetRequiredService<IBusControl>();
            await bus.Request<CreateRefGroupRequest, CreateRefGroupResponse>(new CreateRefGroupRequest()
            {
                Label = "group2"
            });
            Assert.Pass();
        }
        
        [Test]
        public async Task DeleteGroup()
        {
            var host = await BuildTestHost();
            var refGroupManager = host.ServiceProvider.GetRequiredService<RefGroupManager>();
            refGroupManager.DeleteGroup(new Guid("08d9d0fa-6671-43a2-82f3-389895005803"));
            Assert.Pass();
        }
        
        [Test]
        public async Task DeleteGroupByRabbit()
        {
            var host = await BuildTestHost();
            var bus = host.ServiceProvider.GetRequiredService<IBusControl>();
            await bus.Request<DeleteRefGroupRequest, DeleteRefGroupResponse>(new DeleteRefGroupRequest()
            {
                Id = new Guid("08d9d295-598b-4e52-8c37-f76a207cbade")
            });
            Assert.Pass();
        }

        
        [Test]
        public async Task GetGroupList()
        {
            var host = await BuildTestHost();
            var refGroupManager = host.ServiceProvider.GetRequiredService<RefGroupManager>();
            var groups = refGroupManager.GetGroupList();
            Assert.Pass();
        }
        
        [Test]
        public async Task GetGroupListByRabbit()
        {
            var host = await BuildTestHost();
            var bus = host.ServiceProvider.GetRequiredService<IBusControl>();
            var data = await bus.Request<GetRefGroupListRequest, GetRefGroupListResponse>(new GetRefGroupListRequest()
            {
            });
            Assert.Pass();
        }
    }

}