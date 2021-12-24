using System;

namespace PrettyReference.Crawler.Interface.SabeMetaData
{
    public class SiteMetaDataItem
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Source { get; set; }
    }
}