import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { SnackNotification } from "../shared/types";

const SnackbarContext = createContext<any>(null);
const SnackbarDispatchContext = createContext<any>(null);

export function useSnackbarDispatch() {
  return useContext(SnackbarDispatchContext);
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snacks, dispatch] = useReducer(
    snacksReducer,
    [] as SnackNotification[]
  );
  const currentSnack = Array.isArray(snacks) && snacks[0];

  return (
    <SnackbarContext.Provider value={snacks}>
      <SnackbarDispatchContext.Provider value={dispatch}>
        {currentSnack && <Notification {...currentSnack} dispatch={dispatch} />}
        {children}
      </SnackbarDispatchContext.Provider>
    </SnackbarContext.Provider>
  );
}

type SnackAction =
  | { type: "QUEUE_NOTIFICATION"; payload: SnackNotification }
  | { type: "REMOVE_NOTIFICATION" };

function snacksReducer(state: SnackNotification[], action: SnackAction) {
  switch (action.type) {
    case "QUEUE_NOTIFICATION":
      return [...state, action.payload];
    case "REMOVE_NOTIFICATION":
      if (state.length > 0) {
        return state.slice(1);
      }
      return state;
    default:
      return state;
  }
}

type Notification = SnackNotification & {
  dispatch: React.Dispatch<SnackAction>;
};

function Notification({ message, type, dispatch }: Notification) {
  const animationRef = useRef<Animation>();
  const notificationRef = useRef<any>();

  useEffect(() => {
    if (animationRef.current?.playState === "running") return;

    animationRef.current = notificationRef.current.animate(
      [
        { transform: "translate(-50%, 0px)", offset: 0 },
        { transform: "translate(-50%, 20px)", offset: 0.2 },
        { transform: "translate(-50%, 20px)", offset: 0.8 },
        {
          transform: "translate(-50%, 0px)",
          offset: 1,
        },
      ],
      {
        duration: 3000,
      }
    );
    animationRef.current?.play();
    animationRef.current?.finished.then(() => {
      dispatch({ type: "REMOVE_NOTIFICATION" });
    });
  });

  return (
    <div ref={notificationRef} className="notification">
      <h3>{message}</h3>
    </div>
  );
}
