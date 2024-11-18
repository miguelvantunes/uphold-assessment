import { test, expect } from '@playwright/test';
import { MOCK_GET_TICKER_FROM_SDK } from './mocks/mock-ticker-data';

const selectCurrency = async (page, currency) => {
  const currencySelector = page.getByTestId('currency-selector');
  await currencySelector.click();

  const newCurrency = page.getByTestId(`currency-${currency}`);
  await newCurrency.click();
};

test.describe('Currency Converter App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the header', async ({ page }) => {
    await expect(page.getByTestId('header')).toBeVisible();
  });

  test('should display the footer', async ({ page }) => {
    await expect(page.getByTestId('footer')).toBeVisible();
  });

  test('should allow input of an amount', async ({ page }) => {
    const amountInput = page.getByTestId('currency-amount');
    await amountInput.fill('100');
    await expect(amountInput).toHaveValue('100');

    await amountInput.fill('5.3');
    await expect(amountInput).toHaveValue('5.3');
  });

  test('should allow change currency', async ({ page }) => {
    const selectedCurrency = page.getByTestId('selected-currency');
    await expect(selectedCurrency).toHaveText('USD');

    selectCurrency(page, 'EUR');

    await expect(selectedCurrency).toHaveText('EUR');
  });

  test('should display message when amount is empty', async ({ page }) => {
    const exchangeRateMessage = page.getByTestId('exchange-rate-message');
    await expect(exchangeRateMessage).toHaveText(
      'Enter an amount to check the rates'
    );
  });

  test('should display message when amount is zero ("0")', async ({ page }) => {
    const amountInput = page.getByTestId('currency-amount');
    await amountInput.fill('0');

    const exchangeRateMessage = page.getByTestId('exchange-rate-message');
    await expect(exchangeRateMessage).toHaveText(
      'Enter an amount to check the rates'
    );
  });

  test('should display error message when fetch fails', async ({ page }) => {
    // Assuming INR is always failing
    selectCurrency(page, 'INR');

    const amountInput = page.getByTestId('currency-amount');
    await amountInput.fill('100');

    const exchangeRateMessage = page.getByTestId('exchange-rate-message');
    await expect(exchangeRateMessage).toHaveText(
      'Houston, we have a fetching problem.'
    );
  });

  test('should fetch currency rates after setting amount and currency', async ({
    page,
  }) => {
    selectCurrency(page, 'EUR');
    const amountInput = page.getByTestId('currency-amount');
    await amountInput.fill('300');

    await page.route('**/v0/ticker/EUR', (route) => {
      console.log(`Intercepted: ${route.request().url()}`);
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_GET_TICKER_FROM_SDK),
      });
    });

    const exchangeRates = page.getByTestId('exchange-rate-list');
    await expect(exchangeRates).toBeVisible();
  });
});
