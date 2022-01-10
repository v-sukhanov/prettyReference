using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using PrettyReference.ReferenceManager.Core.RefManagers;
using PrettyReference.ReferenceManager.Domain.Db;
using PrettyReference.ReferenceManager.Interface.GetRefereceList;
using PrettyReference.ReferenceManager.Interface.GetReferenceList;
using PrettyReference.ReferenceManager.Interface.Shared;
using Serilog;

namespace PrettyReference.ReferenceManager.Handlers.GetReferenceList
{
    public class GetReferenceHandler: IConsumer<GetReferenceListRequest>
    {
        private readonly RefManager _refManager;

        public GetReferenceHandler(RefManager refManager)
        {
            _refManager = refManager;
        }

        public async Task Consume(ConsumeContext<GetReferenceListRequest> context)
        {
            var list = _refManager.GetReferenceInformationList(context.Message.TagId);
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ReferenceInformation, SiteReference>();
                cfg.CreateMap<GroupReference, RefGroup>();
            });
            var mapper = new Mapper(config);
            var mapped = list.Select(x => mapper.Map<SiteReference>(x));
            await context.RespondAsync(new GetReferenceListResponse()
            {
                Items = mapped.ToArray()
            });
        }
    }
}