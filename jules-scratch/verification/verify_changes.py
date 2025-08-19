import time
from playwright.sync_api import Page, expect

def test_homepage(page: Page):
    time.sleep(10)
    page.goto("http://localhost:3000")

    # Wait for the news articles to load
    expect(page.locator(".col-md-3").first).to_be_visible()

    page.screenshot(path="jules-scratch/verification/light-mode.png")

    # Click the dark mode button
    page.locator(".darkbtn").click()

    # Wait for the theme to change
    expect(page.locator(".main")).to_have_css("background-color", "rgb(35, 35, 35)")

    page.screenshot(path="jules-scratch/verification/dark-mode.png")
