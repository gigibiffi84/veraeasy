namespace Veraeasy.Common.Events;

using MediatR;

public interface IIntegrationEvent : INotification
{
    Guid Id { get; }
    DateTimeOffset OccurredDateTime { get; }
}