import React from 'react';
import PropTypes from 'prop-types';
import DefaultBody from './DefaultBody';

const BodyTemplate = (props) => {
  return <DefaultBody {...props} />;
};

BodyTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default BodyTemplate;
