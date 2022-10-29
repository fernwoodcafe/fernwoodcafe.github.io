import type { UnitOfMeasure } from "../types/UnitOfMeasure";
import unitConversions from "../values/unitConversions";

export default (unitOfMeasure: UnitOfMeasure): UnitOfMeasure[] => {
  const availableConversions = unitConversions.filter(
    (conversion) => conversion.FromUnit == unitOfMeasure
  );

  console.log("----------", {
    unitOfMeasure,
    availableConversions,
  });

  return availableConversions.length === 0
    ? [unitOfMeasure]
    : availableConversions
        .map((conversion) => conversion.ToUnit)
        .concat(unitOfMeasure);
};
