import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import { Icon } from '@plone/volto/components';
import githubSVG from '@package/icons/github.svg';
import twitterSVG from '@package/icons/twitter.svg';

import { PreviewImage } from '@plone/volto/components'


const PersonsSimpleListingBody = ({
  items,
  linkTitle,
  linkHref,
  isEditMode,
}) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }

  const { settings } = config;



  // return <img src={src} alt={alt ?? item.title} {...rest} />;

  return (
    <>
      <div className="persons-simple-listing items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            <ConditionalLink item={item} condition={!isEditMode}>
              <div className="listing-image-wrapper">
                <PreviewImage item={item} size="mini" />
              </div>
              <div className="listing-body">
                <h3>{item.title ? item.title : item.id}</h3>
                <div className="person-social">
                  {item.github && (
                      <a
                        href={`https://github.com/${item.github}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon name={githubSVG} size="18px" />
                      </a>
                  )}

                  {item.twitter && (
                      <a
                        href={`https://twitter.com/${item.twitter.replace(
                          '@',
                          '',
                        )}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon name={twitterSVG} size="18px" />
                      </a>
                  )}
                </div>
              </div>
            </ConditionalLink>
          </div>
        ))}
      </div>

      {link && <div className="footer">{link}</div>}
    </>
  );
};

PersonsSimpleListingBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default PersonsSimpleListingBody;
