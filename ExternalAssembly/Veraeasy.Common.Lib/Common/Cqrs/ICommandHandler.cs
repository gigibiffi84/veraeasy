using MediatR;

namespace Veraeasy.Common.Cqrs;

public interface ICommandHandler<in TCommand, R> : IRequestHandler<TCommand, R>
    where TCommand : ICommand<R>
{

}