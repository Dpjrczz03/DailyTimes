from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Navigate to the app and take a screenshot of the initial load
    page.goto("http://localhost:3000")
    # Wait for the skeleton to disappear and the news grid to be populated
    expect(page.locator(".news-grid")).to_be_visible()
    # Give a little extra time for images to load
    page.wait_for_timeout(2000)
    page.screenshot(path="jules-scratch/verification/01_initial_load.png")

    # 2. Test search suggestions
    search_input = page.locator('input[type="search"]')
    search_input.fill("Tesla")
    # Wait for suggestions to appear
    expect(page.locator(".suggestions-list")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/02_suggestions_visible.png")

    # 3. Test closing suggestions by clicking away
    page.click("h1") # Click on the title
    expect(page.locator(".suggestions-list")).to_be_hidden()
    page.screenshot(path="jules-scratch/verification/03_suggestions_hidden.png")

    browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
