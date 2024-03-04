using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Queries;

public record GetContactVerificationById(string Id) : IQuery<ContactVerificationStatus>;