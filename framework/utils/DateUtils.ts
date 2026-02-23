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
   

}
