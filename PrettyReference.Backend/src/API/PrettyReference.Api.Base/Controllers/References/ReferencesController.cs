using System.Threading.Tasks;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace PrettyReference.Api.Base.Controllers.References
{
    public class ReferencesController
    {
        public async Task<string> GetList([FromServices] IBusControl busControl)
        {
            // await busControl.Request<>()
            return "Hello Brah";
        }
    }
}