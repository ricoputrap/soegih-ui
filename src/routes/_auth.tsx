import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth")({
  component: () => (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <div className="w-full max-w-sm px-4">
        <Outlet />
      </div>
    </div>
  ),
})
