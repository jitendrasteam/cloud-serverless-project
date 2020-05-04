import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { getUserId } from '../utils'
import { generateUploadUrl } from '../logicLayer/todo'



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event) 

  const item = await generateUploadUrl(todoId,userId)
    if (item === null){
    return {
        statusCode: 404,
        body: JSON.stringify({
            error: 'TODO item with the given id does not exist'
        })
    }
    }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify({
            uploadUrl: item
        })
    }
}


  