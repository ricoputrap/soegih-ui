import { apiClient } from "@/shared/api/client"
import { LoginRequest, SignupRequest, AuthResponse } from "../types/auth.types"

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post("/auth/login", data)
  return response.data
}

export async function signup(data: SignupRequest): Promise<AuthResponse> {
  const response = await apiClient.post("/auth/signup", data)
  return response.data
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout")
}
