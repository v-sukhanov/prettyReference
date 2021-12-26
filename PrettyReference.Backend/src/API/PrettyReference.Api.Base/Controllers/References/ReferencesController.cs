using System;
using System.Net;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using PrettyReference.Api.Base.Controllers.References.models;
using PrettyReference.Crawler.Interface.SaveMetaData;

namespace PrettyReference.Api.Base.Controllers.References
{
    public class ReferencesController: Controller
    {
        [HttpPost]
        public async Task<SiteMetaDataItem> ParseAndSaveMetadata([FromServices] IBusControl busControl, [FromBody] ParseAndSaveMetadataRequest request )
        {
            var response = await busControl.Request<SaveMetaDataRequest, SaveMetaDataResponse>(
                new SaveMetaDataRequest()
                {
                    Url = request.Url
                });
            return response.Message.Item;
        }
    }
}