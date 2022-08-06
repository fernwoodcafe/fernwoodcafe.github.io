import type { DomainCommand } from "@/domain/types";
import handleMenuItemCommand, {
  type Props as MenuItemProps,
} from "./handleMenuItemCommand";
import handleSupplyCommand, {
  type Props as SupplyProps,
} from "./handleSupplyCommand";

type Props = MenuItemProps & SupplyProps;

export default (props: Props) => async (command: DomainCommand) => {
  await handleSupplyCommand(props, command);
  await handleMenuItemCommand(props, command);
};
