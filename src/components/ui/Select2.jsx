import PropTypes from "prop-types";
import Select from "react-select";

const Select2 = ({
  data = [],
  value = "",
  onChange = () => {},
  placeholder = "",
  allowClear = true,
  width = "100%",
  form2 = false,
  ...restProps
}) => {
  const options = data.map((opt) => ({
    value: opt.id,
    label: opt.text,
  }));

  const selectedOption = options.find((o) => o.value === value) || null;

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(option) => onChange(option ? option.value : "")}
      placeholder={placeholder}
      isClearable={allowClear}
      {...restProps}
      className="select2"
      classNamePrefix="chk"
    />
  );
};

Select2.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  allowClear: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Select2;
