import React from 'react';
import PropTypes from 'prop-types';
import { FixedBackground } from '@package/components';

const DefaultBody = (props) => {
  const { data, isEditMode } = props;

  return (
    <>
      {isEditMode && 'FixedImageBackground'}
      <FixedBackground {...data} />
    </>
  );
};

DefaultBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default DefaultBody;
