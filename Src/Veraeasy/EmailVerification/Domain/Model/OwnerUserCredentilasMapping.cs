namespace Veraeasy.EmailVerification.Domain.Model;

public class OwnerUserCredentilasMapping
{
    private readonly Dictionary<string?, OwnerConfiguration> ownerCredentialsMapping = new();


    public OwnerUserCredentilasMapping()
    {
        ownerCredentialsMapping.Add("bifulcoluigi",
            new OwnerConfiguration(
                new UserCredentials("veraeasy", "12345678"),
                "http://98.64.169.211/otp",
                "<div>" +
                "<h3>Hi this is your OTP <b>{1}</b></h3>" +
                "<p>Please verify email <a href=\"{0}\">here</a></p>" +
                "</div>",
                "OTP Verification"
            ));
    }

    public OwnerConfiguration? getOwnerConfiguration(string? owner)
    {
        ownerCredentialsMapping.TryGetValue(owner, out var credentials);
        return credentials;
    }
}