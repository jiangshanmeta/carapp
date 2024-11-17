import axios,{AxiosRequestConfig} from "axios";
import { Car, CarEntry, CarResponse } from "./types";

const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");
    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    };
};
export const getCars = async ()=>{

    const response = await axios.get<{_embedded:{cars:CarResponse[]}}>(`/api/cars`,getAxiosConfig())

    return response.data._embedded.cars;
}


export const deleteCar = async (link: string): Promise<CarResponse> =>{
    const response = await axios.delete(new URL(link).pathname,getAxiosConfig());
    return response.data
}

export const addCar = async (car: Car): Promise<CarResponse> => {
    const response = await axios.post('/api/cars', car, getAxiosConfig());
  
    return response.data;
}

export const updateCar = async (carEntry: CarEntry):Promise<CarResponse> => {

    const response = await axios.put(new URL(carEntry.url).pathname, carEntry.car, getAxiosConfig());
    return response.data;
}