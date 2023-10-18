/**
 * A `CalendarPeriod` represents the abstract concept of a time period that has
 * a canonical start. Grammatically, "the start of the current
 * `CalendarPeriod`." All calendar times begin at midnight UTC.
 */
export enum CalendarPeriod {
  /** CALENDAR_PERIOD_UNSPECIFIED - Undefined period, raises an error. */
  CALENDAR_PERIOD_UNSPECIFIED = 0,
  /** DAY - A day. */
  DAY = 1,
  /**
   * WEEK - A week. Weeks begin on Monday, following
   * [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date).
   */
  WEEK = 2,
  /**
   * FORTNIGHT - A fortnight. The first calendar fortnight of the year begins at the start
   * of week 1 according to
   * [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date).
   */
  FORTNIGHT = 3,
  /** MONTH - A month. */
  MONTH = 4,
  /**
   * QUARTER - A quarter. Quarters start on dates 1-Jan, 1-Apr, 1-Jul, and 1-Oct of each
   * year.
   */
  QUARTER = 5,
  /** HALF - A half-year. Half-years start on dates 1-Jan and 1-Jul. */
  HALF = 6,
  /** YEAR - A year. */
  YEAR = 7,
  UNRECOGNIZED = -1,
}
export const CalendarPeriodAmino = CalendarPeriod;
export function calendarPeriodFromJSON(object: any): CalendarPeriod {
  switch (object) {
    case 0:
    case "CALENDAR_PERIOD_UNSPECIFIED":
      return CalendarPeriod.CALENDAR_PERIOD_UNSPECIFIED;
    case 1:
    case "DAY":
      return CalendarPeriod.DAY;
    case 2:
    case "WEEK":
      return CalendarPeriod.WEEK;
    case 3:
    case "FORTNIGHT":
      return CalendarPeriod.FORTNIGHT;
    case 4:
    case "MONTH":
      return CalendarPeriod.MONTH;
    case 5:
    case "QUARTER":
      return CalendarPeriod.QUARTER;
    case 6:
    case "HALF":
      return CalendarPeriod.HALF;
    case 7:
    case "YEAR":
      return CalendarPeriod.YEAR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CalendarPeriod.UNRECOGNIZED;
  }
}
export function calendarPeriodToJSON(object: CalendarPeriod): string {
  switch (object) {
    case CalendarPeriod.CALENDAR_PERIOD_UNSPECIFIED:
      return "CALENDAR_PERIOD_UNSPECIFIED";
    case CalendarPeriod.DAY:
      return "DAY";
    case CalendarPeriod.WEEK:
      return "WEEK";
    case CalendarPeriod.FORTNIGHT:
      return "FORTNIGHT";
    case CalendarPeriod.MONTH:
      return "MONTH";
    case CalendarPeriod.QUARTER:
      return "QUARTER";
    case CalendarPeriod.HALF:
      return "HALF";
    case CalendarPeriod.YEAR:
      return "YEAR";
    case CalendarPeriod.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}