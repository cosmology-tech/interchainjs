/** Represents a day of the week. */
export enum DayOfWeek {
  /** DAY_OF_WEEK_UNSPECIFIED - The day of the week is unspecified. */
  DAY_OF_WEEK_UNSPECIFIED = 0,
  /** MONDAY - Monday */
  MONDAY = 1,
  /** TUESDAY - Tuesday */
  TUESDAY = 2,
  /** WEDNESDAY - Wednesday */
  WEDNESDAY = 3,
  /** THURSDAY - Thursday */
  THURSDAY = 4,
  /** FRIDAY - Friday */
  FRIDAY = 5,
  /** SATURDAY - Saturday */
  SATURDAY = 6,
  /** SUNDAY - Sunday */
  SUNDAY = 7,
  UNRECOGNIZED = -1,
}
export const DayOfWeekAmino = DayOfWeek;
export function dayOfWeekFromJSON(object: any): DayOfWeek {
  switch (object) {
    case 0:
    case "DAY_OF_WEEK_UNSPECIFIED":
      return DayOfWeek.DAY_OF_WEEK_UNSPECIFIED;
    case 1:
    case "MONDAY":
      return DayOfWeek.MONDAY;
    case 2:
    case "TUESDAY":
      return DayOfWeek.TUESDAY;
    case 3:
    case "WEDNESDAY":
      return DayOfWeek.WEDNESDAY;
    case 4:
    case "THURSDAY":
      return DayOfWeek.THURSDAY;
    case 5:
    case "FRIDAY":
      return DayOfWeek.FRIDAY;
    case 6:
    case "SATURDAY":
      return DayOfWeek.SATURDAY;
    case 7:
    case "SUNDAY":
      return DayOfWeek.SUNDAY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DayOfWeek.UNRECOGNIZED;
  }
}
export function dayOfWeekToJSON(object: DayOfWeek): string {
  switch (object) {
    case DayOfWeek.DAY_OF_WEEK_UNSPECIFIED:
      return "DAY_OF_WEEK_UNSPECIFIED";
    case DayOfWeek.MONDAY:
      return "MONDAY";
    case DayOfWeek.TUESDAY:
      return "TUESDAY";
    case DayOfWeek.WEDNESDAY:
      return "WEDNESDAY";
    case DayOfWeek.THURSDAY:
      return "THURSDAY";
    case DayOfWeek.FRIDAY:
      return "FRIDAY";
    case DayOfWeek.SATURDAY:
      return "SATURDAY";
    case DayOfWeek.SUNDAY:
      return "SUNDAY";
    case DayOfWeek.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}