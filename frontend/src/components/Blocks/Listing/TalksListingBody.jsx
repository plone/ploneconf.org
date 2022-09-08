import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import cx from 'classnames';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import {Popup} from 'semantic-ui-react';

const TalksListingBody = ({ items, linkTitle, linkHref, isEditMode }) => {
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

  return (
    <>
      <div className="talks-listing items">
        {items.map((item) => (
          <div
            className={cx('listing-item', {
              'too-many-speakers': item?.presenters?.length > 2,
            })}
            key={item['@id']}
          >
            <ConditionalLink item={item} condition={!isEditMode}>
              <div className="listing-body">
                <h2>{item.title ? item.title : item.id}</h2>
                <p className="speakers-by">
                  By:{' '}
                  {item?.presenters?.map((speaker, index) => (  
                    <>
                      {speaker.title}{' '}
                      {item?.presenters.length > 1 &&
                        item?.presenters.length !== index + 1 && (
                          <span>&mdash; </span>
                        )}
                    </>
                  ))}
                </p>

                {item.text && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.text.data,
                    }}
                  />
                )}
              </div>
              <div className="listing-image-wrapper">
                {item?.presenters?.map((speaker) => (
                  <Popup
                    trigger={
                      <div className="speakers-preview">
                        {!speaker?.image && <img src={DefaultImageSVG} alt="" />}
                        {speaker?.image && (
                          <img
                            src={flattenToAppURL(speaker?.image.download)}
                            alt={item.title}
                          />
                        )}
                      </div>
                    }
                    position="top center"
                  >
                    <Popup.Content>{speaker.title}</Popup.Content>
                  </Popup>
                ))}
              </div>
            </ConditionalLink>
          </div>
        ))}
      </div>

      {link && <div className="footer">{link}</div>}
    </>
  );
};

TalksListingBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default TalksListingBody;
