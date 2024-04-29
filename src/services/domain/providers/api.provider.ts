export interface APIProvider {
    getData(endpoint : string): Promise<object>
}