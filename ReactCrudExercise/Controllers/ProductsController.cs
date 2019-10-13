using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCrudExercise.Models;

namespace ReactCrudExercise.Controllers
{
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ReactCrudExerciseContext _context;

        public ProductsController(ReactCrudExerciseContext context)
        {
            _context = context;
        }

        /// <summary>
        /// add a new product
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/Products")]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            _context.Product.Add(product);
            var res = await _context.SaveChangesAsync();

            return Ok(res);
        }

        /// <summary>
        /// Get all products
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/Products")]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Product.ToListAsync();
        }

        /// <summary>
        /// return a specific product
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/Products/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        /// <summary>
        /// modifies an existing product
        /// </summary>
        /// <param name="id"></param>
        /// <param name="product"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("api/Products/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        /// <summary>
        /// delete a product
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("api/Products/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);

            if (product == null)
                return NotFound();

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}