/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { LinkMore } from '@plone/volto/components';
import cx from 'classnames';
import { CTA } from '../../CTA/CTA';
import { Icon } from 'semantic-ui-react';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
  const { data } = props;
  const BodyPart = () => (
    <div className="hero-body">
      <div className="hero-text">
        {data.title && <h1 className="title">{data.title}</h1>}
        {data.subTitle && <div className="sub-title">{data.subTitle}</div>}
        {data.description && <p className="description">{data.description}</p>}
      </div>
      {data.ctaLink ? (
        <CTA
          content={
            <>
              {data.linkTitle && data.linkTitle}{' '}
              {data.ctaIcon && <Icon name={data.ctaIcon} />}
            </>
          }
          href={data.linkHref && data.linkHref['@id']}
          notContainer
          align={data.alignIcon}
        />
      ) : (
        <LinkMore data={data} />
      )}
    </div>
  );

  const ImagePart = () => (
    <div className={cx('wrapper-aside', { text: data.asideTitle })}>
      {data.url ? (
        <img
          src={`${flattenToAppURL(data.url)}/@@images/image/large`}
          alt=""
          className="hero-image"
          loading="lazy"
        />
      ) : (
        <div
          className={cx('hero-image', {
            'empty-image': !data.asideTitle,
            'aside-title': data.asideTitle,
          })}
        >
          {data.asideTitle && data.asideTitle}
        </div>
      )}
    </div>
  );

  return (
    <div className="block hero">
      <div className={'block-inner-wrapper ' + data.imageSide}>
        {data.imageSide === 'left' ? (
          <>
            <ImagePart />
            <BodyPart />
          </>
        ) : (
          <>
            <BodyPart />
            <ImagePart />
          </>
        )}
      </div>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
