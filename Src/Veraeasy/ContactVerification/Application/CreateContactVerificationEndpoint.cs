namespace Veraeasy.ContactVerification.Application;

using Veraeasy.Common.Validation.Requests;
using Veraeasy.ContactVerification.Domain;
using Veraeasy.ContactVerification.Domain.CreateContactVerification;

internal static class CreateContactVerificationEndpoint
{
    internal static void MapContactVerificationCreated(this IEndpointRouteBuilder app) => app.MapPost(ContactVerificationApiPaths.Create,
            async (CreateContactVerificationRequest request,
                IContactVerificationAggregate aggregate,
                CancellationToken cancellationToken) =>
            {
                var cv = request.ToCommand();
                var contractId = await aggregate.ExecuteCommandAsync(cv, cancellationToken);


                return Results.Created($"/{ContactVerificationApiPaths.Create}/{contractId}", contractId);
            })
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
