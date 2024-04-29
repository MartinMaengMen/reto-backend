import { mapFields } from "../domain/models/constants";
import StarwarsApiProvider from "../infrastructure/providers/starwars-api.provider";
import DynStarwarsRepository from "../infrastructure/repositories/dyn-starwars.repository";

class GetDataService {
  starWarsProvider = StarwarsApiProvider;
  dynStarwarsRepository = DynStarwarsRepository;
  async getData(event) {
    try {
      const endpoint = event.queryStringParameters.name;
      console.log("Inicio de obtencion de datos de: ", endpoint);
      const baseResponse = await this.starWarsProvider.getData("");
      if (Object.keys(baseResponse).includes(endpoint)) {
        const endpointResponse = await this.starWarsProvider.getData(endpoint);
        if(Array.isArray(endpointResponse))
          return this.translateFields(endpointResponse);
        return endpointResponse
      } else {
        return this.dynStarwarsRepository.getStarWarsData(endpoint);
      }
    } catch (error) {
      console.error("Error al obtener los datos de Star Wars:", error);
    }
  }
  private translateFields(resultList) {
    for (const person of resultList) {
      for (const [key, value] of Object.entries(person)) {
        const newField = mapFields[key];
        if (newField) {
          person[newField] = value;
          delete person[key];
        }
      }
    }
    return resultList;
  }
}

export default new GetDataService();
