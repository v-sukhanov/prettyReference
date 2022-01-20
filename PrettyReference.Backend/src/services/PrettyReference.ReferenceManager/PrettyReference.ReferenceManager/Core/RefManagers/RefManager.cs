using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using PrettyReference.Crawler.Interface.GetMetaData;
using PrettyReference.ReferenceManager.Domain.Db;
using Serilog;

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

        public async Task<ReferenceInformation> GetAndSaveReferenceInformation(string url, Guid? group)
        {
            var response = await _busControl.Request<GetMetaDataRequest, GetMetaDataResponse>(
                new GetMetaDataRequest()
                {
                    Url = url
                }, timeout:  TimeSpan.FromSeconds(60));
            var config = new MapperConfiguration(cfg => cfg.CreateMap<SiteMetaDataItem, ReferenceInformation >());
            var mapper = new Mapper(config);
            var mapped = mapper.Map<ReferenceInformation>(response.Message.Item);
            mapped.GroupReference = _dbContext.GroupReference.FirstOrDefault(x => x.Id == group);
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
        
        public ReferenceInformation[]  GetReferenceInformationList(Guid? group)
        {
            return _dbContext.ReferenceInformation.Include(x => x.GroupReference).Where(x => group == null ||  x.GroupReferenceId == group).OrderByDescending(x => x.CreatedDate).ToArray();
        }
        
    }
}