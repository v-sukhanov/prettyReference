using System;
using System.Net;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using PrettyReference.Api.Base.Controllers.References.models;
using PrettyReference.ReferenceManager.Interface.DeleteReference;
using PrettyReference.ReferenceManager.Interface.GetRefereceList;
using PrettyReference.ReferenceManager.Interface.GetReferenceList;
using PrettyReference.ReferenceManager.Interface.SaveReference;
using PrettyReference.ReferenceManager.Interface.Shared;

namespace PrettyReference.Api.Base.Controllers.References
{
    public class ReferencesController: Controller
    {
        [HttpPost]
        public async Task<SiteReference> SaveReference([FromServices] IBusControl busControl, [FromBody] ParseAndSaveMetadataRequest request )
        {
            var response = await busControl.Request<SaveReferenceRequest, SaveReferenceResponse>(
                new SaveReferenceRequest()
                {
                    Url = request.Url
                });
            return response.Message.Item;
        }
        
        [HttpDelete]
        public async Task<DeleteReferenceResponse> DeleteReference([FromServices] IBusControl busControl, [FromQuery] Guid id )
        {
            var response = await busControl.Request<DeleteReferenceRequest, DeleteReferenceResponse>(
                new DeleteReferenceRequest()
                {
                    Id = id
                });
            return response.Message;
        }
        
        [HttpGet]
        public async Task<SiteReference[]> GetReferenceList([FromServices] IBusControl busControl)
        {
            var response = await busControl.Request<GetReferenceListRequest, GetReferenceListResponse>(
                new GetReferenceListRequest());
            return response.Message.Items;
        }
    }
}