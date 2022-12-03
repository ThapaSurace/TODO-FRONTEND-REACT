import { BASE_URL } from "../utils/base_url";
import axios from "axios";

// getting todos
const getTodos = async (token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(`${BASE_URL}/rest/todos/`,config)
    return response.data
}

// adding todos
const addTodos = async (todo,token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
    const bodyData ={
        todo: todo
    }

    const response = await axios.post(`${BASE_URL}/rest/todos/`,bodyData,config)
    return response.data
}

// deleting todos


const todoServices = {
    getTodos,
    addTodos,
}

export default todoServices