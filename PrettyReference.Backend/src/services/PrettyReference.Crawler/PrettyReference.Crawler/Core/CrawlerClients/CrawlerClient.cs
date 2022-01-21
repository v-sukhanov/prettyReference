using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using AngleSharp;
using CsQuery;
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

        public async Task<SiteMetaDataItem> GetMetaDataByUrl2(string url)
        {
            Uri myUri = new Uri(url);
            var httpClient = new HttpClient()
            {
                BaseAddress = myUri
            };
            using (var response = await httpClient.GetAsync(url))
            {
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
            }
            return new SiteMetaDataItem() { Url = url, Source = myUri.Host};
        }
        public async Task<SiteMetaDataItem> GetMetaDataByUrl(string url)
        {
            Uri myUri = new Uri(url);
            var httpClient = new HttpClient()
            {
                BaseAddress = myUri
            };
            var web = new HtmlWeb();
            var doc = web.Load(url);
            
            
            var list = doc.DocumentNode.SelectNodes("//meta");
            
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