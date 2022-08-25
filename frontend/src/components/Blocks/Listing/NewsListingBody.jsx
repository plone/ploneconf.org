import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Image, Icon } from 'semantic-ui-react';
import { ConditionalLink } from '@plone/volto/components';

const NewsListingBody = ({ items, linkTitle, linkHref, isEditMode }) => {

  const newsLink = "/news";

  return (
    <div className="news-list">
      <div className="wrapper-aside text">
        <h2 className="aside-title">
          <a href={newsLink}>
            <FormattedMessage id="News" defaultMessage="News" />
          </a>
        </h2>
      </div>
      <div className="news-listing">
        {items.map((item, index) => {
          return (
            <ConditionalLink
              item={item}
              condition={!isEditMode}
              className="news-body"
              key={index}
            >
              <div className="news-image">
                <Image src={`${item['@id']}/@@images/image/preview`} />
              </div>
              <div className="news-texts">
                <div className="news-title">{item.title}</div>
                <div className="news-text">
                  {item.description && item.description}
                </div>
              </div>
            </ConditionalLink>
          );
        })}
      </div>
      <a href="/news" className="news-more">
        <Icon name="add" />
        <FormattedMessage id="More News" defaultMessage="More News" />
      </a>
    </div>
  );
};

export default injectIntl(NewsListingBody);
