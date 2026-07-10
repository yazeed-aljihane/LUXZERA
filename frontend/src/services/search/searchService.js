import { searchClient } from "../gateway/apiGateway";

export const searchProductsAi = async (query) => {
    try {
        const response = await searchClient.get("/search/ai", {
            params: { query: query }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching AI search results:", error);
        throw error;
    }
};
