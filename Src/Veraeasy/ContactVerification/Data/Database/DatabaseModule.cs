namespace Veraeasy.ContactVerification.Data.Database;

using Microsoft.EntityFrameworkCore;
using Veraeasy.ContactVerification.Data.Database.Reporitories;

internal static class DatabaseModule
{
    private const string ConnectionStringName = "ContactVerification";

    internal static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString(ConnectionStringName);
        services.AddDbContext<ContactVerificationDbContext>(options => options.UseNpgsql(connectionString));
        services.AddRepositories();

        return services;
    }

    internal static IApplicationBuilder UseDatabase(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseAutomaticMigrations();

        return applicationBuilder;
    }
}