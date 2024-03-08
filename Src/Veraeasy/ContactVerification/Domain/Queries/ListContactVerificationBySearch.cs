using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Queries;

public record ListContactVerificationBySearch(string Term) : IQuery<List<ContactVerificationStatus>>;