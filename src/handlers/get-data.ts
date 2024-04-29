import getDataService from '../services/application/get-data.service';

export const main = async (event) => {
  const data = await getDataService.getData(event)
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

