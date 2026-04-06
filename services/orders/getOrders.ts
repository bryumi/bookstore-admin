import { IClient } from "@/types/clients.interface";
import { IOrderItens, IPayment } from "@/types/orders.interface";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../api/api";

type IResponseOrders = {
  client: IClient;
  orderItems: IOrderItens[];
  payment: IPayment[];
  delivery: {
    id: string;
    freightType: string;
    freightValue: string;
  };
  orderDate: string;
  totalPrice: string;
  status: string;
  freightValue: string;
  id: string;
};

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get<IResponseOrders[]>(`orders`);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
