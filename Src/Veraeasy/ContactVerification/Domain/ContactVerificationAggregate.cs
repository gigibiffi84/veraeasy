using MediatR;
using Veraeasy.Common.Cqrs;
using Veraeasy.Common.Events;
using Veraeasy.ContactVerification.Data.Database.Reporitories;
using Veraeasy.ContactVerification.Domain.Features.CreateContactVerificationUseCase;

namespace Veraeasy.ContactVerification.Domain;

//TODO avoid import from namespace out of domain scope

public class ContactVerificationAggregate(
    ILogger<ContactVerificationAggregate> logger,
    IMediator mediator) : IContactVerificationAggregate
{
    //TODO: add contact verification status

    private readonly List<IDomainEvent> _domainEvents = new();


    private readonly List<IIntegrationEvent> _integrationEvents = new();
    private Guid Id { get; set; }

    private string Owner { get; set; }

    public async Task ContactVerificationCreated(ContactVerificationCreatedDomainEvent e,
        CancellationToken cancellationToken = default)
    {
        Id = e.VerificationId;
        logger.LogInformation($"Contact Verification Created {e.VerificationId}");
        RaiseDomainEvent(e);
        await PublishIntegrationEventsAsync(cancellationToken);
    }

    public void ContactVerificationAdded(ContactVerificationAddedChange e)
    {
        Id = e.VerificationId;
        logger.LogInformation($"Contact Verification Added {e.VerificationId}");
        RaiseDomainEvent(e);
    }

    public async Task ExecuteCommandAsync(ICommand command, CancellationToken cancellationToken = default)
    {
        await mediator.Send(command, cancellationToken);
        await PublishDomainEventsAsync(cancellationToken);
    }


    public async Task<TResult> ExecuteCommandAsync<TResult>(ICommand<TResult> command,
        CancellationToken cancellationToken = default)
    {
        var result = await mediator.Send(command, cancellationToken);
        await PublishDomainEventsAsync(cancellationToken);
        return result;
    }


    public async Task ContactVerificationUpdated(ContactVerificationCreatedDomainEvent e,
        CancellationToken cancellationToken = default)
    {
        Id = e.VerificationId;
        logger.LogInformation($"Contact Verification Created {e.VerificationId}");
        RaiseDomainEvent(e);
        await PublishIntegrationEventsAsync(cancellationToken);
    }

    public IReadOnlyList<IDomainEvent> GetDomainEvents()
    {
        return _domainEvents.ToList();
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
        _integrationEvents.Clear();
    }

    protected void RaiseDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
        var outsourced = domainEvent as IOutsourcedEvent<IIntegrationEvent>;
        if (outsourced != null)
        {
            var integrationEvent = outsourced.toIntegrationEvent();
            _integrationEvents.Add(integrationEvent);
        }

        var events = string.Join("##", _domainEvents.FindAll(d => d is not null).Select(d => d.ToString()));
        logger.LogInformation($"RaiseDomainEvent list snapshot {events}");
    }


    private async Task PublishIntegrationEventsAsync(CancellationToken cancellationToken = default)
    {
        var outsourced = _integrationEvents
            //.Where(e => e as IOutsourcedEvent<ContactVerificationEvent> is not null)
            //.Select(e => (e as IOutsourcedEvent<ContactVerificationEvent>)?.toIntegrationEvent())
            .ToList();

        foreach (var integrationEvent in outsourced)
        {
            logger.LogInformation($"Sending new event of type {integrationEvent}");
            await mediator.Publish(integrationEvent!);
        }
    }

    private async Task PublishDomainEventsAsync(CancellationToken cancellationToken = default)
    {
        var domainEvents = _domainEvents
            //.Where(e => e as IOutsourcedEvent<ContactVerificationEvent> is null)
            .ToList();

        /**
         publish and routing to correct handler
        **/
        foreach (var domainEvent in domainEvents) logger.LogInformation($"Sending new event of type {domainEvent}");
        //await mediator.Publish(domainEvent);
    }
}