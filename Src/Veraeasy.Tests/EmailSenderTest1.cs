using Moq;
using Veraeasy.EmailVerification.Domain.Service;
using Veraeasy.EmailVerification.Infrastructure;

namespace Veraeasy.Tests;

public class EmailSenderTest1
{
    [Fact]
    public void Test1()
    {
        var mockedService = Mock.Of<IEmailSenderService>();
        IEmailSenderService service = new SimpleEmailSender();
        service.sendEmail("bifulcoluigi@gmail.com", "test", "http://www.veraeasy.cloud");
    }
}