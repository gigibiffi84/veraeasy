using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Queries;

public record ListContactVerificationByOwner(string Owner) : IQuery<IAsyncEnumerable<ContactVerificationStatus>>;