namespace Veraeasy.ContactVerification.ContactVerificationCreated;

using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Veraeasy.ContactVerification.Data.Database;
using Veraeasy.ContactVerification.Data;
using Veraeasy.Common.Validation.Requests;

internal static class ContactVerificationCreatedEndpoint
{
    internal static void MapContactVerificationCreated(this IEndpointRouteBuilder app) => app.MapPost(ContactVerificationApiPaths.Create,
            async (CreateContactVerificationRequest request,
                ContactVerificationDbContext persistence,
                CancellationToken cancellationToken) =>
            {
                var cv = ContactVerification.PrepareEntryWithDefaultExpire(
                    request.BusinessId,
                    request.Email,
                    request.MobileNumber,
                    DateTimeOffset.Parse(request.CreatedAt).UtcDateTime);
                await persistence.ContactEntries.AddAsync(cv, cancellationToken);
                await persistence.SaveChangesAsync(cancellationToken);

                return Results.Created($"/{ContactVerificationApiPaths.Create}/{cv.Id}", cv.Id);
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
