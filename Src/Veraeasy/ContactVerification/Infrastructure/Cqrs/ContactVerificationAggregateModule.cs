namespace Veraeasy.ContactVerification.Infrastructure;

using Microsoft.Extensions.DependencyInjection;
using Veraeasy.ContactVerification.Domain;

internal static class ContactVerificationAggregateModule
{
    internal static IServiceCollection AddContactVerificationAggregateModule(this IServiceCollection services)
    {
        var commandsHandlersAssembly = typeof(IContactVerificationAggregate).Assembly;

        services.AddMediatR(configuration => configuration.RegisterServicesFromAssemblies(commandsHandlersAssembly));

        return services;
    }
}