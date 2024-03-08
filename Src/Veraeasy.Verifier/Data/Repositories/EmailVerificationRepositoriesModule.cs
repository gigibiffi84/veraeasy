namespace Veraeasy.Verifier.Data.Repositories;

internal static class EmailVerificationRepositoriesModule
{
    internal static IServiceCollection AddEmailVerificationRepositories(this IServiceCollection services)
    {
        services.AddScoped<IEmailVerificationRepository, EmailVerificationRepository>();

        return services;
    }
}