using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Veraeasy.EmailVerification.Domain.Service;

namespace Veraeasy.EmailVerification.Infrastructure;

public class SimpleEmailSender(IConfiguration configuration) : IEmailSenderService
{
    public void sendEmail(string owner, string recipient, string subject, string msg)
    {
        var conf = configuration.GetSection(EmailVerificationConfiguration.Section)
            .Get<EmailVerificationConfiguration>();
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(conf!.EmailSenderName + " " + owner, conf.EmailSenderAddress));
        message.To.Add(new MailboxAddress(recipient, recipient));
        message.Subject = subject;
        //message.Body = new TextPart("plain") { Text = messageBody };
        var builder = new BodyBuilder();
        builder.HtmlBody = msg;
        message.Body = builder.ToMessageBody();

        using (var client = new SmtpClient())
        {
            client.Connect(conf.EmailSmtpServer, 587, SecureSocketOptions.None);
            client.Authenticate(conf.EmailSmtpAuthUser, conf.EmailSmtpAuthPassword);
            client.Send(message);
            client.Disconnect(true);
        }
    }
}