/**
 * @vitest-environment node
 */

import { describe, it, expect, beforeEach } from "vitest"
import { getToken, setToken, clearToken } from "../token"

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
})

describe("token helpers", () => {
  beforeEach(() => localStorage.clear())

  it("returns null when no token stored", () => {
    expect(getToken()).toBeNull()
  })

  it("stores and retrieves a token", () => {
    setToken("abc123")
    expect(getToken()).toBe("abc123")
  })

  it("clears the token", () => {
    setToken("abc123")
    clearToken()
    expect(getToken()).toBeNull()
  })
})
