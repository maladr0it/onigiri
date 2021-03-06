import { useReducer, useEffect } from "react";

interface State<D> {
  payload: D | null;
  isLoading: boolean;
  isError: boolean;
}

type Action<D> =
  | {
      type: "subscription_changed";
    }
  | {
      type: "data_updated";
      payload: D;
    }
  | {
      type: "error_occured";
    };

// We create the reducer dynamically so that we may pass in a generic type
const createSubscriptionReducer = <D>() => (
  state: State<D>,
  action: Action<D>,
): State<D> => {
  switch (action.type) {
    case "subscription_changed": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "data_updated": {
      return {
        payload: action.payload,
        isLoading: false,
        isError: false,
      };
    }
    case "error_occured": {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  }
};

type OnChange<D> = (data: D) => void;
type Unsubscribe = () => void;
type Subscription<P, D> = (param: P, onChange: OnChange<D>) => Unsubscribe;

export function useSubscription<P, D>(
  subscription: Subscription<P, D>,
  param: P,
) {
  const [state, dispatch] = useReducer(createSubscriptionReducer<D>(), {
    payload: null,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    const handleChange = (data: D) => {
      dispatch({ type: "data_updated", payload: data });
    };
    // set up new subscription;
    const unsubscribe = subscription(param, handleChange);
    dispatch({ type: "subscription_changed" });

    return unsubscribe;
  }, [param]);

  return state;
}
