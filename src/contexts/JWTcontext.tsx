import { useEffect } from "react";
import {
  ReactNode,
  createContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../services/axios";
import {
  removeTokens,
  setAccessToken,
  setRefreshToken,
} from "../services/tokens";
import { setUser, removeUser } from "../redux/user";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

interface State {
  isAuthenticated: boolean;
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
    default:
      return state;
  }
};

export const AuthContext = createContext({
  isAuthenticated: false,
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
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const initialize = async () => {
      if (userId) {
        const response = await axiosInstance.get(`/api/user/${userId}`);
        if (response.status === 200) {
          const { user } = response.data;
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
          appDispatch(setUser(user));
        }
      }
    };

    initialize();
  }, [appDispatch, userId]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      localStorage.clear();

      delete axiosInstance.defaults.headers.common.Authorization;
      const response = await axiosInstance.post("/api/auth/login/", {
        email,
        password,
      });

      if (response.status === 200) {
        const { tokens, user: sighInUser } = response.data;
        appDispatch(setUser(sighInUser));

        const { access, refresh } = tokens;
        setAccessToken(access);
        setRefreshToken(refresh);
        localStorage.setItem("user", sighInUser.id);

        dispatch({
          type: SIGN_IN,
          payload: {
            user: sighInUser,
          },
        });
      }
      return response;
    },
    [appDispatch]
  );

  const signUp = useCallback(
    async (
      username: string,
      firstName: string,
      lastName: string,
      email: string,
      password: string
    ) => {
      const response = await axiosInstance.post("/api/auth/register/", {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      if (response.status === 200) {
        const { user: sighUpUser } = response.data;

        dispatch({
          type: SIGN_UP,
          payload: {
            user: sighUpUser,
          },
        });
      }

      return response;
    },
    []
  );

  const signOut = useCallback(async () => {
    localStorage.clear();
    removeTokens();
    appDispatch(removeUser());
    dispatch({ type: SIGN_OUT });
  }, [appDispatch]);

  const providerValue = useMemo(() => {
    return {
      ...state,
      signIn,
      signUp,
      signOut,
    };
  }, [state, signIn, signUp, signOut]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
