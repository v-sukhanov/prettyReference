using System.Collections.Generic;
using System.Linq;
using HtmlAgilityPack;
using PrettyReference.Crawler.Domain.CrawlerClient;

namespace PrettyReference.Crawler.Core.CrawlerClients
{
    public class CrawlerClient
    {
        private readonly AppDbContext _dbContext;

        public CrawlerClient(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public SiteMetaData SaveMetaDataByUrl(string url)
        {
            // var url = "https://github.com/sudheerj/angular-interview-questions/blob/master/README.md?utm_source=pocket_mylist";
            var web = new HtmlWeb();
            var doc = web.Load(url);
            var list = doc.DocumentNode.SelectNodes("//meta");
            var metaData = new SiteMetaData() { Url = url};
            foreach (var item in list)
            {
                if (item.Attributes["property"]?.Value == "og:title")
                {
                    metaData.Title = item.Attributes["content"]?.Value;
                }
                if (item.Attributes["property"]?.Value == "og:image")
                {
                    metaData.Image = item.Attributes["content"]?.Value;
                }
                if (item.Attributes["property"]?.Value == "og:url")
                {
                    metaData.Source = item.Attributes["content"]?.Value;
                }
            }

            _dbContext.SiteMetaData.Add(metaData);
            _dbContext.SaveChanges();
            return metaData;
        }

        public SiteMetaData[] GetMetaDataList()
        {
            return _dbContext.SiteMetaData.ToArray();
        }
    }

}