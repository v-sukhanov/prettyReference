using System;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using PrettyReference.ReferenceManager.Core.RefGroupManagers;
using PrettyReference.ReferenceManager.Domain.Db;
using PrettyReference.ReferenceManager.Interface.CreateRefGroup;
using PrettyReference.ReferenceManager.Interface.Shared;

namespace PrettyReference.ReferenceManager.Handlers.CreateRefGroup
{
    public class CreateRefGroupHandler: IConsumer<CreateRefGroupRequest>
    {
        private readonly RefGroupManager _refGroupManager;

        public CreateRefGroupHandler(RefGroupManager refGroupManager)
        {
            _refGroupManager = refGroupManager;
        }
    
        public async Task Consume(ConsumeContext<CreateRefGroupRequest> context)
        {
            if (string.IsNullOrEmpty(context.Message.Label))
            {
                throw new Exception("Label is empty");
            }

            var item = _refGroupManager.CreateGroup(context.Message.Label, context.Message.Color);
            var config = new MapperConfiguration(cfg => cfg.CreateMap<GroupReference, RefGroup>());
            var mapper = new Mapper(config);
            var mappedItem = mapper.Map<RefGroup>(item);
            await context.RespondAsync(new CreateRefGroupResponse()
            {
                Item = mappedItem
            });
        }
    }
}