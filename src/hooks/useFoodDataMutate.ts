import axios, { type AxiosPromise } from "axios"
import type { FoodData } from "../types/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:3000'

// essa função retorna uma axios promisse, do tipo array de FoodData
const postData = async (data: FoodData):AxiosPromise<unknown> => {
    
    const res = axios.post(API_URL + '/food', data); 
    // axios retorna um objeto ja organizado, data, etc.
    return res;
}

export const useFoodDataMutate = () => {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['food-data']})
        }
    });

    return mutate
}