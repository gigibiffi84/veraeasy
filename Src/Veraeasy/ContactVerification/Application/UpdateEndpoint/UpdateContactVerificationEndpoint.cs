using System.Security.Claims;
using Microsoft.OpenApi.Models;
using Veraeasy.Common.Validation.Requests;
using Veraeasy.ContactVerification.Domain;

namespace Veraeasy.ContactVerification.Application.UpdateEndpoint;

internal static class UpdateContactVerificationEndpoint
{
    private static async Task<Guid> DoUpdateContactVerification(UpdateContactVerificationRequest request,
        IContactVerificationAggregate aggregate, ClaimsPrincipal user, CancellationToken cancellationToken)
    {
        var command = request.ToCommand(ref user);
        var result = await aggregate.ExecuteCommandAsync(command, cancellationToken);

        return result.Id;
    }

    internal static void MapContactVerificationUpdated(this IEndpointRouteBuilder app)
    {
        app.MapPut(ContactVerificationApiPaths.CreateOrUpdate,
                async
                (
                    UpdateContactVerificationRequest request,
                    IContactVerificationAggregate aggregate,
                    ClaimsPrincipal user,
                    CancellationToken cancellationToken
                ) =>
                {
                    var contractId = await DoUpdateContactVerification(request, aggregate, user, cancellationToken);

                    return Results.Created($"/{ContactVerificationApiPaths.CreateOrUpdate}/{contractId}", contractId);
                })
            .RequireAuthorization()
            .ValidateRequest<UpdateContactVerificationRequest>()
            .WithOpenApi(operation => new OpenApiOperation(operation)
            {
                Summary = "Triggers creation of a new contact verification entry",
                Description =
                    "This endpoint is used to prepare a new contact verification."
            })
            .Produces<string>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status409Conflict)
            .Produces(StatusCodes.Status500InternalServerError);
    }
}