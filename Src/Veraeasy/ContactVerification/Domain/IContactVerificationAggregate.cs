using Veraeasy.Common.Cqrs;

namespace Veraeasy.ContactVerification.Domain;
public interface IContactVerificationAggregate
{
    Task ExecuteCommandAsync(ICommand command, CancellationToken cancellationToken = default);

    Task<TResult> ExecuteCommandAsync<TResult>(ICommand<TResult> command, CancellationToken cancellationToken = default);
}