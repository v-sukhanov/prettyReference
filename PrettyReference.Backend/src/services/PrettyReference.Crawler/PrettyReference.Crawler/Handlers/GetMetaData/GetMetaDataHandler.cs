using System;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.Logging;
using PrettyReference.Crawler.Core.CrawlerClients;
using PrettyReference.Crawler.Interface.GetMetaData;
using Serilog;

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
            try
            {
                if (string.IsNullOrWhiteSpace(context.Message.Url))
                {
                    throw new Exception("Url is empty");
                }
                Log.Information($"Try parse url: {context.Message.Url}");
                var item = await _crawlerClient.GetMetaDataByUrl(context.Message.Url);
                Log.Information($"Url: {context.Message.Url}, successfully parsed");
                await context.RespondAsync(new GetMetaDataResponse()
                {
                    Item = item
                });
            }
            catch (Exception ex)
            {
                await context.RespondAsync(new GetMetaDataResponse());
                Log.Error("Error with added reference {0}", ex.Message);
            }
            
        }
    }

}