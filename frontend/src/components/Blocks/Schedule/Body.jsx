/**
 * View Countdown block
 * @module components/Blocks/Countdown/View
 */
import React from 'react';
import { injectIntl } from 'react-intl';
import { Schedule } from '@package/components';

const Body = (props) => {
  const { data, isEditMode } = props;

  return <Schedule miscEvent={data.miscEvent} isEditMode={isEditMode} />;
};

export default injectIntl(Body);
