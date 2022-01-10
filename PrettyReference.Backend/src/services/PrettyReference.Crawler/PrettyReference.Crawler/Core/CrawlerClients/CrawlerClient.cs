using System;
using System.Collections.Generic;
using System.Linq;
using HtmlAgilityPack;
using PrettyReference.Crawler.Interface.GetMetaData;

namespace PrettyReference.Crawler.Core.CrawlerClients
{
    public class CrawlerClient
    {

        public CrawlerClient()
        {
        }

        public SiteMetaDataItem GetMetaDataByUrl(string url)
        {
            // var url = "https://github.com/sudheerj/angular-interview-questions/blob/master/README.md?utm_source=pocket_mylist";
            var web = new HtmlWeb();
            var doc = web.Load(url);
            var list = doc.DocumentNode.SelectNodes("//meta");
            Uri myUri = new Uri(url);   
            var metaData = new SiteMetaDataItem() { Url = url, Source = myUri.Host};
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
                
            }

            if (metaData.Title == null)
            {
                var title = doc.DocumentNode.SelectNodes("//title");
                if (title != null && title.Count != 0)
                {
                    metaData.Title = title[0].InnerText;
                }
            }
            
            if (metaData.Image == null)
            {
                var imgs = doc.DocumentNode.SelectNodes("//img");
                foreach (var img in imgs)
                {
                    var src = img.Attributes["src"].Value;
                    if (Uri.IsWellFormedUriString(src, UriKind.Absolute))
                    {
                        metaData.Image = src;
                        break;
                    }
                }
            }
            
            return metaData;
        }

    }

}