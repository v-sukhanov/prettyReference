using Microsoft.EntityFrameworkCore.Migrations;

namespace PrettyReference.ReferenceManager.Migrations
{
    public partial class AddSaveWithErrorParam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "SaveWithError",
                table: "ReferenceInformation",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SaveWithError",
                table: "ReferenceInformation");
        }
    }
}
