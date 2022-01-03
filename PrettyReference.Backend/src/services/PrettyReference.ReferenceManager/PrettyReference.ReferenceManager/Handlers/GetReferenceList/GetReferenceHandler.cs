using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using PrettyReference.ReferenceManager.Domain.Db;
using PrettyReference.ReferenceManager.Interface.GetRefereceList;
using PrettyReference.ReferenceManager.Interface.GetReferenceList;
using PrettyReference.ReferenceManager.Interface.Shared;

namespace PrettyReference.ReferenceManager.Handlers.GetReferenceList
{
    public class GetReferenceHandler: IConsumer<GetReferenceListRequest>
    {
        private readonly AppDbContext _dbContext;

        public GetReferenceHandler(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Consume(ConsumeContext<GetReferenceListRequest> context)
        {
            var list = _dbContext.ReferenceInformation;
            var config = new MapperConfiguration(cfg => cfg.CreateMap<ReferenceInformation, SiteReference>());
            var mapper = new Mapper(config);
            var mapped = list.Select(x => mapper.Map<SiteReference>(x));
            await context.RespondAsync(new GetReferenceListResponse()
            {
                Items = mapped.ToArray()
            });
        }
    }
}