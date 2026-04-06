import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useSendOrder = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["send-order"],
    mutationFn: async (documentId: string) => {
      await api.patch(`/orders/${documentId}/ship`);
    },
    onSuccess,
    onError,
  });
};
