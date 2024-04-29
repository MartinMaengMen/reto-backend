import { DynamoDBDocumentClient, PutCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { StarWarsRepository } from "../../domain/repositories/starwars.repository";
import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { StarWarsEvent } from "./starwars.event";

class DynStarWarsRepository implements StarWarsRepository{
    dynamoDBClient : DynamoDBDocumentClient = new DynamoDBClient({})
    async getStarWarsData(name: string): Promise<object> {
      try{
        const params: ScanCommandInput = {
          TableName: 'test-table',
          FilterExpression: '#l = :l',
          ExpressionAttributeNames: { '#l': 'name' },
          ExpressionAttributeValues: { ':l': {'S': name} }
        }
        const dynamodbResponse = await this.dynamoDBClient.send(
          new ScanCommand(params)
        );
        if (!dynamodbResponse.Items) {
          throw new Error("No se encontraron elementos");
        }
        return dynamodbResponse.Items.map<object>((item) => ({
          ...item.data
        }));
      }
      catch(error){
        console.log(error)
        throw error
      }
    }
    async saveStarWarsItem(item: StarWarsEvent): Promise<void> {
      await this.dynamoDBClient.send(
        new PutCommand({
          TableName: 'test-table',
          Item: item,
          ConditionExpression: "attribute_not_exists(#pk) AND attribute_not_exists(#sk)",
          ExpressionAttributeNames: {
            "#pk": "id",
            "#sk": "name",
          },
        })
      );
    }

}

export default new DynStarWarsRepository()