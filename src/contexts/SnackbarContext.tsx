import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Notifier } from "../shared/types";

const SnackbarContext = createContext<any>(null);
const SnackbarDispatchContext = createContext<any>(null);

export function useSnackbarDispatch() {
  return useContext(SnackbarDispatchContext);
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snacks, dispatch] = useReducer(snacksReducer, [
    { message: "1", type: "ERROR" },
    { message: "2", type: "ERROR" },
  ] as Notifier[]);
  const timer = useRef<any>(null);
  const currentSnack = Array.isArray(snacks) && snacks[0];
  useEffect(() => {
    timer.current = setTimeout(() => {
      if (timer) {
        console.log("removing...");
        dispatch({ type: "REMOVE_NOTIFICATION" });
      }
    }, 3000);
    return () => clearTimeout(timer.current);
  }, [currentSnack, snacks]);

  return (
    <SnackbarContext.Provider value={snacks}>
      <SnackbarDispatchContext.Provider value={dispatch}>
        {currentSnack && <h3>{currentSnack.message}</h3>}
        {children}
      </SnackbarDispatchContext.Provider>
    </SnackbarContext.Provider>
  );
}

function snacksReducer(state: Notifier[], action: any) {
  switch (action.type) {
    case "QUEUE_NOTIFICATION":
      console.log("test", state);
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
