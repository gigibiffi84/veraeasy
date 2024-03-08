namespace Veraeasy.EmailVerification.Infrastructure;

public class EmailVerificationConfiguration
{
    public const string Section = "EmailVerificationConfiguration";

    /* var authenticationOptions = configuration
                  .GetSection(KeycloakAuthenticationOptions.Section)
                  .Get<KeycloakAuthenticationOptions>();*/
    [ConfigurationKeyName("EmailSenderName")]
    public string EmailSenderName { get; set; }

    [ConfigurationKeyName("EmailSenderAddress")]
    public string EmailSenderAddress { get; set; }

    [ConfigurationKeyName("EmailSmtpServer")]
    public string EmailSmtpServer { get; set; }

    [ConfigurationKeyName("EmailSmtpAuthUser")]
    public string EmailSmtpAuthUser { get; set; }

    [ConfigurationKeyName("EmailSmtpAuthPassword")]
    public string EmailSmtpAuthPassword { get; set; }
}