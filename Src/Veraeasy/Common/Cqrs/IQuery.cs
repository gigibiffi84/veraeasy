using MediatR;

namespace Veraeasy.Common.Cqrs;

public interface IQuery<out TResult> : IRequest<TResult>
{ }

