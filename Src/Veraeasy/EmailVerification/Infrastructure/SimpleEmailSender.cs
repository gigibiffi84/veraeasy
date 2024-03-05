using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Veraeasy.EmailVerification.Domain.Service;

namespace Veraeasy.EmailVerification.Infrastructure;

public class SimpleEmailSender : IEmailSenderService
{
    public void sendEmail(string recipient, string subject, string verifyLink)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("FromName", "fromAddress@gmail.com"));
        message.To.Add(new MailboxAddress("", recipient));
        message.Subject = subject;
        //message.Body = new TextPart("plain") { Text = messageBody };
        var builder = new BodyBuilder();
        builder.HtmlBody = $"<p>Hi user, please verify email <a href={verifyLink}>here</a></p>";
        message.Body = builder.ToMessageBody();

        using (var client = new SmtpClient())
        {
            client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            //client.Connect("smtp.aruba.it", 587, SecureSocketOptions.StartTls);
            client.Authenticate("bifulcoluigi@gmail.com", "gkds mdzm ftgi qkuq");
            //client.Authenticate("6181121@aruba.it", "M4ng4654321!");
            client.Send(message);
            client.Disconnect(true);
        }
    }
}