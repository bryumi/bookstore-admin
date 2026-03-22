import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useActiveOrInactiveClient = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ["active-or-inactive-client"],
    mutationFn: async ({
      documentId,
      bool,
    }: {
      documentId: string;
      bool: boolean;
    }) => {
      let endpoint = "";
      if (bool) {
        endpoint = `/clients/${documentId}/inactivate`;
      } else {
        endpoint = `/clients/${documentId}/activate`;
      }
      await api.patch(endpoint);
    },
    onSuccess,
    onError,
  });
};
