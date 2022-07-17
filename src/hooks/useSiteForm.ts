import { useSnackbarDispatch } from "../contexts/SnackbarContext";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import type { TMutation } from "../utils/trpc";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function useSiteForm({
  successMessage,
  mutationEndpoint,
}: {
  successMessage: string;
  mutationEndpoint: TMutation;
}) {
  const session = useSession();
  const dispatch = useSnackbarDispatch();
  const mutation = trpc.useMutation(mutationEndpoint, {
    onError: (error) => {
      const errorCode = error.shape?.data?.code;
      dispatch({
        type: "QUEUE_NOTIFICATION",
        payload: { message: errorCode, type: "ERROR", id: Date.now() },
      });
    },
    onSuccess: () => {
      dispatch({
        type: "QUEUE_NOTIFICATION",
        payload: {
          message: successMessage,
          type: "SUCCESS",
          id: Date.now(),
        },
      });
    },
  });

  function onSubmit(inputs: Inputs) {
    const userSession = session.data as Session;
    if (mutationEndpoint === "site.createSite") {
      mutation.mutate({ userId: userSession.user!.id, ...inputs });
    }
  }

  return { onSubmit };
}
