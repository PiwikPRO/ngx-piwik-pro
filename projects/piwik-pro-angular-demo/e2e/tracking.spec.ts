import { test, expect, type Page } from '@playwright/test'

type PaqWindow = Window & { _paq?: unknown[][] }

const getPaq = (page: Page) =>
  page.evaluate(() => (window as PaqWindow)._paq ?? [])

const waitForTracking = (page: Page) =>
  page.waitForFunction(() => ((window as PaqWindow)._paq?.length ?? 0) > 0)

test('on app load, the module initializes tracking and tags _paq with the "angular" source provider', async ({
  page
}) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await waitForTracking(page)

  expect(await getPaq(page)).toContainEqual(
    expect.arrayContaining(['setTrackingSourceProvider', 'angular'])
  )
})

test('adding a product on the e-commerce page pushes an "ecommerceAddToCart" command to _paq', async ({
  page
}) => {
  await page.goto('/event/e-commerce', { waitUntil: 'domcontentloaded' })
  await waitForTracking(page)
  const before = await getPaq(page)
  expect(before).not.toContainEqual(expect.arrayContaining(['ecommerceAddToCart']))

  await page.locator('main').getByRole('button').filter({ hasText: 'Home' }).first().click()

  expect(await getPaq(page)).toContainEqual(
    expect.arrayContaining(['ecommerceAddToCart'])
  )
})
