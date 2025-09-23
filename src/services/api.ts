


const API_BASE_URL = 'http://localhost:3000/api';
const ACCESS_TOKEN_SECRET ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWZtNHoydXowMDAwMTB3YTZzNG9iYmQ1IiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3NTg2MjI1MDUsImV4cCI6MTc1ODYyMzQwNSwiYXVkIjoidG9kby1hcHAtdXNlcnMiLCJpc3MiOiJ0b2RvLWFwcCJ9.25gwVwjSBGw5dd7Xa7QpLVUIfGCUayU2PsrjM-1RCTo'


const createHeaders = {
     'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN_SECRET}`
}


export const fetchTodos = async () => {
   try{
   const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'GET',
        headers: createHeaders
    });
    return await response.json();   
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
   
}

export const createTodo = async (data:{}) => {
try{
   const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: createHeaders,
        body: JSON.stringify(data)
    });
    return await response.json();   
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};
export const updateTodo = async (id: string, data:any) => {
try{
   const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: createHeaders,
        body: JSON.stringify(data)
    });

    return await response.json();   
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};
export const deleteTodo = async (id: string) => {
try{
   const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: createHeaders,

    });
    return await response.json();   
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};