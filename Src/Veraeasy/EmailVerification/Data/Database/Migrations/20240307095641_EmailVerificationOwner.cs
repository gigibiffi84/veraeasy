using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Veraeasy.EmailVerification.Data.Database.Migrations
{
    /// <inheritdoc />
    public partial class EmailVerificationOwner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactId",
                schema: "ContactVerification",
                table: "EmailVerification",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owner",
                schema: "ContactVerification",
                table: "EmailVerification",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactId",
                schema: "ContactVerification",
                table: "EmailVerification");

            migrationBuilder.DropColumn(
                name: "Owner",
                schema: "ContactVerification",
                table: "EmailVerification");
        }
    }
}
