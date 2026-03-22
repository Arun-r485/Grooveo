import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useOrders() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const placeOrder = useMutation({
        mutationFn: async (orderData) => {
            
            const { data } = await axios.post("/api/orders", orderData);
            return data;
        },
        onSuccess: (data) => {
            
            queryClient.invalidateQueries({ queryKey: ["cart"] });

            
            navigate(`/order-success/${data._id}`);
        },
        onError: (err) => {
            console.error("Order failed:", err.response?.data?.message);
        }
    });

    return { placeOrder };
}