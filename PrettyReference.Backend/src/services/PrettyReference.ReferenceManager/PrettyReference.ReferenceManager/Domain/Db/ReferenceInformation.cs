using System;

namespace PrettyReference.ReferenceManager.Domain.Db
{
    public class ReferenceInformation: BaseEntity
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Source { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }

        public ReferenceInformation()
        {
        }
    }
    
    public class BaseEntity{ 
        public DateTime CreatedDate { get; set; }
    }
}