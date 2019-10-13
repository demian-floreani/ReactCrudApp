using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactCrudExercise.Models
{
    public class ReactCrudExerciseContext : DbContext
    {
        public ReactCrudExerciseContext (DbContextOptions<ReactCrudExerciseContext> options) : base(options) { }

        public DbSet<Product> Product { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            List<Product> seed = new List<Product>()
            {
                new Product()
                {
                    Id = 1,
                    Name = "VISI/pocket",
                    Category = "firstClass",
                    Active = true,
                    Price = 999.0m
                },
                new Product()
                {
                    Id = 2,
                    Name = "VISI/frame",
                    Category = "secondClass",
                    Active = true,
                    Price = 888.0m
                }
            };

            modelBuilder.Entity<Product>().HasData(seed.ToArray());
        }
    }
}

