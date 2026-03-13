import { test, expect } from "@playwright/test";
export default class Assert {

    public static async assertTrue(condition: boolean, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${description} is true`, async () => {
            try {
                expect(condition, `Expected is 'True' & Actual is ${condition}`).toBeTruthy();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assetion failed: ${description} is not true. ${error}`);
                }
            }
        });
    }

    public static async assertContains(value1: string, value2: string, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${value1} contains ${value2}`, async () => {
            try {
                expect(value1, `Expected '${value1}' to contain '${value2}'`).toContain(value2);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} does not contain ${value2}. ${error}`);
                }
            }
        });
    }

    public static async assertContainsIgnoreCase(value1: string, value2: string, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${value1} contains ${value2} ignoring case`, async () => {
            try {
                expect(value1.toLowerCase(), `Expected '${value1}' to contain '${value2}' ignoring case`).toContain(value2.toLowerCase());
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} does not contain ${value2} ignoring case. ${error}`);
                }
            }
        });
    }

    public static async assertEquals(value1: any, value2: any, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${value1} equals ${value2}`, async () => {
            try {
                expect(value1, `Expected '${value1}' to be EQUAL to '${value2}'`).toEqual(value2);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} does not equal ${value2}. ${error}`);
                }
            }
        });
    }


    public static async assertFalse(condition: boolean, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${description} is false`, async () => {
            try {
                expect(condition, `Expected is 'False' & Actual is ${condition}`).toBeFalsy();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} is not false. ${error}`);
                }
            }
        });
    }

    public static async assertNotContains(value1: string, value2: string, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${value1} does not contain ${value2}`, async () => {
            try {
                expect(value1, `Expected '${value1}' not to contain '${value2}'`).not.toContain(value2);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} contains ${value2}. ${error}`);
                }
            }
        });
    }

    public static async assertNotEquals(value1: any, value2: any, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${value1} does not equal ${value2}`, async () => {
            try {
                expect(value1, `Expected '${value1}' not to be EQUAL to '${value2}'`).not.toEqual(value2);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} equals ${value2}. ${error}`);
                }
            }
        });
    }

    public static async assertNotNull(value: any, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${description} is not null`, async () => {
            try {
                expect(value, `Expected '${description}' not to be null`).not.toBeNull();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} is null. ${error}`);
                }
            }
        });
    }

    public static async assertNull(value: any, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${description} is null`, async () => {
            try {
                expect(value, `Expected '${description}' to be null`).toBeNull();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} is not null. ${error}`);
                }
            }
        });
    }

    public static async assertUndefined(value: any, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${description} is undefined`, async () => {
            try {
                expect(value, `Expected '${description}' to be undefined`).toBeUndefined();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} is not undefined. ${error}`);
                }
            }
        });
    }

    public static async assertNotUndefined(value: any, description: string, softAssert: boolean = false) {
        await test.step(`Verifying that ${description} is not undefined`, async () => {
            try {
                expect(value, `Expected '${description}' not to be undefined`).not.toBeUndefined();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} is undefined. ${error}`);
                }
            }
        });
    }

    public static async assertToBeEmpty(value: any, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is empty`, async () => {
            try {
                await expect(value, `Expected is 'Empty' & Actual is '${value}'`).toBeEmpty();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} is not empty. ${error}`);
                }
            }
        });
    }

    public static async assertToBeGreaterThan(actualValue: number, expectedValue: number, description: string, softAssert = false) {
        await test.step(`Verifying that ${actualValue} is greater than ${expectedValue}`, async () => {
            try {
                expect(Number(actualValue), `Expected ${actualValue} to be greater than
                 ${expectedValue}`).toBeGreaterThan(Number(expectedValue));
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} is not greater than ${expectedValue}. ${error}`);
                }
            }
        });
    }

    public static async assertToBeGreaterThanOrEqual(actualValue: string, expectedValue: string, description: string, softAssert = false) {
        await test.step(`Verifying that ${actualValue} is greater than or equal to ${expectedValue}`, async () => {
            try {
                expect(Number(actualValue), `Expected ${actualValue} to be greater than or equal to ${expectedValue}`)
                    .toBeGreaterThanOrEqual(Number(expectedValue));
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} is not greater than or equal to ${expectedValue}. ${error}`);
                }
            }
        });
    }

    public static async assertToBeLessThan(actualValue: string, expectedValue: string, description: string, softAssert = false) {
        await test.step(`Verifying that ${actualValue} is less than ${expectedValue}`, async () => {
            try {
                expect(Number(actualValue), `Expected ${actualValue} to be less than ${expectedValue}`)
                    .toBeLessThan(Number(expectedValue));
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} is not less than ${expectedValue}. ${error}`);
                }
            }
        });
    }

    public static async assertToBeLessThanOrEqual(actualValue: string, expectedValue: string, description: string, softAssert = false) {
        await test.step(`Verifying that ${actualValue} is less than or equal to ${expectedValue}`, async () => {
            try {
                expect(Number(actualValue), `Expected ${actualValue} to be less than or equal to ${expectedValue}`)
                    .toBeLessThanOrEqual(Number(expectedValue));
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} is not less than or equal to ${expectedValue}. ${error}`);
                }
            }
        });
    }

    public static async assertArrayEquals(actualArray: any[], expectedArray: any[], description: string, softAssert = false) {
        await test.step(`Verifying that array contains ${expectedArray}`, async () => {
            try {
                expect(actualArray, `Expected array to contain ${expectedArray}`).toEqual(expect.arrayContaining(expectedArray));
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} does not contain ${expectedArray}. ${error}`);
                }
            }
        });
    }

    public static async assertArrayContainsValue(expectedValue: string, array: any[], description: string, softAssert = false) {
        await test.step(`Verifying that array contains ${expectedValue}`, async () => {
            try {
                expect(array, `Expected array to contain ${expectedValue}`).toContain(expectedValue);
                // expect.soft()
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} does not contain ${expectedValue}. ${error}`);
                }
            }
        });
    }

    public static async assertObjectToHaveProperty(jObject: any, keypath: string, expectedValue: string, description: string, softAssert = false) {
        await test.step(`Verifying that object has property ${keypath}`, async () => {
            try {
                expect(jObject, `Expected object to have property ${keypath}`).toHaveProperty(keypath, expectedValue);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(`Assertion failed: ${description} does not have property ${keypath} with value ${expectedValue}. ${error}`);
                }
            }
        });
    }
}