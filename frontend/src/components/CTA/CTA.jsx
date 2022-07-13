/**
 * CTA component.
 * @module components/CTA/CTA
 */

import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import PropTypes from 'prop-types';

const CTA = (props) => {
  const content = props.content ? props.content : 'CTA button';
  const href = props.href;
  const size = props.size;
  const openLinkInNewTab = props.openLinkInNewTab;
  const containerClassName = `ctaContainer ${props.align}`;
  const className = props.className ? `cta ${props.className}` : 'cta';

  const InnerCTA = () =>
    href ? (
      <UniversalLink href={href} openLinkInNewTab={openLinkInNewTab}>
        <Button
          primary
          content={content}
          size={size}
          className={className}
          icon={props.icon ? true : false}
        />
      </UniversalLink>
    ) : (
      <Button
        primary
        content={content}
        size={size}
        className={className}
        icon={props.icon ? true : false}
      />
    );

  return props.notContainer ? (
    <div className={containerClassName}>
      <InnerCTA />
    </div>
  ) : (
    <Container className={containerClassName}>
      <InnerCTA />
    </Container>
  );
};

CTA.propTypes = {
  content: PropTypes.node.isRequired,
  href: PropTypes.string,
  size: PropTypes.string,
  align: PropTypes.string,
  openLinkInNewTab: PropTypes.bool,
  className: PropTypes.string,
};

export default CTA;
