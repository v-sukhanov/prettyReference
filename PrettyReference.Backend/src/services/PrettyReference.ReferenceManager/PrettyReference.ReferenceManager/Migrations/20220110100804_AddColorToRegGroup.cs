using Microsoft.EntityFrameworkCore.Migrations;

namespace PrettyReference.ReferenceManager.Migrations
{
    public partial class AddColorToRegGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "GroupReference",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "GroupReference");
        }
    }
}
