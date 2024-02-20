namespace Veraeasy.ContactVerification.Data.Database;

using Microsoft.EntityFrameworkCore;
using Veraeasy.ContactVerification.Data.Database;

internal static class AutomaticMigrationsExtensions
{
    internal static IApplicationBuilder UseAutomaticMigrations(this IApplicationBuilder applicationBuilder)
    {
        using var scope = applicationBuilder.ApplicationServices.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ContactVerificationDbContext>();
        context.Database.Migrate();

        return applicationBuilder;
    }
}