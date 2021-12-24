using System;

namespace PrettyReference.Crawler.Domain.CrawlerClient
{
    public class SiteMetaData
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Source { get; set; }

        public SiteMetaData()
        {
            
        }
        public SiteMetaData(Guid id, string url, string title, string image, string source)
        {
            Id = id;
            Url = url;
            Title = title;
            Image = image;
            Source = source;
        }
    }
}