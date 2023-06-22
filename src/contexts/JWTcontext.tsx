import {
  ReactNode,
  createContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../services/axios";
import { setAccessToken, setRefreshToken } from "../services/tokens";
import { setUser } from "../redux/user";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";
const POST_SIGN_UP = "POST_SIGN_UP";

interface State {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: {
    id: null;
    email: null;
    username: null;
    first_name: null;
    last_name: null;
    profile_photo: null;
    is_staff: null;
  };
}

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: {
    id: null,
    email: null,
    username: null,
    first_name: null,
    last_name: null,
    profile_photo: null,
    is_staff: null,
  },
};

const JWTReducer = (state: State, action: any) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case POST_SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

export const AuthContext = createContext({
  isAuthenticated: false,
  isInitialized: false,
  user: {
    id: null,
    email: null,
    username: null,
    first_name: null,
    last_name: null,
    profile_photo: null,
    is_staff: null,
  },
});

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const appDispatch = useDispatch();

  const signIn = useCallback(async (email: string, password: string) => {
    localStorage.clear();

    delete axiosInstance.defaults.headers.common.Authorization;
    const response = await axiosInstance.post("http://127.0.0.1:8000/api/auth/login/", {
      email,
      password,
    });

    if (response.status === 200) {
      const { tokens, user: sighInUser } = response.data;
      appDispatch(setUser(sighInUser));

      const { access, refresh } = tokens;
      setAccessToken(access);
      setRefreshToken(refresh);

      dispatch({
        type: SIGN_IN,
        payload: {
          user: sighInUser,
        },
      });
    }
    return response;
  }, [appDispatch]);

  const providerValue = useMemo(() => {
    return {
      ...state,
      signIn,
    };
  }, [state, signIn]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
