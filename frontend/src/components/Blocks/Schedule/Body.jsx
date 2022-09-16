/**
 * View Countdown block
 * @module components/Blocks/Countdown/View
 */
import React from 'react';
import { injectIntl } from 'react-intl';
import { Schedule } from '@package/components';

const Body = (props) => {
  const { data } = props;

  return <Schedule miscEvent={data.miscEvent} />;
};

export default injectIntl(Body);
