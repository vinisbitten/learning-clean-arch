import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import customerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerIsCreated1Handler
  implements EventHandlerInterface<customerCreatedEvent>
{
  handle(event: customerCreatedEvent): void {
    console.log("This is the first console.log of the event: CustomerCreated");
  }
}
