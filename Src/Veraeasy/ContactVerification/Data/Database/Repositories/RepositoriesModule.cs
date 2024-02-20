namespace Veraeasy.ContactVerification.Data.Database.Reporitories;

using Microsoft.Extensions.DependencyInjection;
using Veraeasy.ContactVerification.Data;

internal static class RepositoriesModule
{
    internal static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IContactVerificationRepository, ContactVerificationRepository>();

        return services;
    }
}