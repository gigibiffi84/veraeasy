namespace Veraeasy.Auth;

internal static class AuthModule
{
    internal static IServiceCollection AddAuthModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication()
        .AddJwtBearer();
        //.AddJwtBearer("Bearer");

        services.AddAuthorization();
        /*builder.Services.AddAuthorization(options =>
        {

            options.AddPolicy("AuthUserPolicy", policy =>
            {
                policy.RequireAuthenticatedUser();
            });
        });*/

        return services;
    }

    internal static IApplicationBuilder UseAuthModule(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseCors();
        applicationBuilder.UseAuthentication();
        applicationBuilder.UseAuthorization();

        return applicationBuilder;
    }
}
