namespace Veraeasy.ContactVerification.Domain.CreateContactVerification;

using Veraeasy.Common.Cqrs;
using Veraeasy.Core.IIntegrationEvents;

public class ContactVerificationEventHandler : IEventHandler<ContactVerificationEvent>
{
    private ILogger<ContactVerificationEventHandler> _logger;
    public ContactVerificationEventHandler(ILogger<ContactVerificationEventHandler> logger)
    {
        _logger = logger;
        _logger.LogInformation($"Created new instance of ContactVerificationEventHandler {this}");
    }
    public Task Handle(ContactVerificationEvent notification, CancellationToken cancellationToken)
    {
        //this is the right point to send event out of this domain
        _logger.LogInformation($"Received new event in ContactVerificationEventHandler {notification.EventType}");
        return Task.CompletedTask;
    }
}