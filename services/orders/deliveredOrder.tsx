import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useDeliveredOrder = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["delivered-order"],
    mutationFn: async (documentId: string) => {
      await api.patch(`/orders/${documentId}/confirmDelivery`);
    },
    onSuccess,
    onError,
  });
};
