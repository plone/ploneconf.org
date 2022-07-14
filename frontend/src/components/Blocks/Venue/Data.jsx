import React from 'react';
import { useIntl } from 'react-intl';
import schemaVenue from './schema.js';
import { BlockDataForm } from '@plone/volto/components';

const VenueBlockData = (props) => {
  const { block, data, onChangeBlock } = props;
  const intl = useIntl();
  const schema = schemaVenue({ ...props, intl });
  return (
    <BlockDataForm
      block={block}
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
    />
  );
};

export default VenueBlockData;
