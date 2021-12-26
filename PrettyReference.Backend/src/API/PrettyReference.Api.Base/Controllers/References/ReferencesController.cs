using System;
using System.Net;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using PrettyReference.Api.Base.Controllers.References.models;
using PrettyReference.Crawler.Interface.GetMetaDataList;
using PrettyReference.Crawler.Interface.SaveMetaData;

namespace PrettyReference.Api.Base.Controllers.References
{
    public class ReferencesController: Controller
    {
        [HttpPost]
        public async Task<SiteMetaDataItem> AddUrl([FromServices] IBusControl busControl, [FromBody] ParseAndSaveMetadataRequest request )
        {
            var response = await busControl.Request<SaveMetaDataRequest, SaveMetaDataResponse>(
                new SaveMetaDataRequest()
                {
                    Url = request.Url
                });
            return response.Message.Item;
        }
        
        [HttpGet]
        public async Task<SiteMetaDataItem[]> GetUrlList([FromServices] IBusControl busControl)
        {
            var response = await busControl.Request<GetMetaDataListRequest, GetMetaDataListResponse>(
                new GetMetaDataListRequest());
            return response.Message.Items;
        }
    }
}