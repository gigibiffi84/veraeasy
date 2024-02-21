using Veraeasy.Common.Events;

namespace Veraeasy.Core.IIntegrationEvents;

public enum ContactVerificationEventType
{
    CREATED
}

public record ContactVerificationEvent(Guid EntityId, DateTimeOffset EventDateTime, ContactVerificationEventType EventType) : IIntegrationEvent
{
    public Guid Id  {get => EntityId;}

    public DateTimeOffset OccurredDateTime => EventDateTime;

    public ContactVerificationEventType Type => EventType;
}