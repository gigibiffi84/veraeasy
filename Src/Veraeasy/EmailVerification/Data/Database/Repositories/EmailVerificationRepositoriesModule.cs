namespace Veraeasy.EmailVerification.Data.Database.Reporitories;

using Microsoft.Extensions.DependencyInjection;
using Veraeasy.EmailVerification.Data.Database.Repositories;

internal static class EmailVerificationRepositoriesModule
{
    internal static IServiceCollection AddEmailVerificationRepositories(this IServiceCollection services)
    {
        services.AddScoped<IEmailVerificationRepository, EmailVerificationRepository>();

        return services;
    }
}