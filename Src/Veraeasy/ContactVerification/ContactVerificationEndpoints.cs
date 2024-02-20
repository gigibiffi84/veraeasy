using Veraeasy.ContactVerification.CreateContactVerification;

namespace Veraeasy.ContactVerification;



internal static class ContactVerificationEndpoints
{
    internal static void MapContracts(this IEndpointRouteBuilder app)
    {
        app.MapContactVerificationCreated();
        //app.MapSignContract();
    }
}
