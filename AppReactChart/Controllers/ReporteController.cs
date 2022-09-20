using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AppReactChart.Models;

namespace AppReactChart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteController : ControllerBase
    {
        [HttpGet]
        [Route("ResumenSemana")]
        public IActionResult ResumenSemana()
        {
            List<VmVentaUltimasSemanas> listaVenta = new List<VmVentaUltimasSemanas>
            {
                new VmVentaUltimasSemanas{Fecha = "10/09/2022", Total = 12},
                new VmVentaUltimasSemanas{Fecha = "10/09/2022", Total = 20},
                new VmVentaUltimasSemanas{Fecha = "10/09/2022", Total = 45},
                new VmVentaUltimasSemanas{Fecha = "10/09/2022", Total = 98},
                new VmVentaUltimasSemanas{Fecha = "10/09/2022", Total = 47}
            };

            List<VmProductoUltimasSemanas> listaProducto = new List<VmProductoUltimasSemanas>
            {
                new VmProductoUltimasSemanas{Producto = "Teclado", Total = 54},
                new VmProductoUltimasSemanas{Producto = "Monitor", Total = 76},
                new VmProductoUltimasSemanas{Producto = "Microfono", Total = 65},
                new VmProductoUltimasSemanas{Producto = "Laptop", Total = 86},
                new VmProductoUltimasSemanas{Producto = "SmartPhones", Total = 43}
            };

            return StatusCode(StatusCodes.Status200OK, new
            {
                ventasSemana = listaVenta,
                productosSemana = listaProducto
            });
        }
    }
}