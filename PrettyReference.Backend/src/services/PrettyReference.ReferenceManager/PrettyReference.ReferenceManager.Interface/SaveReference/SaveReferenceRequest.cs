using System;

namespace PrettyReference.ReferenceManager.Interface.SaveReference
{
    public class SaveReferenceRequest
    {
        public string Url { get; set; }
        public Guid? GroupId { get; set; }
    }
}