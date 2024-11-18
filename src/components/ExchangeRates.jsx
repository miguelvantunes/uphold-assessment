import PropTypes from 'prop-types';

const Message = ({ message }) => {
  return (
    <div
      className="flex items-center justify-center mt-7 text-center"
      data-testid="exchange-rate-message"
    >
      {message}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
};

const ExchangeRates = ({ amount, rates }) => {
  if (!amount || amount === '0') {
    return <Message message="Enter an amount to check the rates" />;
  }

  if (amount && !rates) {
    return <Message message="Loading" />;
  }

  if (rates?.length === 0) {
    return <Message message="Houston, we have a fetching problem." />;
  }

  return (
    <ul
      className="flex flex-col mt-10 px-6 gap-8 pr-12"
      data-testid="exchange-rate-list"
    >
      {rates.map((rate, index) => (
        <li key={index} className="flex justify-between items-center">
          <span className="text-2xl">{(rate.ask * amount).toFixed(3)}</span>
          <div className="flex gap-2">
            <img src={`/flags/${rate.currency}@3x.png`} className="w-6" />
            <span>{rate.currency}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

ExchangeRates.propTypes = {
  amount: PropTypes.string,
  rates: PropTypes.array,
};

export default ExchangeRates;
