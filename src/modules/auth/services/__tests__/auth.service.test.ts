import { describe, it, expect, vi, beforeEach } from "vitest"
import * as authService from "../auth.service"
import { apiClient } from "@/shared/api/client"
import type { LoginRequest, SignupRequest, AuthResponse } from "../../types/auth.types"

vi.mock("@/shared/api/client")

describe("Auth Service", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("login", () => {
    it("calls POST /auth/login with correct arguments", async () => {
      const loginData: LoginRequest = {
        email: "user@example.com",
        password: "password123",
      }

      const mockResponse: AuthResponse = {
        token: "test-token",
        user: {
          id: "user-123",
          email: "user@example.com",
        },
      }

      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse })

      const result = await authService.login(loginData)

      expect(apiClient.post).toHaveBeenCalledWith("/auth/login", loginData)
      expect(result).toEqual(mockResponse)
    })
  })

  describe("signup", () => {
    it("calls POST /auth/signup with correct arguments", async () => {
      const signupData: SignupRequest = {
        email: "newuser@example.com",
        password: "password123",
      }

      const mockResponse: AuthResponse = {
        token: "test-token",
        user: {
          id: "user-456",
          email: "newuser@example.com",
        },
      }

      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse })

      const result = await authService.signup(signupData)

      expect(apiClient.post).toHaveBeenCalledWith("/auth/signup", signupData)
      expect(result).toEqual(mockResponse)
    })
  })

  describe("logout", () => {
    it("calls POST /auth/logout", async () => {
      vi.mocked(apiClient.post).mockResolvedValue({ data: {} })

      await authService.logout()

      expect(apiClient.post).toHaveBeenCalledWith("/auth/logout")
    })
  })
})
