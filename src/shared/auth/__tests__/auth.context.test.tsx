import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AuthProvider } from "../auth.context"
import { useAuth } from "../use-auth"

function TestConsumer() {
  const { user, isAuthenticated } = useAuth()
  return (
    <div>
      <span data-testid="auth">{isAuthenticated ? "yes" : "no"}</span>
      <span data-testid="email">{user?.email ?? "none"}</span>
    </div>
  )
}

describe("AuthContext", () => {
  it("starts unauthenticated", () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>)
    expect(screen.getByTestId("auth").textContent).toBe("no")
    expect(screen.getByTestId("email").textContent).toBe("none")
  })
})
