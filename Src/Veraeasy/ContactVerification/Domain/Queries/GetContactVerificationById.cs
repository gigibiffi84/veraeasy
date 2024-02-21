using MediatR;

namespace Veraeasy.ContactVerification.Domain.Queries;

public record GetContactVerificationById(string Id) : IRequest<Data.ContactVerification>;