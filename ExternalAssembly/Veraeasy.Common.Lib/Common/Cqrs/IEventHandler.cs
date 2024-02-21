using MediatR;
using Veraeasy.Common.Events;

namespace Veraeasy.Common.Cqrs;

public interface IEventHandler<in TEvent> : INotificationHandler<TEvent>
    where TEvent : IIntegrationEvent
{

}