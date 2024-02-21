using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data.Database.Reporitories;
using Veraeasy.ContactVerification.Domain.CreateContactVerification;

namespace Veraeasy.ContactVerification.Domain;
public interface IContactVerificationAggregate
{
    Task ContactVerificationCreated(ContactVerificationCreatedDomainEvent e, CancellationToken cancellationToken = default);

    void ContactVerificationAdded(ContactVerificationAddedChange e);

    Task ExecuteCommandAsync(ICommand command, CancellationToken cancellationToken = default);

    Task<TResult> ExecuteCommandAsync<TResult>(ICommand<TResult> command, CancellationToken cancellationToken = default);
}