using System;

namespace PrettyReference.Api.Base.Controllers.References.models
{
    public class ParseAndSaveMetadataRequest
    {
        public string Url { get; set; }
        public Guid? TagId { get; set; }
    }
}