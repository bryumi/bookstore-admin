import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useApprovedExchange = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["approved-exchange"],
    mutationFn: async (documentId: string) => {
      await api.patch(`/orders/${documentId}/authorizeExchange`);
    },
    onSuccess,
    onError,
  });
};
