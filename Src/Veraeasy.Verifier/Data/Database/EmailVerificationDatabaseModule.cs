using Microsoft.EntityFrameworkCore;
using Veraeasy.EmailVerification.Data.Database.Reporitories;

namespace Veraeasy.Verifier.EmailVerification.Data.Database;

internal static class EmailVerificationDatabaseModule
{
    private const string ConnectionStringName = "ContactVerification";

    internal static IServiceCollection AddEmailVerificationDatabase(this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString(ConnectionStringName);
        services.AddDbContext<EmailVerificationDbContext>(options => options.UseNpgsql(connectionString));
        services.AddEmailVerificationRepositories();

        return services;
    }

    internal static IApplicationBuilder UseEmailVerificationDatabase(this IApplicationBuilder applicationBuilder)
    {
        return applicationBuilder;
    }
}