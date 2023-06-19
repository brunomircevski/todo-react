import { Task } from "./Task";

const apiUrl = 'http://localhost:5000/tasks';

export async function getTasks(): Promise<Task[]> {

    return fetch(apiUrl)
    .then(res => {
        if (!res.ok) throw Error("Error while getting tasks");
        return res.json();
    })
}

export async function deleteTask(id: number): Promise<any> {

    return fetch(apiUrl+"/"+id, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) throw Error("Error while deleting task");
        return res.json();
    })
}

export async function updateTask(task: Task): Promise<any> {

    return fetch(apiUrl+"/"+task.id, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(res => {
        if (!res.ok) throw Error("Error while updating task");
        return res.json();
    })
}

export async function createTask(task: Task): Promise<any> {

    return fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(res => {
        if (!res.ok) throw Error("Error while creating task");
        return res.json();
    })
}