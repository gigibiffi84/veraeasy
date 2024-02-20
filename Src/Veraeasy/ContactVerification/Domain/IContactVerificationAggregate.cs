using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Domain.CreateContactVerification;

namespace Veraeasy.ContactVerification.Domain;
public interface IContactVerificationAggregate
{
    void ContactVerificationCreated(ContactVerificationCreatedDomainEvent e);

    Task ExecuteCommandAsync(ICommand command, CancellationToken cancellationToken = default);

    Task<TResult> ExecuteCommandAsync<TResult>(ICommand<TResult> command, CancellationToken cancellationToken = default);
}