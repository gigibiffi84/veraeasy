namespace Veraeasy.ContactVerification.Application;

using System.Security.Claims;
using Veraeasy.Common.Validation.Requests;
using Veraeasy.ContactVerification.Domain;
using Veraeasy.ContactVerification.Domain.CreateContactVerification;

internal static class CreateContactVerificationEndpoint
{
    static async Task<Guid> DoCreateContactVerification(CreateContactVerificationRequest request, IContactVerificationAggregate aggregate, ClaimsPrincipal user, CancellationToken cancellationToken)
    {
        var command = request.ToCommand(ref user);
        var contractId = await aggregate.ExecuteCommandAsync(command, cancellationToken);
        //transaction committed in this case we are using outbox pattern
        //in other cases you can collect domain events for long running operations
        //or that joins to the same transaction and should be useful use
        // a service with more repositories.
        await aggregate.ContactVerificationCreated(command.ToDomainEvent(contractId));
        return contractId;
    }
    internal static void MapContactVerificationCreated(this IEndpointRouteBuilder app) =>
    app.MapPost(ContactVerificationApiPaths.Create,
            async
            (
                CreateContactVerificationRequest request,
                IContactVerificationAggregate aggregate,
                ClaimsPrincipal user,
                CancellationToken cancellationToken
            ) =>
            {
                Guid contractId = await DoCreateContactVerification(request, aggregate, user, cancellationToken);

                return Results.Created($"/{ContactVerificationApiPaths.Create}/{contractId}", contractId);


            })
        .RequireAuthorization()
        .ValidateRequest<CreateContactVerificationRequest>()
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Triggers creation of a new contact verification entry",
            Description =
                "This endpoint is used to prepare a new contact verification.",
        })
        .Produces<string>(StatusCodes.Status201Created)
        .Produces(StatusCodes.Status409Conflict)
        .Produces(StatusCodes.Status500InternalServerError);
}
