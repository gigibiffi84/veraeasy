namespace Veraeasy.ContactVerification.Infrastructure;

using Microsoft.Extensions.DependencyInjection;
using Veraeasy.ContactVerification.Domain;

internal static class MediationModule
{
    internal static IServiceCollection AddMediationModule(this IServiceCollection services)
    {
        var commandsHandlersAssembly = typeof(IContactVerificationAggregate).Assembly;

        services.AddMediatR(configuration => configuration.RegisterServicesFromAssemblies(commandsHandlersAssembly));

        return services;
    }
}