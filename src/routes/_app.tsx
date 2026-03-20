import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { getToken } from "@/shared/auth/token"

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    const token = getToken()
    if (!token) {
      throw redirect({ to: "/login" } as any)
    }
  },
  component: () => (
    <div className="min-h-svh bg-background">
      <Outlet />
    </div>
  ),
})
