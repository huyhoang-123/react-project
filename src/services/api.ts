import axios, {type AxiosInstance} from "axios";


let authToken = localStorage.getItem('authToken');

export const setAuthToken = (token:string) => {
  authToken = token;
  localStorage.setItem('authToken', token);
};

//create api instance
 export const api = axios.create({
    baseURL:"http://localhost:3000/api",
    headers:{
         'Content-Type': 'application/json',
    }
})

//Request interceptor
 api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
     console.error(error)
    }
    return Promise.reject(error);
  }
);



// export const fetchTodos = async () => {
//    try{
//    const response = await fetch(`${API_BASE_URL}/todos`, {
//         method: 'GET',
//         headers: createHeaders
//     });
//     return await response.json();   
//     }
//     catch (error) {
//         console.error('Error fetching todos:', error);
//         return [];
//     }
   
// }

// export const createTodo = async (data:{}) => {
// try{
//    const response = await fetch(`${API_BASE_URL}/todos`, {
//         method: 'POST',
//         headers: createHeaders,
//         body: JSON.stringify(data)
//     });
//     return await response.json();   
//     }
//     catch (error) {
//         console.error('Error fetching todos:', error);
//         return [];
//     }
// };
// export const updateTodo = async (id: string, data:any) => {
// try{
//    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
//         method: 'PUT',
//         headers: createHeaders,
//         body: JSON.stringify(data)
//     });

//     return await response.json();   
//     }
//     catch (error) {
//         console.error('Error fetching todos:', error);
//         return [];
//     }
// };
// export const deleteTodo = async (id: string) => {
// try{
//    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
//         method: 'DELETE',
//         headers: createHeaders,

//     });
//     return await response.json();   
//     }
//     catch (error) {
//         console.error('Error fetching todos:', error);
//         return [];
//     }
// };