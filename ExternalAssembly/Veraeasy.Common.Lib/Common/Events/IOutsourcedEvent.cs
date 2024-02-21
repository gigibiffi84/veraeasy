
namespace Veraeasy.Common.Events;

using MediatR;


public interface IOutsourcedEvent<out TEvent> where TEvent : IIntegrationEvent
{

        public TEvent toIntegrationEvent();


}