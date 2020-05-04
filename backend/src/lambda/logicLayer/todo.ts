import 'source-map-support/register'

import { Data } from '../dataLayer/data'
import { TodoUpdate } from '../../models/TodoUpdate'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import * as uuid from 'uuid'

const data = new Data()

export async function updateToDo(userId: string, todoId: string, updateTodoRequest: UpdateTodoRequest ): Promise<TodoUpdate>{
    const updatedTodo: TodoUpdate = {
        name: updateTodoRequest.name,
        dueDate: updateTodoRequest.dueDate,
        done: updateTodoRequest.done
    }
    return await data.updateToDo(userId, todoId, updatedTodo)
}

export async function createToDo(userId,newTodo){
    const itemID = uuid.v4()
    const timestamp = new Date().toISOString()
    const newItem = {
        userId: userId,
        todoId: itemID,
        createdAt: timestamp,
        ...newTodo
    }
    return await data.createToDo(newItem);
}

export async function deleteTodo(todoId,userId){
    let item = await data.getToDoById(todoId,userId);
    if (!item.Item){
        return null;    
    }
    let deleted = await data.deleteToDo(todoId,userId);
    return deleted
}

export async function getAllTodo(userId){
    let items = await data.getAllTodo(userId)
    return items.Items
}
