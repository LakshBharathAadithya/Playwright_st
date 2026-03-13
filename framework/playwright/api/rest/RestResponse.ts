import jp from "jsonpath";
import { test } from "@playwright/test";
import fs from "fs";
import CommonConstants from "../../../constants/CommonConstants";
import jsonschema from "jsonschema";
import Assert from "../../asserts/Assert";
export default class RestResponse {

    constructor(private headers: any, private status: number, private body: string, private description: string) { }

    public async getTageContentyByJsonPath(jsonPath: string, description: string) {
        let text = undefined;
        await test.step(`Getting value from response body for JSON path: ${jsonPath} and description: ${description}`, async () => {
            const jsonBody = JSON.parse(this.body);
            text = jp.query(jsonBody, jsonPath)[0];
        });
        return text;
    }

    public async getHeaderValueByKey(key: string) {
        let headerValue = undefined;
        await test.step(`Getting header value for key: ${key} from response`, async () => {
            const jsonHeaders = JSON.parse(JSON.stringify(this.headers));
            headerValue = jsonHeaders[key];
        });
        return headerValue;
    }

    public async getStatusCode() {
        let statusCode;
        await test.step(`Getting status code from response`, async () => {
            statusCode = this.status;
        });
        return statusCode;
    }

    public async getBody() {
        let responseBody;
        await test.step(`Getting response body`, async () => {
            responseBody = this.body;
        });
        return responseBody;
    }

    public async getHeaders() {
        let responseHeaders;
        await test.step(`Getting response headers`, async () => {
            responseHeaders = this.headers;
        });
        return responseHeaders;
    }

    public async validateResponseSchema(expectedSchema: string) {
        await test.step(`Validating response body schema with expected schema: ${JSON.stringify(expectedSchema)}`, async () => {
            const jsonBody = JSON.parse(this.body);
            if (expectedSchema.endsWith(".json")) {
                expectedSchema = fs.readFileSync(`${CommonConstants.REST_JSON_SCHEMA_PATH}${expectedSchema}`, "utf-8");
            }
            const jsonSchema = new jsonschema.Validator();
            const result = jsonSchema.validate(jsonBody, JSON.parse(expectedSchema));
            if (!result.valid) {
                await test.info().attach(`Schema Validation Errors for ${this.description}`, {
                    body: JSON.stringify(result.errors, null, 2),
                    contentType: 'application/json'
                });
                throw new Error(`Response body schema validation failed for ${this.description}. refer attached schema validation errors for details.`);
            }
        });
    }

    public async validateStatusCode(expectedStatusCode: number) {
        await test.step(`Validating response status code. Expected: ${expectedStatusCode}, Actual: ${this.status}`, async () => {
            if (this.status !== expectedStatusCode) {
                await Assert.assertEquals(this.status, expectedStatusCode, `Expected status code: ${expectedStatusCode}, but found: ${this.status} for ${this.description}`);
            }
        });
    }
}