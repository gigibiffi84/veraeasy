using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Veraeasy.EmailVerification.Data.Database.Migrations
{
    /// <inheritdoc />
    public partial class OtpSecret : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Secret",
                schema: "ContactVerification",
                table: "EmailVerification",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Secret",
                schema: "ContactVerification",
                table: "EmailVerification");
        }
    }
}
