
namespace Veraeasy.ContactVerification.Application;



internal static class ContactVerificationEndpoints
{
    internal static void MapContactVerificatinEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapContactVerificationCreated();
    }
}
