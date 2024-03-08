using Microsoft.Extensions.Configuration;
using Moq;
using Veraeasy.EmailVerification.Domain.Model;
using Veraeasy.EmailVerification.Domain.Service;
using Veraeasy.EmailVerification.Infrastructure;
using Xunit.Abstractions;

namespace Veraeasy.Tests;

public class EmailSenderTest1
{
    private readonly ITestOutputHelper _testOutputHelper;

    public EmailSenderTest1(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
    }

    [Fact]
    public void Test1()
    {
        var mockedConf = Mock.Of<IConfiguration>();
        IEmailSenderService service = new SimpleEmailSender(mockedConf);
        var mapping = new OwnerUserCredentilasMapping();
        var conf = mapping.getOwnerConfiguration("bifulcoluigi");
        var msg = conf.GetTemplateInterpolation(Guid.NewGuid().ToString(), "12345", Guid.NewGuid().ToString());
        _testOutputHelper.WriteLine(msg);
        //service.sendEmail("bifulcoluigi@gmail.com", "test", msg);
    }
}