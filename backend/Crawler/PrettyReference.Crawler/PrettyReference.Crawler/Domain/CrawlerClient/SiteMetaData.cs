namespace PrettyReference.Crawler.Domain.CrawlerClient
{
    public class SiteMetaData
    {
        public string Url { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Source { get; set; }

        public SiteMetaData()
        {
            
        }
        public SiteMetaData(string url, string title, string image, string source)
        {
            Url = url;
            Title = title;
            Image = image;
            Source = source;
        }
    }
}