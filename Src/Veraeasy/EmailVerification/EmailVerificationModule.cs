using Veraeasy.EmailVerification.Data.Database;

namespace Veraeasy.EmailVerification;

internal static class EmailVerificationModule
{
    internal static IServiceCollection AddEmailVerificationModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddEmailVerificationDatabase(configuration);
        return services;
    }

    internal static IApplicationBuilder UseEmailVerificationModule(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseEmailVerificationDatabase();

        return applicationBuilder;
    }
}
