import { useEffect, useState } from 'react';
import Header from '@components/Header';
import useDebounce from '@/hooks/useDebounce';
import InputAmount from '@/components/Inputs/InputAmount';
import ExchangeRates from '@components/ExchangeRates';
import Footer from '@components/Footer';
import upholdSdk from '@/lib/uphold-sdk';
import { CURRENCY_LIST } from '@/data/currency-list';
import SelectCurrency from './components/Inputs/SelectCurrency';

const DEFAULT_CURRENCY = 'USD';
const EXPIRE_CACHE_TIME = 10000;

function App() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const debouncedAmount = useDebounce(amount);
  const debouncedCurrency = useDebounce(currency, 100);
  const [cachedExchangeRates, setCachedExchangeRates] = useState({});
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setFetchError(false);
    const fetchExchangeRates = async () => {
      try {
        const rates = await upholdSdk.getTicker(debouncedCurrency);
        const filteredRates = rates
          .filter(
            (item) =>
              CURRENCY_LIST.includes(item.currency) &&
              item.currency !== debouncedCurrency
          )
          .slice(0, 10);

        setCachedExchangeRates((prevRates) => ({
          ...prevRates,
          [debouncedCurrency]: {
            rates: filteredRates,
            expireAt: Date.now() + EXPIRE_CACHE_TIME,
          },
        }));
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setFetchError(true);
      }
    };

    if (
      (debouncedAmount && !cachedExchangeRates[debouncedCurrency]) ||
      cachedExchangeRates[debouncedCurrency]?.expireAt < Date.now()
    ) {
      fetchExchangeRates();
    }
  }, [debouncedAmount, debouncedCurrency, cachedExchangeRates]);

  return (
    <>
      <Header />
      <main className="mb-auto">
        <div className="mt-32 min-h-[864px]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl">Currency Converter</h1>
            <p className="pt-8 text-2xl max-w-lg text-center">
              Receive competitive and transparent pricing with no hidden
              spreads. See how we compare.
            </p>

            <div className="flex flex-col w-[540px] mt-16">
              <div className="relative">
                <InputAmount value={amount} setValue={setAmount} />
                <div className="absolute right-4 top-5">
                  <SelectCurrency
                    currency={currency}
                    setCurrency={setCurrency}
                  />
                </div>
              </div>

              <ExchangeRates
                amount={amount}
                rates={
                  fetchError
                    ? []
                    : cachedExchangeRates[debouncedCurrency]?.rates || null
                }
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
