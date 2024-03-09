using Veraeasy.ContactVerification.Application.CreateEndpoint;
using Veraeasy.ContactVerification.Application.UpdateEndpoint;

namespace Veraeasy.ContactVerification.Application;

internal static class ContactVerificationEndpoints
{
    internal static void MapContactVerificationEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapContactVerificationCreated();
        app.MapContactVerificationUpdated();
    }
}