using System;

namespace PrettyReference.ReferenceManager.Domain.Db
{
    public class ReferenceInformation
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }

        public ReferenceInformation()
        {
            
        }
        public ReferenceInformation(Guid id, string url, string title, string image)
        {
            Id = id;
            Url = url;
            Title = title;
            Image = image;
        }
    }
}