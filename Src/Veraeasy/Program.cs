
using Veraeasy.Auth;
using Veraeasy.Common.Clock;
using Veraeasy.Common.Events.EventBus;
using Veraeasy.Common.Validation.Requests;
using Veraeasy.ContactVerification;
using Veraeasy.ContactVerification.Application;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddAuthModule(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
            {
                c.OperationFilter<AuthorizationHeaderOperationFilter>();
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo {Title = "Todo API v1", Version = "v1"} );
                c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Scheme = "Bearer",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header
                });
            }
);
builder.Services.AddEventBus();
builder.Services.AddRequestsValidations();
builder.Services.AddClock();
builder.Services.AddContactVerification(builder.Configuration);

var app = builder.Build();

app.UseAuthModule();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseContactVerification();
app.UseHttpsRedirection();
//app.UseCors();

//app.MapControllers();
app.UseRouting().UseAuthentication().UseAuthorization().UseEndpoints( e=> e.MapControllers());
app.MapContactVerificatinEndpoints();

app.Run();
