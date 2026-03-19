import React, { createContext, useState, useCallback } from "react"
import { setToken, clearToken } from "./token"

export interface AuthUser {
  id: string
  email: string
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (token: string, user: AuthUser) => void
  logout: () => void
}

export const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = useCallback((token: string, user: AuthUser) => {
    setToken(token)
    setUser(user)
    // Attach user context to Sentry for error attribution (spec section 2.5)
    if (typeof window !== "undefined") {
      import("@sentry/react").then((Sentry) => Sentry.setUser({ id: user.id, email: user.email }))
    }
  }, [])

  const logout = useCallback(() => {
    clearToken()
    // Clear Sentry user context on logout
    if (typeof window !== "undefined") {
      import("@sentry/react").then((Sentry) => Sentry.setUser(null))
    }
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
