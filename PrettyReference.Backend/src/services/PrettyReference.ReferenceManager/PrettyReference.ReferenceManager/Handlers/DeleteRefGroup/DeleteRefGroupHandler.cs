using System;
using System.Threading.Tasks;
using MassTransit;
using PrettyReference.ReferenceManager.Core.RefGroupManagers;
using PrettyReference.ReferenceManager.Interface.DeleteRefGroup;

namespace PrettyReference.ReferenceManager.Handlers.DeleteRefGroup
{
    public class DeleteRefGroupHandler: IConsumer<DeleteRefGroupRequest>
    {
        private readonly RefGroupManager _refGroupManager;

        public DeleteRefGroupHandler(RefGroupManager refGroupManager)
        {
            _refGroupManager = refGroupManager;
        }
    
        public async Task Consume(ConsumeContext<DeleteRefGroupRequest> context)
        {
            _refGroupManager.DeleteGroup(context.Message.Id);
            await context.RespondAsync(new DeleteRefGroupResponse());
        }
    }
}