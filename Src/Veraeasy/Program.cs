using Microsoft.OpenApi.Models;
using Veraeasy.Auth;
using Veraeasy.Common.Clock;
using Veraeasy.Common.Events.EventBus;
using Veraeasy.Common.Validation.Requests;
using Veraeasy.ContactVerification;
using Veraeasy.ContactVerification.Application;
using Veraeasy.EmailVerification;

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
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "ContactVerification API v1", Version = "v1" });
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
builder.Services.AddRequestsValidations();
builder.Services.AddClock();
builder.Services.AddContactVerification(builder.Configuration);
builder.Services.AddEmailVerificationModule(builder.Configuration);
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


app.UseContactVerification();
app.UseEmailVerificationModule();
app.UseHttpsRedirection();

//app.UseCors();

//app.MapControllers();
app.UseRouting().UseAuthentication().UseAuthorization().UseEndpoints(e => e.MapControllers());
app.MapContactVerificatinEndpoints();

app.Run();