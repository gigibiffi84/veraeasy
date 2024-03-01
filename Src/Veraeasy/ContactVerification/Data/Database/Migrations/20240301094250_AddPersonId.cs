using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Veraeasy.ContactVerification.Data.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddPersonId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PersonId",
                schema: "ContactVerification",
                table: "ContactVerification",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PersonId",
                schema: "ContactVerification",
                table: "ContactVerification");
        }
    }
}
