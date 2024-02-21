namespace Veraeasy.EmailVerification.Data.Database;

using Microsoft.EntityFrameworkCore;

internal static class EmailVerificationDatabaseModule
{
    private const string ConnectionStringName = "ContactVerification";

    internal static IServiceCollection AddEmailVerificationDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString(ConnectionStringName);
        services.AddDbContext<EmailVerificationDbContext>(options => options.UseNpgsql(connectionString));
        //TODO: services.AddRepositories();

        return services;
    }

    internal static IApplicationBuilder UseEmailVerificationDatabase(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseEmailAutomaticMigrations();

        return applicationBuilder;
    }
}