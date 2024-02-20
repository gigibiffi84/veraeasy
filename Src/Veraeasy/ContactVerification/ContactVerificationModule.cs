namespace Veraeasy.ContactVerification;

using Veraeasy.ContactVerification.Data.Database;

internal static class ContactVerificationModule
{
    internal static IServiceCollection AddContactVerification(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDatabase(configuration);

        return services;
    }

    internal static IApplicationBuilder UseContactVerification(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseDatabase();

        return applicationBuilder;
    }
}
