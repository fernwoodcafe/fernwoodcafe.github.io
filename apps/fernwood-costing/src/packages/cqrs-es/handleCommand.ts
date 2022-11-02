import type {
  DomainCommand,
  DomainEventsRepository,
  Materializer,
} from "@packages/cqrs-es-types";
import type { DomainCommandHandler } from "@packages/cqrs-es-types/DomainCommandHandler";
import type {
  CompositeSupply,
  InventorySheet,
  MenuItem,
  Supply,
} from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types";
import handleCompositeSupplyCommand from "./handleCompositeSupplyCommand";
import handleInventoryCommand from "./handleInventoryCommand";
import handleMenuItemCommand from "./handleMenuItemCommand";
import handleSupplyCommand from "./handleSupplyCommand";

type Props = {
  menuItemsList: ReactiveArray<MenuItem>;
  materializeMenuItems: Materializer<ReactiveArray<MenuItem>>;
  suppliesList: ReactiveArray<Supply>;
  materializeSupplies: Materializer<ReactiveArray<Supply>>;
  compositeSuppliesList: ReactiveArray<CompositeSupply>;
  materializeCompositeSupplies: Materializer<ReactiveArray<CompositeSupply>>;
  inventorySheetsList: ReactiveArray<InventorySheet>;
  materializeInventorySheets: Materializer<ReactiveArray<InventorySheet>>;
  domainEventsRepo: DomainEventsRepository;
};

export default (props: Props): DomainCommandHandler =>
  async (command: DomainCommand) => {
    const events = [
      handleSupplyCommand(props, command),
      handleCompositeSupplyCommand(props, command),
      handleInventoryCommand(props, command),
      handleMenuItemCommand(props, command),
    ];

    const promises = events.flat().map(props.domainEventsRepo.insert);
    await Promise.all(promises);
  };
