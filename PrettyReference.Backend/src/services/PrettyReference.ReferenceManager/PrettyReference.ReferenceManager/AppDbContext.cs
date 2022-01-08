using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PrettyReference.ReferenceManager.Domain.Db;

namespace PrettyReference.ReferenceManager
{
    public class AppDbContext: DbContext
    {
        public AppDbContext()
        {
            
        }
        public DbSet<ReferenceInformation> ReferenceInformation { get; private set; }
        public DbSet<GroupReference> GroupReference { get; private set; }
    

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
            modelBuilder.Entity<ReferenceInformation>()
                .HasOne(x => x.GroupReference)
                .WithMany(x => x.References)
                .HasForeignKey(x => x.GroupReferenceId);
        }
        public override int SaveChanges()
        {
            var references = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity &&  e.Entity is ReferenceInformation && (
                    e.State == EntityState.Added));
            var groups = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity &&  e.Entity is GroupReference && (
                    e.State == EntityState.Added));
            foreach (var entityEntry in references)
            {

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedDate = DateTime.Now;
                }
            }
            foreach (var entityEntry in groups)
            {

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedDate = DateTime.Now;
                }
            }


            return base.SaveChanges();
        }
    }

}