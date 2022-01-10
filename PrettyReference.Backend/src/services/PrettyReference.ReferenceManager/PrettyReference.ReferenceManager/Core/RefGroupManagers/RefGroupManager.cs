using System;
using System.Linq;
using PrettyReference.ReferenceManager.Domain.Db;

namespace PrettyReference.ReferenceManager.Core.RefGroupManagers
{
    public class RefGroupManager
    {
        private readonly AppDbContext _dbContext;

        public RefGroupManager(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void CreateGroup(string label, string color)
        {
            _dbContext.GroupReference.Add(new GroupReference()
            {
                Label = label,
                Color = color
            });
            _dbContext.SaveChanges();
        }

        public void DeleteGroup(Guid id)
        {
            var deletedVal = _dbContext.GroupReference.Find(id);
            if (deletedVal == null)
            {
                throw new Exception($"Data with Guid {id} not found");
            }
            _dbContext.GroupReference.Remove(deletedVal);
            _dbContext.SaveChanges();
        }

        public GroupReference[] GetGroupList()
        {
            return _dbContext.GroupReference.OrderByDescending(x => x.CreatedDate).ToArray();
        }
    }
}