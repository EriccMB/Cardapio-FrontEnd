import axios, { type AxiosPromise } from "axios"
import type { FoodData } from "../types/FoodData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:3000'

// essa função retorna uma axios promisse, do tipo array de FoodData
const fetchData = async ():AxiosPromise<FoodData[]> => {
    const res = axios.get(API_URL + '/food'); 
    // axios retorna um objeto ja organizado, data, etc.
    return res;
}

export const useFoodData = () => {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 1
    });

    // retorna tudo da query, e substitui o data, porque o axios retorna um data, e o react query também
    // então corta os data
    return {
        ...query,
        data: query.data?.data
    }
}