using System;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using PrettyReference.ReferenceManager.Core.RefManagers;
using PrettyReference.ReferenceManager.Domain.Db;
using PrettyReference.ReferenceManager.Interface.SaveReference;
using PrettyReference.ReferenceManager.Interface.Shared;
using Serilog;

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
            try
            {
                if (string.IsNullOrEmpty(context.Message.Url))
                {
                    throw new Exception("Url is empty");
                }

                var savedReference =
                    await _refManager.GetAndSaveReferenceInformation(context.Message.Url, context.Message.GroupId);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<ReferenceInformation, SiteReference>();
                    cfg.CreateMap<GroupReference, RefGroup>();
                });
                var mapper = new Mapper(config);
                var mapped = mapper.Map<SiteReference>(savedReference);
                await context.RespondAsync(new SaveReferenceResponse()
                {
                    Item = mapped
                });
            }
            catch (Exception ex)
            {
                Log.Error("Error in SaveReferenceHandler: {0}", ex.Message);
                await context.RespondAsync(new SaveReferenceResponse()
                {
                    Item = new SiteReference()
                    {
                        SaveWithError = true
                    }
                });
            }
            
        }
    }
}