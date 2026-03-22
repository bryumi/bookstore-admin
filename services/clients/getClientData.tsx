import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { IClient } from "@/types/clients.interface";

type IResponseClients = {
  success: boolean;
  count: number;
  clients: IClient[];
};
type ListClientsParams = {
  search?: string;
};
export const useGetClients = (params?: ListClientsParams) => {
  return useQuery({
    queryKey: ["clients", params],
    queryFn: async () => {
      const { data } = await api.get<IResponseClients>(`clients`, { params });
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
