import React from 'react';
import Body from './Body';
import { SidebarPortal } from '@plone/volto/components';
import Data from './Data';

const Edit = (props) => {
  const { data, onChangeBlock, block, selected } = props;

  return (
    <>
      CTA Edit
      <Body {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <Data
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
