import type { DomainEntity } from "../../cqrs-es-types/DomainEntity";
import type { SupplyType } from "./SupplyType";
import type { UnitOfMeasure } from "./UnitOfMeasure";

export type Supply = DomainEntity & {
  supplyName: string;
  supplierName: string;
  supplyNotes: string;
  supplyLink: string;
  supplyType: SupplyType;
  /**
   * The unit that purchasers use to think about the supply.
   * @example The unit is litres here, "We purchase 1.9 L of olive oil."
   * @remarks TODO [ubiqitous-language] It might make more sense to call this 'purchaseUnits'.
   */
  supplyUnits: UnitOfMeasure;
  purchaseQuantity: number;
  purchasePriceBeforeTax: number;
  percentWaste: number;
  hasPST: boolean;
};
