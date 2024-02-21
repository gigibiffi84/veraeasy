namespace Veraeasy.EmailVerification.Data.Database;

using Microsoft.EntityFrameworkCore;
using Veraeasy.ContactVerification.Data.Database;

internal static class EmailAutomaticMigrationsExtensions
{
    internal static IApplicationBuilder UseEmailAutomaticMigrations(this IApplicationBuilder applicationBuilder)
    {
        using var scope = applicationBuilder.ApplicationServices.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<EmailVerificationDbContext>();
        context.Database.Migrate();

        return applicationBuilder;
    }
}