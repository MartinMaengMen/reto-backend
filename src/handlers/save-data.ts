import saveDataService from '../services/application/save-data.service';

export const main = async (event) => {
  const result = await saveDataService.saveData(event)
  return {
    statusCode: 200,
    body: JSON.stringify({response: result})
  };
};

