import unitConversions from "../values/unitConversions";

export default (unitOfMeasure: string) => {
  const availableConversions = unitConversions.filter(
    (conversion) => conversion[0] == unitOfMeasure
  );

  return availableConversions.length === 0
    ? [unitOfMeasure]
    : availableConversions.map((conversion) => conversion[1]);
};
