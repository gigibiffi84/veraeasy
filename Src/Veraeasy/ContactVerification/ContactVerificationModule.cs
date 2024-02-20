namespace Veraeasy.ContactVerification;

using Veraeasy.ContactVerification.Infrastructure;
using Veraeasy.ContactVerification.Data.Database;
using Veraeasy.ContactVerification.Domain;

internal static class ContactVerificationModule
{
    internal static IServiceCollection AddContactVerification(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDatabase(configuration);
        services.AddContactVerificationAggregateModule();
        services.AddScoped<IContactVerificationAggregate, ContactVerificationAggregate>();

        return services;
    }

    internal static IApplicationBuilder UseContactVerification(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseDatabase();

        return applicationBuilder;
    }
}
