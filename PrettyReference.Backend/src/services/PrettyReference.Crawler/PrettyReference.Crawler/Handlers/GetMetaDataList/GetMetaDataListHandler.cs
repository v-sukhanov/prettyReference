using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using PrettyReference.Crawler.Core.CrawlerClients;
using PrettyReference.Crawler.Domain.CrawlerClient;
using PrettyReference.Crawler.Interface.GetMetaDataList;
using PrettyReference.Crawler.Interface.SaveMetaData;

namespace PrettyReference.Crawler.Handlers.GetMetaDataList
{
    public class GetMetaDataListHandler: IConsumer<GetMetaDataListRequest>
    {
        private readonly CrawlerClient _crawlerClient;

        public GetMetaDataListHandler(CrawlerClient crawlerClient)
        {
            _crawlerClient = crawlerClient;
        }

        public async Task Consume(ConsumeContext<GetMetaDataListRequest> context)
        {
            var list = _crawlerClient.GetMetaDataList();
            var config = new MapperConfiguration(cfg => cfg.CreateMap<SiteMetaData, SiteMetaDataItem>());
            var mapper = new Mapper(config);
            var mappedList = mapper.Map<List<SiteMetaDataItem>>(list);
            await context.RespondAsync(new GetMetaDataListResponse()
            {
                Items = mappedList.ToArray()
            });
        }
    }
}