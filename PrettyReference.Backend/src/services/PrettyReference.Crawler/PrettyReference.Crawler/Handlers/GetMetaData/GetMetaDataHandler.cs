using System;
using System.Threading.Tasks;
using MassTransit;
using PrettyReference.Crawler.Core.CrawlerClients;
using PrettyReference.Crawler.Interface.GetMetaData;

namespace PrettyReference.Crawler.Handlers.GetMetaData
{
    public class GetMetaDataHandler: IConsumer<GetMetaDataRequest>
    {
        private readonly CrawlerClient _crawlerClient;

        public GetMetaDataHandler(CrawlerClient crawlerClient)
        {
            _crawlerClient = crawlerClient;
        }

        public async Task Consume(ConsumeContext<GetMetaDataRequest> context)
        {
            if (string.IsNullOrWhiteSpace(context.Message.Url))
            {
                throw new Exception("Url is empty");
            }
            var item =_crawlerClient.GetMetaDataByUrl(context.Message.Url);
            await context.RespondAsync(new GetMetaDataResponse()
            {
                Item = new SiteMetaDataItem()
                {
                    Url = item.Url,
                    Image = item.Image,
                    Title = item.Title
                }
            });
        }
    }

}