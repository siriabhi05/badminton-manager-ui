import axios from "axios"


export const apiService = {
    get: async (url: string) => {
        return await axios.get(url);
    },
    post: async (url: string, data: any) => {
        return await axios.post(url, data);
    }
}