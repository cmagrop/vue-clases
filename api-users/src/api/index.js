import axios from "axios";

const apiClient = axios.create(
    {
        baseURL:'https://69b2bf4fe06ef68ddd9623d4.mockapi.io/',
        headers:{"Content-Type":"application/json"} //le decimos que acepte Json
    }
);
/* le digo a apiClient que establezca un interceptor de una respuesta donde
le decimos que use la siguiente configuración */
apiClient.interceptors.response.use(
    response=>response,
    error=>{
        console.log("Error detectado:",error.response?.status||"Error de red");
        return Promise.reject(error);
    }


);

export default apiClient;