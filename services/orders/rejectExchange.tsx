import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useRejectExchange = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["reject-exchange"],
    mutationFn: async (documentId: string) => {
      await api.patch(`/orders/${documentId}/reprovedExchange`);
    },
    onSuccess,
    onError,
  });
};
