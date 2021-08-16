import React from 'react';
import PropTypes from 'prop-types';
import { CTA } from '@package/components';

const DefaultBody = (props) => {
  const { data, isEditMode } = props;
  const content = data.content;
  const size = data.size;
  const href = data.href;
  const align = data.align;

  return (
    <>
      {isEditMode && content && (
        <CTA content={content} size={size} align={align} />
      )}
      {!isEditMode && (
        <CTA content={content} size={size} href={href} align={align} />
      )}
    </>
  );
};

DefaultBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default DefaultBody;
