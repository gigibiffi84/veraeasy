namespace Veraeasy.EmailVerification.Domain.Model;

public class OwnerConfiguration(
    UserCredentials userCredentials,
    string otpMatcherUrl,
    string emailTemplate,
    string emailSubject)
{
    public UserCredentials OwnerCredentials { get; init; } = userCredentials;

    public string OtpMatcherUrl { get; init; } = otpMatcherUrl;

    public string EmailTemplate { get; init; } = emailTemplate;

    public string EmailSubject { get; init; } = emailSubject;
}

public static class OwnerConfigurationEmailExtension
{
    public static string GetTemplateInterpolation(this OwnerConfiguration? c, string emailVerificationUuid, string otp,
        string authToken)
    {
        return string.Format(c.EmailTemplate, c.OtpMatcherUrl + "/" + emailVerificationUuid + "?token=" + authToken,
            otp);
    }
}