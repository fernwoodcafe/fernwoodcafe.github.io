import type {
  DomainCommand,
  DomainEventsRepository,
} from "@packages/cqrs-es-types";
import type { DomainCommandHandler } from "@packages/cqrs-es-types/DomainCommandHandler";
import handleMenuItemCommand, {
  type Props as MenuItemProps,
} from "./handleMenuItemCommand";
import handleSupplyCommand, {
  type Props as SupplyProps,
} from "./handleSupplyCommand";

type Props = MenuItemProps &
  SupplyProps & {
    domainEventsRepo: DomainEventsRepository;
  };

export default (props: Props): DomainCommandHandler =>
  async (command: DomainCommand) => {
    const events = [
      handleSupplyCommand(props, command),
      handleMenuItemCommand(props, command),
    ];

    // TODO [must-have] Handle rapid fire events that cause a 409.
    const promises = events.flat().map(props.domainEventsRepo.insert);
    await Promise.all(promises);
  };
