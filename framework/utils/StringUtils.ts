
import randomString from "randomstring";
import format from "string-format";
export default class StringUtils {

    public static boolean(str: string): boolean {
        return !!JSON.parse(String(str).toLowerCase());
    }

    public static capitalizeFirstLetter(str: string): string {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    public static formatString(template: string, ...args: any[]): string {
        return template.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }

    public static formatStringValue(template: string, replaceValue: any): string {
        for (const [key, value] of Object.entries(replaceValue)) {
            template = template.replace(new RegExp(`{${key}}`, 'g'), String(value));
        }
        return template;
    }

    public static replaceAll(str: string, searchValue: string, replaceValue: string) {
        return str.replace(new RegExp(searchValue, 'g'), replaceValue);
    }

    public static replaceRegX(str: string, regX: RegExp, replaceValue: string) {
        return str.replace(regX, replaceValue);
    }

    public static randomAlphanumeric(length: number): string {
        return randomString.generate(length);
    }

    public static randomAlphabetic(length: number): string {
        return randomString.generate({ length, charset: 'alphabetic' });
    }

    public static randomNumeric(length: number): string {
        return randomString.generate({ length, charset: 'numeric' });
    }

    public static formatStringFromObject(str: string, obj: any): string {
        return format(str, obj);
    }

    public static getNumberFromString(str: string): number {
        const num = str.replace(/[^0-9]+/g, '');
        return parseFloat(num);
    }


    public static getStringCount(str: string, searchWord: string): number {
        const regex = new RegExp(searchWord, 'g');
        const matches = str.match(regex);
        return matches ? matches.length : 0;
    }

      public static isEqual(str1: string, str2: string): boolean {
    return str1 === str2;
  }

  public static isEqualIgnoreCase(str1: string, str2: string): boolean {
    return str1.toLowerCase() === str2.toLowerCase();
  }

  public static containsSubString(str: string, subStr: string): boolean {
    return str.includes(subStr);
  }

  public static containsSubStringIgnoreCase(str: string, subStr: string): boolean {
    return str.toLowerCase().includes(subStr.toLowerCase());
  }
}
