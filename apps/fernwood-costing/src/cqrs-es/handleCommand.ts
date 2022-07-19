import handleMenuItemCommand from "./handleMenuItemCommand";
import handleSupplyCommand from "./handleSupplyCommand";

export default async (command) => {
  await handleSupplyCommand(command);
  await handleMenuItemCommand(command);
};
