export const unitsOfMeasureMass = <const>[
  "gram",
  "ounce-mass",
  "pound",
  "kilogram",
];

export const unitsOfMeasureVolume = <const>[
  "litre",
  "millilitre",
  "ounce-fluid-us",
  "cup-metric",
];

export const unitsOfMeasureItem = <const>["item", "slice"];

export default <const>[
  "-",
  ...unitsOfMeasureMass,
  ...unitsOfMeasureVolume,
  ...unitsOfMeasureItem,
];
