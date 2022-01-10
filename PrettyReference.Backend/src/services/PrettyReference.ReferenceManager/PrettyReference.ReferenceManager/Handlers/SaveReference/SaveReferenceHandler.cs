using System;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using PrettyReference.ReferenceManager.Core.RefManagers;
using PrettyReference.ReferenceManager.Domain.Db;
using PrettyReference.ReferenceManager.Interface.SaveReference;
using PrettyReference.ReferenceManager.Interface.Shared;

namespace PrettyReference.ReferenceManager.Handlers.SaveReference
{
    public class SaveReferenceHandler: IConsumer<SaveReferenceRequest>
    {
        private readonly RefManager _refManager;

        public SaveReferenceHandler(RefManager refManager)
        {
            _refManager = refManager;
        }
    
        public async Task Consume(ConsumeContext<SaveReferenceRequest> context)
        {
            if (string.IsNullOrEmpty(context.Message.Url))
            {
                throw new Exception("Url is empty");
            }

            var savedReference = await _refManager.GetAndSaveReferenceInformation(context.Message.Url, context.Message.GroupId);
            
            var config = new MapperConfiguration(cfg => cfg.CreateMap<ReferenceInformation, SiteReference>());
            var mapper = new Mapper(config);
            var mapped = mapper.Map<SiteReference>(savedReference);
            await context.RespondAsync(new SaveReferenceResponse()
            {
                Item = mapped
            });
        }
    }
}