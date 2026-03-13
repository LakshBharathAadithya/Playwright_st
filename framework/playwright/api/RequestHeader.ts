export default class RequestHeader {
    private map: Map<string, string> = new Map<string, string>();

    public set(key: string, value: string): RequestHeader {
        this.map.set(key, value);
        return this;
    }

    public get() {
        return Object.fromEntries(this.map);
    }
}
