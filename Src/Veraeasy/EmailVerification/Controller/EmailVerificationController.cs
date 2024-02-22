using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Veraeasy.EmailVerification.Data;
using Veraeasy.EmailVerification.Data.Database.Repositories;

namespace Veraeasy.EmailVerification.Controller;

[ApiController]
[ApiVersion(1.0)]
[Authorize]
[Route("api/[controller]")]
public class EmailVerficationController(
    ILogger<EmailVerficationController> logger,
    IMediator mediator,
    IEmailVerificationRepository repository) : ControllerBase
{
    [HttpPost]
    public async Task<IResult> CreateSlot([FromBody] StartEmailVerificationRequest item, CancellationToken cancellationToken = default)
    {

        var cmd = item.ToCommand();
        var newId = await mediator.Send(cmd, cancellationToken);
        var routeValues = new
        {
            controller = "EmailVerificationController",
            version = 1.0,
            id = newId.ToString()
           };
        return Results.Created($"/api/{routeValues.controller}/id/{routeValues.id}", newId);
    }

    [HttpGet("id/{id}", Name = "GetEmailVerificationById")]
    public async Task<IActionResult> GetEmailVerificationById(string id)
    {
        var result  = await repository.GetByIdAsync(new Guid(id));
        return Ok(result);
    }


}