using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Veraeasy.ContactVerification.Data.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddContactVerificationEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContactVerificationEvent",
                schema: "ContactVerification",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BusinessId = table.Column<string>(type: "text", nullable: false),
                    PersonId = table.Column<string>(type: "text", nullable: false),
                    Owner = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    ContactVerificationId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactVerificationEvent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContactVerificationEvent_ContactVerification_ContactVerific~",
                        column: x => x.ContactVerificationId,
                        principalSchema: "ContactVerification",
                        principalTable: "ContactVerification",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContactVerificationEvent_ContactVerificationId",
                schema: "ContactVerification",
                table: "ContactVerificationEvent",
                column: "ContactVerificationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactVerificationEvent",
                schema: "ContactVerification");
        }
    }
}
