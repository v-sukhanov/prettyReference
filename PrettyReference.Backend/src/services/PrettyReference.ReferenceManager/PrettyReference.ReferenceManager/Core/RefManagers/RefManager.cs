using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using PrettyReference.Crawler.Interface.GetMetaData;
using PrettyReference.ReferenceManager.Domain.Db;

namespace PrettyReference.ReferenceManager.Core.RefManagers
{
    public class RefManager
    {
        private readonly IBusControl _busControl;
        private readonly AppDbContext _dbContext;

        public RefManager(IBusControl busControl, AppDbContext dbContext)
        {
            _busControl = busControl;
            _dbContext = dbContext;
        }

        public async Task<ReferenceInformation> GetAndSaveReferenceInformation(string url)
        {
            var response = await _busControl.Request<GetMetaDataRequest, GetMetaDataResponse>(
                new GetMetaDataRequest()
                {
                    Url = url
                });
            var config = new MapperConfiguration(cfg => cfg.CreateMap<SiteMetaDataItem, ReferenceInformation >());
            var mapper = new Mapper(config);
            var mapped = mapper.Map<ReferenceInformation>(response.Message.Item);
            _dbContext.ReferenceInformation.Add(mapped);
            _dbContext.SaveChanges();
            return mapped;
        }

        public void DeleteReferenceInformation(Guid id)
        {
            var deletedVal = _dbContext.ReferenceInformation.Find(id);
            if (deletedVal == null)
            {
                throw new Exception($"Data with Guid {id} not found");
            }
            _dbContext.ReferenceInformation.Remove(deletedVal);
            _dbContext.SaveChanges();
        }
        
        public ReferenceInformation[]  GetReferenceInformationList()
        {
            return _dbContext.ReferenceInformation.OrderByDescending(x => x.CreatedDate).ToArray();
        }
        
    }
}