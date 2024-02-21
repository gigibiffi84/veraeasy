
using Veraeasy.Common.Cqrs;

namespace Veraeasy.ContactVerification.Domain.Queries;

public record GetContactVerificationById(string Id) : IQuery<Data.ContactVerification>;