import type { DomainEntity } from "@packages/cqrs-es-types/DomainEntity";
import type { Supply } from "./Supply";
import type { SupplyType } from "./SupplyType";
import type { UnitOfMeasure } from "./UnitOfMeasure";

export type CompositeSupply = DomainEntity & {
  compositeSupplyName: string;
  compositeSupplyType: SupplyType;
  compositeSupplyUnits: UnitOfMeasure;
  supplies: Supply[];
};
