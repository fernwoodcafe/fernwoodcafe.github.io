import unitConversions from "../values/unitConversions";

export default (unitOfMeasure: string) => {
  const conversions = Object.keys(unitConversions).map((conversion) =>
    conversion.split("/")
  );

  const availableConversions = conversions.filter(
    (conversion) => conversion[0] == unitOfMeasure
  );

  return availableConversions.map((conversion) => conversion[1]);
};
