"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import signInRequest from "@/actions/auth/login";
import { isTokenValid } from "@/utils/isTokenValid";

export interface SignInData {
  email: string;
  password: string;
  role: "teacher" | "student";
}

type DecodedToken = {
  sub: string;
  email: string;
  name: string;
  role: "teacher" | "student";
  exp: number;
};

type AuthContextType = {
  isAuthenticated: boolean;
  role: "teacher" | "student" | null;
  name: string | null;
  isLoading: boolean;
  signIn: (data: SignInData) => Promise<boolean>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  role: null,
  name: null,
  isLoading: true,
  signIn: async () => false,
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState<string | null>(null);

  const [role, setRole] = useState<"teacher" | "student" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const signOut = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole(null);
    router.push("/login");
  }, [router]);

  const initializeAuth = useCallback(() => {
    const token = localStorage.getItem("token");

    if (token && isTokenValid(token)) {
      try {
        const decoded = jwtDecode<DecodedToken>(token.replace("Bearer ", ""));
        setRole(decoded.role);
        setName(decoded.name);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
        signOut();
      }
    } else {
      signOut();
    }

    setIsLoading(false);
  }, [signOut]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token || !isTokenValid(token)) {
        console.warn("Token expirado ou inválido. Logout automático.");
        signOut();
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [signOut]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        const newToken = event.newValue;

        if (!newToken || !isTokenValid(newToken)) {
          console.warn("Token alterado em outra aba. Logout automático.");
          signOut();
        } else {
          try {
            const decoded = jwtDecode<DecodedToken>(
              newToken.replace("Bearer ", "")
            );
            setRole(decoded.role);
            setName(decoded.name);
            setIsAuthenticated(true);
          } catch {
            signOut();
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [signOut]);

  const signIn = async (data: SignInData): Promise<boolean> => {
    try {
      const { role, ...rest } = data;
      const response = await signInRequest(rest, role);

      if (response.success && response.token) {
        const token = response.token;
        localStorage.setItem("token", token);

        const decoded = jwtDecode<DecodedToken>(token.replace("Bearer ", ""));
        setRole(decoded.role);
        setName(decoded.name);
        setIsAuthenticated(true);
        setIsLoading(false);

        router.push(`/dashboard/${decoded.role}`);
        return true;
      }

      return false;
    } catch (err) {
      console.error("Erro no login:", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, name, role, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
