using Veraeasy.Verifier.EmailVerification.Data.Database.Repositories;
using Veraeasy.Verifier.EmailVerification.Data.Repositories;

namespace Veraeasy.EmailVerification.Data.Database.Reporitories;

internal static class EmailVerificationRepositoriesModule
{
    internal static IServiceCollection AddEmailVerificationRepositories(this IServiceCollection services)
    {
        services.AddScoped<IEmailVerificationRepository, EmailVerificationRepository>();

        return services;
    }
}