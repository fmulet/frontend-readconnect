'use client';

import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import Cookies from 'js-cookie';

import { IUser } from "../../interfaces/Iuser";
import { client } from "../../helpers";
import { useRouter } from "next/navigation";
import { MUTATION_LOGIN, MUTATION_REGISTER, QUERY_REVALIDATE_TOKEN } from "../../query";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);


  const checkToken = async () => {
    const token = Cookies.get('token'); // Obtiene el token de las cookies.

    if (!token) {
      return;
    }

    try {
      const { data } = await client.query({
        query: QUERY_REVALIDATE_TOKEN,
        context: {
          headers: { authorization: `Bearer ${token}` }
        },
      });

      const { token: newToken, user } = data.revalidate;
      Cookies.set('token', newToken);
      dispatch({ type: '[Auth] - Login', payload: user });
    } catch (error) {
      Cookies.remove('token');
    }
  }

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await client.mutate({
        mutation: MUTATION_LOGIN,
        variables: { loginInput: { email, password } },
      });
      const { token, user } = data.login;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }

  }

  const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await client.mutate({
        mutation: MUTATION_REGISTER,
        variables: { signupInput: { name, email, password } },
      });
      const { token, user } = data.signup;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return {
        hasError: false
      }

    } catch (error) {

      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo'
      }
    }
  }

  const logout = () => {
    Cookies.remove('token');
    router.refresh();
  }

  return (
    <AuthContext.Provider value={{
      ...state,

      // Methods
      loginUser,
      registerUser,
      logout,

    }}>
      {children}
    </AuthContext.Provider>
  )
}
