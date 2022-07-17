export type SnackNotification = {
  message: string | undefined;
  type: "ERROR" | "SUCCESS";
  id: number;
};
