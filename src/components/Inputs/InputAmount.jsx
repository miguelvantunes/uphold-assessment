import PropTypes from 'prop-types';

const InputNumber = ({ value, setValue }) => {
  return (
    <input
      type="number"
      placeholder="0.00"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onWheel={(e) => e.target.blur()}
      className="bg-uhAliceBlue w-full px-6 text-5xl h-[78px] rounded-lg"
    />
  );
};

InputNumber.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

export default InputNumber;
