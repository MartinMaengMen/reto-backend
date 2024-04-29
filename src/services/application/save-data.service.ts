import DynStarwarsRepository from "../infrastructure/repositories/dyn-starwars.repository";
import { v4 as uuid } from "uuid";

class SaveDataService{
    dynStarwarsRepository = DynStarwarsRepository
    async saveData(event){
        try {
            console.log("Inicio de guardado de los datos")
            const bodyEvent = JSON.parse(event.body)
            const item = {
              "id": uuid(),
              "name": bodyEvent.name,
              "data": bodyEvent.data
            }
            await this.dynStarwarsRepository.saveStarWarsItem(item)
            console.log("Guardado Finalizado")
            return true
          } catch (error) {
            console.error("Error al guardar el elemento:", error);
          }  
    }
}

export default new SaveDataService()