using System;
using System.Threading.Tasks;
using MassTransit;
using PrettyReference.ReferenceManager.Core.RefGroupManagers;
using PrettyReference.ReferenceManager.Interface.CreateRefGroup;

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

            _refGroupManager.CreateGroup(context.Message.Label);
            
            await context.RespondAsync(new CreateRefGroupResponse());
        }
    }
}