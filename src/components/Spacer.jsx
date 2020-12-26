// I couldn't find a native spacer in Polaris while doing this
// So I made my own

import React from 'react';
import PropTypes from 'prop-types';

const Spacer = (props) => {
  return <div style={{ margin: props.amount }} />;
};

Spacer.propTypes = {
  amount: PropTypes.number.isRequired,
};

Spacer.defaultProps = {
  amount: 20,
};

export default Spacer;
