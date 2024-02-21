namespace Veraeasy.EmailVerification;

internal static class EmailVerificationModule
{
    internal static IServiceCollection AddEmailVerificationModule(this IServiceCollection services, IConfiguration configuration)
    {

        return services;
    }

    internal static IApplicationBuilder UseEmailVerificationModule(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseCors();
        applicationBuilder.UseAuthentication();
        applicationBuilder.UseAuthorization();

        return applicationBuilder;
    }
}
