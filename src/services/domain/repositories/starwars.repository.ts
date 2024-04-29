export interface StarWarsRepository {
    getStarWarsData(name : string): Promise<object>;
    saveStarWarsItem(item): Promise<void>;
}