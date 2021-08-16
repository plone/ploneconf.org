/**
 * CTA component.
 * @module components/CTA/CTA
 */

import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import PropTypes from 'prop-types';

const CTA = (props) => {
  const content = props.content;
  const href = props.href;
  const size = props.size;
  const openLinkInNewTab = props.openLinkInNewTab;
  const containerClassName = `ctaContainer ${props.align}`;
  const className = props.className ? `cta ${props.className}` : 'cta';
  return (
    <Container className={containerClassName}>
      {href ? (
        <UniversalLink href={href} openLinkInNewTab={openLinkInNewTab}>
          <Button primary content={content} size={size} className={className} />
        </UniversalLink>
      ) : (
        <Button primary content={content} size={size} className={className} />
      )}
    </Container>
  );
};

CTA.propTypes = {
  content: PropTypes.string.isRequired,
  href: PropTypes.string,
  size: PropTypes.string,
  align: PropTypes.string,
  openLinkInNewTab: PropTypes.bool,
  className: PropTypes.string,
};

export default CTA;
