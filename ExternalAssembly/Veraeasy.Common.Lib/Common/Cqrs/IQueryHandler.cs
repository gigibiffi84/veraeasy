using MediatR;

namespace Veraeasy.Common.Cqrs;

public interface IQueryHandler<in TArguments, R> : IRequestHandler<TArguments, R>
    where TArguments : IQuery<R>
{

}