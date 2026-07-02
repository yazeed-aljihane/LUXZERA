import axios from "axios";
import { API_BASE_URL } from "./axios";

export const searchProductsAi = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search/ai`, {
            params: { query: query }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching AI search results:", error);
        throw error;
    }
};
