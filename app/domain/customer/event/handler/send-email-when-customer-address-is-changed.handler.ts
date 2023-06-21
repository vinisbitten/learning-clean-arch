import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import customerAddressChangedEvent from "../customer-address-changed.event";

export default class SendEmailWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<customerAddressChangedEvent>
{
  handle(event: customerAddressChangedEvent): void {
    console.log(
      "Client address: " +
        event.eventData.id +
        ", " +
        event.eventData.name +
        " altered to " +
        event.eventData.address
    );
  }
}
