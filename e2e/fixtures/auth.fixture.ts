import { type Page } from "@playwright/test"

const TEST_EMAIL = process.env.E2E_TEST_EMAIL ?? "test@example.com"
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD ?? "password123"

export async function loginAs(page: Page, email = TEST_EMAIL, password = TEST_PASSWORD) {
  await page.goto("/login")
  await page.fill('[placeholder="you@example.com"]', email)
  await page.fill('[placeholder="••••••••"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL("**/dashboard")
}
