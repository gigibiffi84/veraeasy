using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Veraeasy.EmailVerification.Domain.Service;

namespace Veraeasy.EmailVerification.Infrastructure;

public class SimpleEmailSender : IEmailSenderService
{
    public void sendEmail(string recipient, string subject, string msg, string verifyLink)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Veraeasy", "veraeasy.verify@veraeasy.cloud\n"));
        message.To.Add(new MailboxAddress(recipient, recipient));
        message.Subject = subject;
        //message.Body = new TextPart("plain") { Text = messageBody };
        var builder = new BodyBuilder();
        builder.HtmlBody = $"<p>Hi user, {msg}. Please verify email <a href={verifyLink}>here</a></p>";
        message.Body = builder.ToMessageBody();

        using (var client = new SmtpClient())
        {
            client.Connect("smtp.veraeasy.cloud", 587, SecureSocketOptions.None);
            //client.Connect("smtp.aruba.it", 587, SecureSocketOptions.StartTls);
            client.Authenticate("veraeasy.verify@veraeasy.cloud", "v3r434s_Y!");
            //client.Authenticate("6181121@aruba.it", "M4ng4654321!");
            client.Send(message);
            client.Disconnect(true);
        }
    }
}