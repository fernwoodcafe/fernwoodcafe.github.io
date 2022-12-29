const labourStrategy = {
  labourWageCurrency: 21,
  labourShiftLengthHours: 8,
  // Cutoff low season at 17K
  lowSeasonMonths: ["Nov", "Dec", "Jan", "Feb"].join(", "),
  lowSeasonShiftsPerDay: 1.5,
  // Cutoff shoulder season at 25K
  // We did more business in Oct than we did in May!
  shoulderSeasonMonths: ["Mar", "Apr", "May", "Oct"].join(", "),
  shoulderSeasonShiftsPerDay: 2,
  // High season captures the rest!
  highSeasonMonths: ["Jun", "Jul", "Aug", "Sep"].join(", "),
  highSeasonShiftsPerDay: 4,
};

export default labourStrategy;

export type LabourStrategy = typeof labourStrategy;
