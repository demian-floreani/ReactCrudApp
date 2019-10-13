using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactCrudExercise.Migrations
{
    public partial class Update3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Category", "Name", "Price" },
                values: new object[] { "firstClass", "VISI/pocket", 999.0m });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "Active", "Category", "Name", "Price" },
                values: new object[] { 2, true, "secondClass", "VISI/frame", 888.0m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Category", "Name", "Price" },
                values: new object[] { "A", "product1", 10.50m });
        }
    }
}
