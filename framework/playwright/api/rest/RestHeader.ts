import RequestHeader from "../RequestHeader";

export default class RestHeader {

    // public getHeader() {
    //     const username = process.env.userName;
    //     const password = process.env.password;
    //     if (!username && !password) {
    //         throw new Error("Username and password must be provided in environment variables for authentication.");
    //     }
    //     return new RequestHeader()
    //         .set("Content-Type", "application/json")
    //         .set("Authorization", `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`).get();
    // }

    public getHeader() {
        const username = process.env.userName;
        const password = process.env.password;
        if (!username && !password) {
            throw new Error("Username and password must be provided in environment variables for authentication.");
        }
        return new RequestHeader()
            .set("Content-Type", "application/json")
            .set("userName", `${username}`)
            .set("password", `${password}`).get();
    }

    public overrideHeader(userName: string, password: string, override: string) {
        const username = override ? userName : (process.env.userName);
        const pass = override ? password : (process.env.password);
        return new RequestHeader()
            .set("Content-Type", "application/json")
            .set("Authorization", `Basic ${Buffer.from(`${username}:${pass}`).toString("base64")}`).get();
    }

    public createHeaderWithParms(_userName: string, _password: string ) {
        return new RequestHeader()
            .set("Content-Type", "application/json")
            .set("userName", `${_userName}`)
            .set("password", `${_password}`).get();
    }
}

