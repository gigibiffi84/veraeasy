
using Veraeasy.Common.Clock;
using Veraeasy.Common.Events.EventBus;
using Veraeasy.Common.Validation.Requests;
using Veraeasy.ContactVerification;
using Veraeasy.ContactVerification.ContactVerificationCreated;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddEventBus();
builder.Services.AddRequestsValidations();
builder.Services.AddClock();
builder.Services.AddContactVerification(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseContactVerification();
app.UseHttpsRedirection();
//app.UseCors();

app.MapControllers();
app.MapContactVerificationCreated();

app.Run();
