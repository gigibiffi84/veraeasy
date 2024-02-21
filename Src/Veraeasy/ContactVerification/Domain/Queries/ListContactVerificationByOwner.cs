using MediatR;
using Veraeasy.Common.Cqrs;

namespace Veraeasy.ContactVerification.Domain.Queries;

public record ListContactVerificationByOwner(string Owner) : IQuery<IAsyncEnumerable<Data.ContactVerification>>;