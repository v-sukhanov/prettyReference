using System;

namespace PrettyReference.ReferenceManager.Interface.Shared
{
    public class SiteReference
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Source { get; set; }
        public bool SaveWithError { get; set; }

        public DateTime CreatedDate { get; set; }
        
        public Guid? GroupReferenceId { get; set; }
        
        public RefGroup? GroupReference { get; set; }




        public SiteReference()
        {
            
        }
        public SiteReference(Guid id, string url, string title, string image, string source, DateTime createdDate, Guid groupReferenceId, bool saveWithError)
        {
            Id = id;
            Url = url;
            Title = title;
            Image = image;
            Source = source;
            CreatedDate = createdDate;
            GroupReferenceId = groupReferenceId;
            SaveWithError = saveWithError;
        }
    }
}