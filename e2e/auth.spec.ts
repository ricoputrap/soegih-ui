import { test, expect } from "@playwright/test"
import { loginAs } from "./fixtures/auth.fixture"

test.describe("Authentication", () => {
  test("login with valid credentials redirects to dashboard", async ({ page }) => {
    await loginAs(page)
    await expect(page).toHaveURL(/dashboard/)
    await expect(page.getByText("Dashboard")).toBeVisible()
  })

  test("login with invalid credentials shows error", async ({ page }) => {
    await page.goto("/login")
    await page.fill('[placeholder="you@example.com"]', "wrong@example.com")
    await page.fill('[placeholder="••••••••"]', "wrongpass")
    await page.click('button[type="submit"]')
    await expect(page.getByText("Invalid email or password")).toBeVisible()
  })

  test("unauthenticated user redirected to login", async ({ page }) => {
    await page.goto("/dashboard")
    await expect(page).toHaveURL(/login/)
  })

  test("logout clears session and redirects to login", async ({ page }) => {
    await loginAs(page)
    await page.getByText("Logout").click()
    await expect(page).toHaveURL(/login/)
  })
})
