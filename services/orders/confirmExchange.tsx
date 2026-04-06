import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useConfirmExchange = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["confirm-exchange"],
    mutationFn: async (documentId: string) => {
      await api.patch(`/orders/${documentId}/confirmExchange`);
    },
    onSuccess,
    onError,
  });
};
