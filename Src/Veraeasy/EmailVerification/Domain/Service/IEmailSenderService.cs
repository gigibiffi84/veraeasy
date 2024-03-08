namespace Veraeasy.EmailVerification.Domain.Service;

public interface IEmailSenderService
{
    void sendEmail(string owner, string recipient, string subject, string msg);
}