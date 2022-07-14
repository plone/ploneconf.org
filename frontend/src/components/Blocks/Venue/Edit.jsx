/**
 * Venue block.
 * @module components/Blocks/Venue/Edit
 */

import React, { Fragment } from 'react';
import View from './View';
import Data from './Data';
import { SidebarPortal } from '@plone/volto/components';

/**
 * Venue Edit block.
 * @class Edit
 * @extends Component
 */
const Edit = (props) => (
  <Fragment>
    <View data={props.data} />
    <SidebarPortal selected={props.selected}>
      <Data {...props} />
    </SidebarPortal>
  </Fragment>
);

export default Edit;
