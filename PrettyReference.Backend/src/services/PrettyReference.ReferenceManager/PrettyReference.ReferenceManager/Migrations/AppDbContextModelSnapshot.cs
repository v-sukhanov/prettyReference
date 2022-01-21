﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PrettyReference.ReferenceManager;

namespace PrettyReference.ReferenceManager.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.13");

            modelBuilder.Entity("PrettyReference.ReferenceManager.Domain.Db.GroupReference", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Color")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Label")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("GroupReference");
                });

            modelBuilder.Entity("PrettyReference.ReferenceManager.Domain.Db.ReferenceInformation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<Guid?>("GroupReferenceId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Image")
                        .HasColumnType("longtext");

                    b.Property<bool>("SaveWithError")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Source")
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .HasColumnType("longtext");

                    b.Property<string>("Url")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("GroupReferenceId");

                    b.ToTable("ReferenceInformation");
                });

            modelBuilder.Entity("PrettyReference.ReferenceManager.Domain.Db.ReferenceInformation", b =>
                {
                    b.HasOne("PrettyReference.ReferenceManager.Domain.Db.GroupReference", "GroupReference")
                        .WithMany("References")
                        .HasForeignKey("GroupReferenceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("GroupReference");
                });

            modelBuilder.Entity("PrettyReference.ReferenceManager.Domain.Db.GroupReference", b =>
                {
                    b.Navigation("References");
                });
#pragma warning restore 612, 618
        }
    }
}
