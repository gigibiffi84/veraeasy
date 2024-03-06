namespace Veraeasy.EmailVerification.Domain.Service;

public interface IEmailSenderService
{
    void sendEmail(string recipient, string subject, string msg, string verifyLink);
}