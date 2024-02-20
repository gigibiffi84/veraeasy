using MediatR;

namespace Veraeasy.Common.Cqrs;

public interface ICommand<out TResult> : IRequest<TResult>
{ }

public interface ICommand : IRequest
{ }