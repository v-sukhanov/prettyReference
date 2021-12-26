using Microsoft.EntityFrameworkCore;
using PrettyReference.Crawler.Domain.CrawlerClient;

namespace PrettyReference.Crawler
{
    public class AppDbContext: DbContext
    {
        public AppDbContext()
        {
            
        }
        public DbSet<SiteMetaData> SiteMetaData { get; private set; }
    

        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;database=pretty-reference;uid=root;pwd=root",
                    ServerVersion.Parse("8.0"));
                
            }
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }

}