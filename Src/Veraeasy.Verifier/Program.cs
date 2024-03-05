using Microsoft.OpenApi.Models;
using Veraeasy.Common.Clock;
using Veraeasy.Common.Events.EventBus;
using Veraeasy.Verifier.Auth;
using Veraeasy.Verifier.EmailVerifier;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//builder.Host.ConfigureKeycloakConfigurationSource();

builder.Services.AddAuthModule(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
    {
        c.OperationFilter<AuthorizationHeaderOperationFilter>();
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "EmailVerifier API v1", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Scheme = "Bearer",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            In = ParameterLocation.Header
        });
    }
);
builder.Services.AddEventBus();
//builder.Services.AddRequestsValidations();
builder.Services.AddClock();
builder.Services.AddEmailVerifier(builder.Configuration);
builder.Services.AddHealthChecks();

var app = builder.Build();

//TODO: reverted health check due to auth middleware conflicts
/*app.UseRouting().UseEndpoints(endpoints =>
{
    endpoints.MapHealthChecks("/ops/health");
    endpoints.MapHealthChecks("/ops/health/liveness");
});*/

app.UseAuthModule();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();


app.UseEmailVerifier();
app.UseHttpsRedirection();

//app.UseCors();

//app.MapControllers();
app.UseRouting().UseAuthentication().UseAuthorization().UseEndpoints(e => e.MapControllers());

app.Run();