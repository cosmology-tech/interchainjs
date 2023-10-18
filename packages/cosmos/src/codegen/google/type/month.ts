/** Represents a month in the Gregorian calendar. */
export enum Month {
  /** MONTH_UNSPECIFIED - The unspecified month. */
  MONTH_UNSPECIFIED = 0,
  /** JANUARY - The month of January. */
  JANUARY = 1,
  /** FEBRUARY - The month of February. */
  FEBRUARY = 2,
  /** MARCH - The month of March. */
  MARCH = 3,
  /** APRIL - The month of April. */
  APRIL = 4,
  /** MAY - The month of May. */
  MAY = 5,
  /** JUNE - The month of June. */
  JUNE = 6,
  /** JULY - The month of July. */
  JULY = 7,
  /** AUGUST - The month of August. */
  AUGUST = 8,
  /** SEPTEMBER - The month of September. */
  SEPTEMBER = 9,
  /** OCTOBER - The month of October. */
  OCTOBER = 10,
  /** NOVEMBER - The month of November. */
  NOVEMBER = 11,
  /** DECEMBER - The month of December. */
  DECEMBER = 12,
  UNRECOGNIZED = -1,
}
export const MonthAmino = Month;
export function monthFromJSON(object: any): Month {
  switch (object) {
    case 0:
    case "MONTH_UNSPECIFIED":
      return Month.MONTH_UNSPECIFIED;
    case 1:
    case "JANUARY":
      return Month.JANUARY;
    case 2:
    case "FEBRUARY":
      return Month.FEBRUARY;
    case 3:
    case "MARCH":
      return Month.MARCH;
    case 4:
    case "APRIL":
      return Month.APRIL;
    case 5:
    case "MAY":
      return Month.MAY;
    case 6:
    case "JUNE":
      return Month.JUNE;
    case 7:
    case "JULY":
      return Month.JULY;
    case 8:
    case "AUGUST":
      return Month.AUGUST;
    case 9:
    case "SEPTEMBER":
      return Month.SEPTEMBER;
    case 10:
    case "OCTOBER":
      return Month.OCTOBER;
    case 11:
    case "NOVEMBER":
      return Month.NOVEMBER;
    case 12:
    case "DECEMBER":
      return Month.DECEMBER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Month.UNRECOGNIZED;
  }
}
export function monthToJSON(object: Month): string {
  switch (object) {
    case Month.MONTH_UNSPECIFIED:
      return "MONTH_UNSPECIFIED";
    case Month.JANUARY:
      return "JANUARY";
    case Month.FEBRUARY:
      return "FEBRUARY";
    case Month.MARCH:
      return "MARCH";
    case Month.APRIL:
      return "APRIL";
    case Month.MAY:
      return "MAY";
    case Month.JUNE:
      return "JUNE";
    case Month.JULY:
      return "JULY";
    case Month.AUGUST:
      return "AUGUST";
    case Month.SEPTEMBER:
      return "SEPTEMBER";
    case Month.OCTOBER:
      return "OCTOBER";
    case Month.NOVEMBER:
      return "NOVEMBER";
    case Month.DECEMBER:
      return "DECEMBER";
    case Month.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}