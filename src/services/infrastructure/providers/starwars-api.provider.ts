import { APIProvider } from "../../domain/providers/api.provider";
import axios, { AxiosResponse } from 'axios';

class StarWarsAPIProvider implements APIProvider{
    baseURL = process.env.SWAPI_BASE_URL
    async getData(endpoint: string): Promise<object> {
        try{
            const baseResponse = await axios.get(`${this.baseURL}${endpoint}`);
            if(endpoint!='')
                return baseResponse.data.results
            return baseResponse.data
        }
        catch(error){
            console.log(`Error al consultar API: ${error.message}`)
            throw error
        }
    }

}

export default new StarWarsAPIProvider()