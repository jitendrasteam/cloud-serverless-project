import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { parseUserId } from '../../auth/utils'
import {deleteTodo} from '../logicLayer/todo'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const userId = parseUserId(jwtToken)

  const deleted = await deleteTodo(todoId,userId)

  if (deleted === null){
    return {
        statusCode: 404,
        body: JSON.stringify({
            error: 'TODO item does not exist'
        })
    }
  }
  return {
      statusCode: 204,
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
          info: 'item deleted succesfully'
      })
  }

}