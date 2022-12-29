const labourStrategy = {
  labourWageCurrency: 21,
  labourShiftLengthHours: 8,
  // Cutoff low season at 17K
  lowSeasonMonths: ["Nov", "Dec", "Jan", "Feb"],
  lowSeasonShiftsPerDay: 1.5,
  lowSeasonDaysPerWeek: 6,
  lowSeasonWeeksClosed: 2,
  // Cutoff shoulder season at 25K
  // We did more business in Oct than we did in May!
  shoulderSeasonMonths: ["Mar", "Apr", "May", "Oct"],
  shoulderSeasonShiftsPerDay: 3,
  shoulderSeasonDaysPerWeek: 6,
  shoulderSeasonWeeksClosed: 0,
  // High season captures the rest!
  highSeasonMonths: ["Jun", "Jul", "Aug", "Sep"],
  highSeasonShiftsPerDay: 4,
  highSeasonDaysPerWeek: 6,
  highSeasonWeeksClosed: 0,
};

export default labourStrategy;

export type LabourStrategy = typeof labourStrategy;
