import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import {Image} from 'semantic-ui-react';
import { ConditionalLink } from '@plone/volto/components';

const NewsListingBody = ({ items, linkTitle, linkHref, isEditMode }) => {
  return (
    <div className="news-list">
      <div className="news-head-title">
        <h2 className='aside-title'><FormattedMessage id='News' defaultMessage='News' /></h2>
      </div>
      <div className="news-listing">
        {items.map((item, index) => {
          return (
              <div className="news-body" key={index}>
                <div className="news-image"><Image src={`${item['@id']}/@@images/image/thumb`}/></div>
                <div className="news-texts">
                  <div className="news-title"> <ConditionalLink item={item} condition={!isEditMode}>{item.title}</ConditionalLink></div>
                  <div className="news-text">{item.description && item.description}</div>
                </div>
              </div>
          );
        })}
      </div>
    </div>
  );
};

export default injectIntl(NewsListingBody);
