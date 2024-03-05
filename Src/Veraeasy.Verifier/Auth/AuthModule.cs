using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Keycloak.AuthServices.Sdk.Admin;

namespace Veraeasy.Verifier.Auth;

internal static class AuthModule
{
    private static readonly string CorsPolicySpec = "_CorsPolicySpec";

    internal static IServiceCollection AddAuthModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(CorsPolicySpec,
                policy =>
                {
                    policy
                        .WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });

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
            .AddAuthorization(o => o.AddPolicy("IsOtpMatcher", b =>
            {
                b.RequireRealmRoles("veraeasy_read_role");
                //b.RequireResourceRoles("view-profile");
                // TokenValidationParameters.RoleClaimType is overriden
                // by KeycloakRolesClaimsTransformation
                //b.RequireRole("view-profile");
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
        services.AddSingleton(new HttpClient());
        return services;
    }

    internal static IApplicationBuilder UseAuthModule(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseCors(CorsPolicySpec);
        applicationBuilder.UseAuthentication();
        applicationBuilder.UseAuthorization();

        return applicationBuilder;
    }
}