using System;
using System.Collections.Generic;
using System.Linq;
using HtmlAgilityPack;
using PrettyReference.Crawler.Interface.GetMetaData;
using Serilog;

namespace PrettyReference.Crawler.Core.CrawlerClients
{
    public class CrawlerClient
    {

        public CrawlerClient()
        {
        }

        public SiteMetaDataItem GetMetaDataByUrl(string url)
        {
            Log.Information("1");
            // var url = "https://github.com/sudheerj/angular-interview-questions/blob/master/README.md?utm_source=pocket_mylist";
            var web = new HtmlWeb();
            Log.Information("2");

            var doc = web.Load(url);
            Log.Information("3");

            var list = doc.DocumentNode.SelectNodes("//meta");
            Log.Information("4");

            Uri myUri = new Uri(url);   
            Log.Information("5");

            var metaData = new SiteMetaDataItem() { Url = url, Source = myUri.Host};
            Log.Information("6");

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
            Log.Information("7");

            if (metaData.Title == null)
            {
                var title = doc.DocumentNode.SelectNodes("//title");
                if (title != null && title.Count != 0)
                {
                    metaData.Title = title[0].InnerText;
                }
            }
            Log.Information("8");

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
            Log.Information("9");
            return metaData;
        }

    }

}