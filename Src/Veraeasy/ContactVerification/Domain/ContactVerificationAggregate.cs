namespace Veraeasy.ContactVerification.Domain;

using MediatR;
using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Domain.CreateContactVerification;

public class ContactVerificationAggregate(IMediator mediator) : IContactVerificationAggregate
{
    public Guid Id { get; private set; }

    //TODO: add contact verification status

    private readonly List<IDomainEvent> _domainEvents = new();

    public IReadOnlyList<IDomainEvent> GetDomainEvents()
    {
        return _domainEvents.ToList();
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }

    protected void RaiseDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void ContactVerificationCreated(ContactVerificationCreatedDomainEvent e)
    {
        this.Id = e.VerificationId;
        RaiseDomainEvent(e);
    }

    public async Task ExecuteCommandAsync(ICommand command, CancellationToken cancellationToken = default) =>
        await mediator.Send(command, cancellationToken);

    public async Task<TResult> ExecuteCommandAsync<TResult>(ICommand<TResult> command, CancellationToken cancellationToken = default) =>
        await mediator.Send(command, cancellationToken);

}
