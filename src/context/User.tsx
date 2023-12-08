"use client";
import { type Session } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "~/lib/supabase";

interface IUserContext {
  session: Session | null | undefined;
  sessionExpired: boolean | undefined;
  getSession: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (params: {
    username?: string;
    slug?: string;
    avatar_url?: string;
    email?: string;
  }) => Promise<void>;
  user: IUser | null | undefined;
  error: Error | null | undefined;
  isSignedIn: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  isError: boolean;
}

interface IUser {
  id?: string | null;
  username?: string | null;
  role?: string | null;
  email?: string | null;
  phone?: string | null;
  slug?: string | null;
  avatar_url?: string | null;
}

const initialValue: IUserContext = {
  session: undefined,
  sessionExpired: undefined,
  getSession: async () => {
    throw new Error("Function not initizaliced yet");
  },
  signOut: async () => {
    throw new Error("Function not initizaliced yet");
  },
  updateUser: async () => {
    throw new Error("Function not initizaliced yet");
  },
  user: {
    avatar_url: "",
  },
  error: undefined,
  isSignedIn: false,
  isLoaded: false,
  isLoading: false,
  isError: false,
};

const UserContext = createContext(initialValue);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>();
  const [sessionExpired, setSessionExpired] = useState<boolean>();
  const [error, setError] = useState<Error | null>();
  const [user, setUser] = useState<IUser | null>();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getSession = async () => {
    setIsLoading(true);
    try {
      const {
        data: { session: resSession },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("⭕ getSession ——© (auth internal error)");
        setSession(null);
        setSessionExpired(undefined);
        setIsError(true);
        setError(error);
      } else if (resSession === null) {
        console.warn("☢️ getSession ——© (session is null)");
        setSession(null);
        setIsError(true);
        setError(new Error("Session is null"));
      } else {
        console.log("👤 getSession ——© (fetched session succesful)");
        setSession(resSession);
        setSessionExpired(undefined);
        setSessionExpired(false);
        setUser({
          id: resSession?.user.id,
          phone: resSession?.user.phone,
          email: resSession?.user.email,
          username: resSession?.user.user_metadata.username,
          slug: resSession?.user.user_metadata.slug,
          role: resSession?.user.user_metadata.role,
          ...user,
        });
        setIsSignedIn(true);
        setIsError(false);
        setError(null);
      }
    } catch (error) {
      console.error("⭕ getSession ——© (auth error)");
      if (error instanceof Error) {
        setSessionExpired(undefined);
        setIsError(true);
        setError(error);
      }
    } finally {
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("⭕ signOut ——© (auth internal error)");
        // Case intern error
        setIsError(true);
        setError(error);
        setSession(null);
      } else {
        // Case Succes
        console.log("👤 signOut ——© (signed out succesful)");
        setSession(null);
        setUser(null);
        setIsSignedIn(false);
        setIsError(false);
        setError(null);
      }
    } catch (error) {
      console.error("⭕ signOut ——© (error)");
      if (error instanceof Error) {
        setIsError(true);
        setError(error);
        setSession(null);
      }
    } finally {
      setSessionExpired(undefined);
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  const updateUser = async ({
    username,
    slug,
    avatar_url,
    email,
  }: {
    username?: string;
    slug?: string;
    avatar_url?: string;
    email?: string;
  }) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: username ? username : undefined,
          slug: slug ? slug : undefined,
          avatar_url: avatar_url ? avatar_url : undefined,
          email: email ? email : undefined,
        })
        .eq("id", 1);
      if (error) {
        console.error("⭕ updateUser ——© (PostgresError internam error)");
        setIsError(true);
        setError({ ...error, name: "PostgresError" });
      } else {
        console.log("👤 signOut ——© (signed out succesful)");
        setUser({
          ...user,
          username: username ? username : user?.username,
          slug: slug ? slug : user?.slug,
          avatar_url: avatar_url ? avatar_url : user?.avatar_url,
          email: email ? email : user?.email,
        });
        setIsError(false);
        setError(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        setIsError(true);
        setError(error);
      }
    } finally {
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    console.log(
      "📭 ©—— useEffect ——© context/UserContext.tsx ——© [] (getSession)",
    );
    const expired =
      session?.expires_at && new Date(session.expires_at) < new Date();
    setSessionExpired(Boolean(expired));

    if (!session || expired) {
      void getSession();
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("♻️ ——© AuthState Changed ——©" + _event);
      const expired =
        session?.expires_at && new Date(session.expires_at) < new Date();
      setSessionExpired(Boolean(expired));

      if (!session || expired) {
        void getSession();
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        session,
        sessionExpired,
        user,
        updateUser,
        isSignedIn,
        isLoaded,
        isLoading,
        isError,
        error,
        getSession,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
