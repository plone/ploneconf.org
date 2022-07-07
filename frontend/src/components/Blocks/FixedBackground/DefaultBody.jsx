import React from 'react';
import PropTypes from 'prop-types';
import { FixedBackground } from '@package/components';

const DefaultBody = (props) => {
  const { data, isEditMode } = props;
  const image = data.image;
  const size = data.size;
  const align = data.align;

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
