namespace Veraeasy.ContactVerification.Domain;

using MediatR;
using Veraeasy.Common.Cqrs;

internal sealed class ContactVerificationAggregate(IMediator mediator) : IContactVerificationAggregate
{
    public async Task ExecuteCommandAsync(ICommand command, CancellationToken cancellationToken = default) =>
        await mediator.Send(command, cancellationToken);

    public async Task<TResult> ExecuteCommandAsync<TResult>(ICommand<TResult> command, CancellationToken cancellationToken = default) =>
        await mediator.Send(command, cancellationToken);
}
