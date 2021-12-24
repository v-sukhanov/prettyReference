using System;
using System.Threading.Tasks;
using MassTransit;
using PrettyReference.Crawler.Core.CrawlerClients;
using PrettyReference.Crawler.Interface.SabeMetaData;

namespace PrettyReference.Crawler.Handlers.SaveMetaData
{
    public class SaveMetaDataHandler: IConsumer<SaveMetaDataRequest>
    {
        private readonly CrawlerClient _crawlerClient;

        public SaveMetaDataHandler(CrawlerClient crawlerClient)
        {
            _crawlerClient = crawlerClient;
        }

        public async Task Consume(ConsumeContext<SaveMetaDataRequest> context)
        {
            if (string.IsNullOrWhiteSpace(context.Message.Url))
            {
                throw new Exception("Url is empty");
            }
            var item =_crawlerClient.SaveMetaDataByUrl(context.Message.Url);
            await context.RespondAsync(new SaveMetaDataResponse()
            {
                Item = new SiteMetaDataItem()
                {
                    Url = item.Url,
                    Image = item.Image,
                    Source = item.Source,
                    Title = item.Title,
                    Id = item.Id
                }
            });
        }
    }
}