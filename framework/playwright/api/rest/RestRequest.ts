import { Page } from "playwright";
import test, { APIResponse } from "@playwright/test";
import fs from "fs";
import CommonConstants from "../../../constants/CommonConstants";
import StringUtils from "../../../utils/StringUtils";
import fetch_to_curl from "fetch-to-curl";
import RestResponse from "./RestResponse";

export default class RestRequest {
    constructor(private page: Page) { }

    public async createRequestBody(jsonFileName: string, data: any) {
        let requestJson = fs.readFileSync(`${CommonConstants.REST_JSON_REQUEST_PATH}/${jsonFileName}`, "utf-8");
        requestJson = StringUtils.formatStringValue(requestJson, data);
        return requestJson;
    }

    private printRequest(endPoint: string, jsonRequestBody: string, requestHeader: any, method: string, description: string) {
        let requestBody = jsonRequestBody;
        try {
            requestBody = JSON.stringify(JSON.parse(jsonRequestBody), null, 2);
        } catch (error) {
            requestBody = jsonRequestBody;
        }
        const curlBody = fetch_to_curl({
            method: method,
            headers: JSON.parse(JSON.stringify(requestHeader)),
            body: requestBody,
            url: endPoint
        });
        console.log(`\nRequest:\n`, curlBody);
        test.info().attach(`Request: ${description}`, {
            body: curlBody,
            contentType: "text/plain"
        });
    }

    public async setRestResponse(response: APIResponse, description: string) {
        const body = await response.text();
        const headers = response.headers();
        const status = response.status();
        const restResponse: RestResponse = new RestResponse(headers, status, body, description);
        let responseBody = "";
        try {
            responseBody = JSON.stringify(JSON.parse(body), null, 2);
        } catch (error) {
            responseBody = body;
        }
        console.log(`\nResponse:\n`, responseBody);
        test.info().attach(`Response: ${description}`, {
            body: responseBody,
            contentType: "text/plain"
        });
        return restResponse;
    }

    private parseRequestBody(requestBody: any) {
        // let requestBody = requestBody;
        try {
            return JSON.parse(requestBody);
        } catch (error) {
            return requestBody;
        }
    }

    public async post(requestBody: string, endPoint: string, requestHeader: any, description: string) {
        const jsonHeaders = JSON.parse(JSON.stringify(requestHeader));
        const restResponse = await test.step(`Making POST request to ${endPoint} with body: ${requestBody} for ${description}`, async () => {
            this.printRequest(endPoint, requestBody, requestHeader, "POST", description);
            const response = await this.page.request.post(endPoint, {
                headers: jsonHeaders,
                data: this.parseRequestBody(requestBody)
            });
            return await this.setRestResponse(response, description);
        });
        return restResponse;
    }

    public async get(endPoint: string, requestHeader: any, description: string) {
        const jsonHeaders = JSON.parse(JSON.stringify(requestHeader));
        const restResponse = await test.step(`Making GET request to ${endPoint} for ${description}`, async () => {
            this.printRequest(endPoint, "", requestHeader, "GET", description);
            const response = await this.page.request.get(endPoint, {
                headers: jsonHeaders
            });
            return await this.setRestResponse(response, description);
        });
        return restResponse;
    }

    public async delete(endPoint: string, requestHeader: string, description: string) {
        const jsonHeaders = JSON.parse(JSON.stringify(requestHeader));
        const restResponse = await test.step(`Making DELETE request to ${endPoint} for ${description}`, async () => {
            this.printRequest(endPoint, "", requestHeader, "DELETE", description);
            const response = await this.page.request.delete(endPoint, {
                headers: jsonHeaders
            });
            return await this.setRestResponse(response, description);
        });
        return restResponse;
    }

    public async put(requestBody: string, endPoint: string, requestHeader: any, description: string) {
        const jsonHeaders = JSON.parse(JSON.stringify(requestHeader));
        const restResponse = await test.step(`Making PUT request to ${endPoint} with body: ${requestBody} for ${description}`, async () => {
            this.printRequest(endPoint, requestBody, requestHeader, "PUT", description);
            const response = await this.page.request.put(endPoint, {
                headers: jsonHeaders,
                data: this.parseRequestBody(requestBody)
            });
            return await this.setRestResponse(response, description);
        });
        return restResponse;
    }

    public async patch(requestBody: string, endPoint: string, requestHeader: any, description: string) {
        const jsonHeaders = JSON.parse(JSON.stringify(requestHeader));
        const restResponse = await test.step(`Making PATCH request to ${endPoint} with body: ${requestBody} for ${description}`, async () => {
            this.printRequest(endPoint, requestBody, requestHeader, "PATCH", description);
            const response = await this.page.request.patch(endPoint, {
                headers: jsonHeaders,
                data: this.parseRequestBody(requestBody)
            });
            return await this.setRestResponse(response, description);
        });
        return restResponse;
    }
}
