using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Keycloak.AuthServices.Sdk.Admin;

namespace Veraeasy.Auth;

internal static class AuthModule
{
    internal static IServiceCollection AddAuthModule(this IServiceCollection services, IConfiguration configuration)
    {
        // services.AddAuthentication()
        //    .AddJwtBearer();

        var authenticationOptions = configuration
            .GetSection(KeycloakAuthenticationOptions.Section)
            .Get<KeycloakAuthenticationOptions>();

        services.AddKeycloakAuthentication(authenticationOptions);
        //.AddJwtBearer("Bearer");


        //Keycloak auth
        var authorizationOptions = configuration
            .GetSection(KeycloakProtectionClientOptions.Section)
            .Get<KeycloakProtectionClientOptions>();
        services
            .AddAuthorization(o => o.AddPolicy("IsAdmin", b =>
            {
                b.RequireRealmRoles("admin");
                b.RequireResourceRoles("r-admin");
                // TokenValidationParameters.RoleClaimType is overriden
                // by KeycloakRolesClaimsTransformation
                b.RequireRole("r-admin");
            }))
            .AddKeycloakAuthorization(authorizationOptions);

        var adminClientOptions = configuration
            .GetSection(KeycloakAdminClientOptions.Section)
            .Get<KeycloakAdminClientOptions>();

        services.AddKeycloakAdminHttpClient(adminClientOptions);

        //services.AddAuthorization();
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