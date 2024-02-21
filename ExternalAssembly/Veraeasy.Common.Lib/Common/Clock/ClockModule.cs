namespace Veraeasy.Common.Clock;

using Microsoft.Extensions.DependencyInjection;



public static class ClockModule
{
    public static IServiceCollection AddClock(this IServiceCollection services) =>
        services.AddSingleton(TimeProvider.System);
}
