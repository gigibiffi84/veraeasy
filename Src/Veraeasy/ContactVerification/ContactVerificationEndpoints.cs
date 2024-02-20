namespace Veraeasy.ContactVerification;

using ContactVerificationCreated;

internal static class ContactVerificationEndpoints
{
    internal static void MapContracts(this IEndpointRouteBuilder app)
    {
        app.MapContactVerificationCreated();
        //app.MapSignContract();
    }
}
