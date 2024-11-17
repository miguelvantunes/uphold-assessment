import PropTypes from 'prop-types';
import DropDownIcon from '@assets/svg/dropdown-icon.svg';
import { useEffect, useRef, useState } from 'react';
import { CURRENCY_LIST } from '@/data/currency-list';

const SelectCurrency = ({ currency, setCurrency }) => {
  const selectCurrencyRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectCurrencyRef.current &&
        !selectCurrencyRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectCurrencyRef}>
      <button
        className="flex gap-2 items-center bg-white rounded-full py-2 px-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src={`/flags/${currency}@3x.png`} className="w-6" />
        <span>{currency}</span>
        <img
          src={DropDownIcon}
          className={`w-2 ${isOpen ? 'rotate-180' : ''} `}
        />
      </button>
      <ul
        className={`${
          isOpen ? '' : 'hidden'
        } absolute mt-1 h-[215px] w-full bg-white overflow-auto scrollbar-none rounded-lg shadow-lg`}
      >
        {CURRENCY_LIST.filter((curr) => curr !== currency).map(
          (curr, index) => (
            <li key={`${curr}-${index}`} className="hover:bg-uhAliceBlue">
              <button
                className="flex gap-2 items-center p-3 w-full"
                onClick={() => {
                  setCurrency(curr);
                  setIsOpen(false);
                }}
              >
                <img src={`/flags/${curr}@3x.png`} className="w-6" />
                <span>{curr}</span>
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

SelectCurrency.propTypes = {
  currency: PropTypes.string,
  setCurrency: PropTypes.func,
};

export default SelectCurrency;
