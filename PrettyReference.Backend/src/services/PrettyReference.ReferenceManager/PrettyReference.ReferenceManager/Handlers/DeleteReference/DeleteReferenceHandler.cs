using System;
using System.Threading.Tasks;
using MassTransit;
using PrettyReference.ReferenceManager.Core.RefManagers;
using PrettyReference.ReferenceManager.Interface.DeleteReference;

namespace PrettyReference.ReferenceManager.Handlers.DeleteReference
{
    public class DeleteReferenceHandler: IConsumer<DeleteReferenceRequest>
    {
        private readonly RefManager _refManager;

        public DeleteReferenceHandler(RefManager refManager)
        {
            _refManager = refManager;
        }

        public async Task Consume(ConsumeContext<DeleteReferenceRequest> context)
        {
            _refManager.DeleteReferenceInformation(context.Message.Id);
            await context.RespondAsync(new DeleteReferenceResponse());
        }
    }
}