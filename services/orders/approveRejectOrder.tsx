import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useApproveOrRejectOrder = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["approve-or-reject-order"],
    mutationFn: async ({
      documentId,
      status,
    }: {
      documentId: string;
      status: "approved" | "rejected";
    }) => {
      let endpoint = "";
      if (status === "approved") {
        endpoint = `/orders/${documentId}/approve`;
      } else {
        endpoint = `/orders/${documentId}/reprove`;
      }
      await api.patch(endpoint);
    },
    onSuccess,
    onError,
  });
};
