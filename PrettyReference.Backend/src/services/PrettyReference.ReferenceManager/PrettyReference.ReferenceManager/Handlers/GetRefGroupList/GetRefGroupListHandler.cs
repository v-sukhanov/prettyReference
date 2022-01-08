using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using PrettyReference.ReferenceManager.Core.RefGroupManagers;
using PrettyReference.ReferenceManager.Domain.Db;
using PrettyReference.ReferenceManager.Interface.GetRefereceList;
using PrettyReference.ReferenceManager.Interface.GetRefGroupList;
using PrettyReference.ReferenceManager.Interface.Shared;

namespace PrettyReference.ReferenceManager.Handlers.GetRefGroupList
{
    public class GetRefGroupListHandler: IConsumer<GetRefGroupListRequest>
    {
        private readonly RefGroupManager _refGroupManager;

        public GetRefGroupListHandler(RefGroupManager refGroupManager)
        {
            _refGroupManager = refGroupManager;
        }

        public async Task Consume(ConsumeContext<GetRefGroupListRequest> context)
        {
            var list = _refGroupManager.GetGroupList();
            var config = new MapperConfiguration(cfg => cfg.CreateMap<GroupReference, RefGroup>());
            var mapper = new Mapper(config);
            var mapped = list.Select(x => mapper.Map<RefGroup>(x));
            await context.RespondAsync(new GetRefGroupListResponse()
            {
                Items = mapped.ToArray()
            });
        }
    }
}