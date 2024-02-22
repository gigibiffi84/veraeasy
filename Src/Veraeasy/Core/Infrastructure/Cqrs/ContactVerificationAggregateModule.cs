namespace Veraeasy.ContactVerification.Infrastructure;

using Microsoft.Extensions.DependencyInjection;
using Veraeasy.ContactVerification.Domain;

internal static class ContactVerificationAggregateModule
{
    internal static IServiceCollection AddContactVerificationAggregateModule(this IServiceCollection services)
    {
        var handlersAssembly = typeof(Veraeasy.ContactVerification.ContactVerificationModule).Assembly;

        services.AddMediatR(configuration => configuration.RegisterServicesFromAssemblies(handlersAssembly));

        return services;
    }
}