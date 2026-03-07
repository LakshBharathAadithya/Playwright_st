import moment from 'moment';
import CommonConstants from '../constants/CommonConstants';


export default class DateUtil {
   /**
    * Generates date based on the input
    * @param format date format
    * @param days increment OR decrement the days
    * @param months increment OR decrement the months
    * @param years increment OR decrement the years
    * @returns 
    */
   public static dateGenerator(format: string, days: number, months: number, years: number): string {
      const date = moment().add(days, 'd').add(months, 'M').add(years, 'y')
         .format(format);
      return date;
   }

   /**
    * Customizes the date that has been given as input based on other input parameter
    * @param date to be customized
    * @param format date format
    * @param days increment OR decrement the days
    * @param months increment OR decrement the months
    * @param years increment OR decrement the years
    * @returns 
    */
   public static dateCustomizer(date: string, format: string, days: number, months: number, years: number): string {
      const customDate = moment(date, format).add(days, 'd').add(months, 'M').add(years, 'y')
         .format(format);
      return customDate;
   }
   /**
    * Change format of the date
    * @param date input date
    * @param currentFormat current format of the date
    * @param newFormat new format of the date to be converted
    * @returns 
    */
   public static changeDateFormat(date: string, currentFormat: string, newFormat: string): string {
      const customDate = moment(date, currentFormat).format(newFormat);
      return customDate;
   }
   /**
    * Generates time in hr:min format based on the input
    * @param format time format
    * @param hours increment OR decrement the hours
    * @param minutes increment OR decrement the minutes
    * @param utcOffSetValue pass the offset value for UTC time zone
    * @returns 
    */
   public static timeGenerator(format: string, hours: number, minutes: number, utcOffSetValue: number): string {
      // eslint-disable-next-line newline-per-chained-call
      const time = moment().utcOffset(utcOffSetValue).add(minutes, 'm').add(hours, 'h').format(format);
      return time;
   }

   /**
    * Get the Date difference in Years, Months and Days
    * @param date1  pass the first Date
    * @param date2  pass the second Date
    * @returns returns the date difference in Years, Months and Days
    */
   public static getDateDifference(date1: string, date2: string, dateFormat: string) {
      const years = moment(date1, dateFormat).diff(moment(date2, dateFormat), "years");
      const months = moment(date1, dateFormat).diff(moment(date2, dateFormat), "months");
      const days = moment(date1, dateFormat).diff(moment(date2, dateFormat), "days");
      return { years: years, months: months, days: days };
   }

   /**
    * Get the Today's Date in format DD/MM/YYYY
    * @returns - return the Today's Date
    */
   public static getTodayDate() {
      return moment().format(CommonConstants.DATE_FORMAT);
   }

   public static isDateInRange(date: string, startDate: string, endDate: string, dateFormat: string): boolean {
      const targetDate = moment(date, dateFormat);
      const start = moment(startDate, dateFormat);
      const end = moment(endDate, dateFormat);
      return targetDate.isBetween(start, end, undefined, '[]');
   }

   /**
    * Get the duration between two date-time values
    * @param startDateTime start date-time
    * @param endDateTime end date-time
    * @param dateTimeFormat format of the date-time strings
    * @returns duration in days, hours, minutes, seconds, and milliseconds
    */
   public static getDurationBetweenDateTimes(
      startDateTime: string,
      endDateTime: string,
      dateTimeFormat: string
   ) {
      const start = moment(startDateTime, dateTimeFormat);
      const end = moment(endDateTime, dateTimeFormat);
      const duration = moment.duration(end.diff(start));

      return {
         days: Math.floor(duration.asDays()),
         hours: duration.hours(),
         minutes: duration.minutes(),
         seconds: duration.seconds(),
         milliseconds: duration.milliseconds()
      };
   }

   public static addSecondsToUnixTime(seconds: number): number {
      return Date.now() + (seconds * 1000);
   }

   public static isDateBefore(date1: string, date2: string, dateFormat: string): boolean {
      const d1 = moment(date1, dateFormat);
      const d2 = moment(date2, dateFormat);
      return d1.isBefore(d2);
   }

   public static isDateAfter(date1: string, date2: string, dateFormat: string): boolean {
      const d1 = moment(date1, dateFormat);
      const d2 = moment(date2, dateFormat);
      return d1.isAfter(d2);
   }

   public static get currentYear() {
      return moment().year();
   }

   public static get currentMonth() {
      return moment().month() + 1; // month is zero-indexed
   }

   public static get currentDay() {
      return moment().date();
   }

   public static get noOfDaysInCurrentMonth() {
      return moment().daysInMonth();
   }

   public static getUnixTime(): number {
      return Date.now();
   }

   public static getDayOfTheWeekAndMonth(date: string, dateFormat: string) {
      const d = moment(date, dateFormat);
      return {
         dayShort: d.format('ddd'),
         dayLong: d.format('dddd'),
         monthShort: d.format('MMM'),
         monthLong: d.format('MMMM'),
      };
   }

   public static isLeapYear(date: string, dateFormat: string): boolean {
      return moment(date, dateFormat).isLeapYear();
   }

   public static getTodayDateUTCOffset(utcOffSetValue: number, format: string): string {
      return moment().utcOffset(utcOffSetValue).format(format);
   }

   public static wait(seconds: number) {
      const endTime = seconds * 1000;
      const startTime = new Date().getTime();
      let elapsed = 0;
      while(elapsed < endTime) {
         elapsed = new Date().getTime() - startTime;
      }
   }

   public static isWeekEnd(date: string, dateFormat: string) {
      const dayOfWeek = moment(date, dateFormat).day();
      return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
   }

   public static isDateTimeValid(dateTime: string, dateTimeFormat: string): boolean {
      return moment(dateTime, dateTimeFormat, true).isValid();
   }
}
