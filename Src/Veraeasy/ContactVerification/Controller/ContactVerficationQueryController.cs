using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Veraeasy.ContactVerification.Domain.Service;

namespace Veraeasy.ContactVerification.Controller;

[ApiController]
[ApiVersion(1.0)]
[Authorize]
[Route("api/[controller]")]
public class ContactVerficationQueryController : ControllerBase
{

    private readonly ILogger<ContactVerficationQueryController> logger;

    private readonly IContactVerificationQueryService queryService;

    public ContactVerficationQueryController(
        ILogger<ContactVerficationQueryController> _logger,
        IContactVerificationQueryService _queryService)
    {
        logger = _logger;
        queryService = _queryService;
    }

    [HttpGet("getVersion")]
    public IActionResult GetVersion()
    {
        return Ok("1.0");
    }

    [HttpGet("id/{id}")]
    //[TodoItem_HandleExceptionFilter]
    //[TodoItem_ValidateTodoItemFilter]
    public async Task<IActionResult> GetContatactVerificationById(string id)
    {
        var result = await queryService.GetContactVerificationbyId(id);
        return Ok(result);
    }

    [HttpGet("owner/{owner}")]
    public async Task<IActionResult> ListContactVerificationByOwner(string owner)
    {
        var result = await queryService.ListContactVerificationByOwner(owner);
        return Ok(result);
    }

}