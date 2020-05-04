import 'source-map-support/register'
import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS)

import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoUpdate } from '../../models/TodoUpdate'
import { TodoItem } from '../../models/TodoItem';

export class Data {

    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly toDoTable = process.env.TODO_TABLE

    ) {
    }

    async updateToDo(userId: string, todoId: string, todoUpdate: TodoUpdate):Promise<TodoUpdate> {

        const itemToUpdate = await this.docClient.get({
                TableName: this.toDoTable,
                Key: {
                    todoId: todoId,
                    userId: userId
                }
            }).promise()

            if (!itemToUpdate.Item)
                return null

            await this.docClient.update({
                TableName: this.toDoTable,
                Key: {
                    userId: userId,
                    todoId: todoId
                },
                UpdateExpression: "set #n = :r, dueDate=:p, done=:a",
                ExpressionAttributeValues: {
                    ":r": todoUpdate.name,
                    ":p": todoUpdate.dueDate,
                    ":a": todoUpdate.done
                },
                ExpressionAttributeNames: {
                    "#n": "name"
                },
                ReturnValues: "UPDATED_NEW"
            }).promise()
            return todoUpdate
    }

    async createToDo(newItem:TodoItem):Promise<TodoItem> {
        await this.docClient.put({
            TableName: this.toDoTable,
            Item: newItem
        }).promise()
        return newItem;
    }

    async getToDoById(todoId:string,userId:string):Promise<any>{
        const item = await this.docClient.get({
            TableName: this.toDoTable,
            Key: {
                todoId: todoId,
                userId: userId
            }
        }).promise()
        return item;
    }
    async deleteToDo(todoId:string,userId:string):Promise<any>{  
        const item = await this.docClient.delete({
            TableName: this.toDoTable,
            Key: {
                todoId: todoId,
                userId: userId
            }
        }).promise();
        return item;
    }
    async getAllTodo(userId:string):Promise<any>{
        const result = await this.docClient.query({
            TableName: this.toDoTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
              ':userId' : userId
            }
          }).promise()
        return result
    }

    async updateTodo(newItem:TodoItem):Promise<any>{
        let updated = await this.docClient.put({
            TableName: this.toDoTable,
            Item: newItem
          }).promise()
        return updated
    }
   
}

