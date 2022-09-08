/**
 * PresentersInfo component.
 * @module components/PresentersInfo/PresentersInfo
 */

import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { Icon } from '@plone/volto/components';
import githubSVG from '@package/icons/github.svg';
import twitterSVG from '@package/icons/twitter.svg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Popup} from 'semantic-ui-react';

const PresentersInfo = (props) => {
  const content = props.content;
  const presenters = content.presenters;
  return (
    <div className="speaker-image-wrapper">
      {presenters?.map((item) => (
        <div className="listing-item" key={item['@id']}>
          <Link to={flattenToAppURL(item['@id'])}>
            <Popup
              trigger={
                <div className="listing-image-wrapper">
                  {!item?.image?.download && <img src={DefaultImageSVG} alt="" />}
                  {item?.image?.download && (
                    <img
                      src={flattenToAppURL(item.image.download)}
                      alt={item.title}
                    />
                  )}
                </div>
              }
              position="top center"
              >
              <Popup.Content>{item.title ? item.title : item.id}</Popup.Content>
            </Popup>
            
            <div className="listing-body">
              <ul className="person-social">
                {item.github && (
                  <li>
                    <a
                      href={`https://github.com/${item.github}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name={githubSVG} size="18px" />
                    </a>
                  </li>
                )}

                {item.twitter && (
                  <li>
                    <a
                      href={`https://twitter.com/${item.twitter.replace(
                        '@',
                        '',
                      )}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name={twitterSVG} size="18px" />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

PresentersInfo.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.shape({
      data: PropTypes.string,
    }),
    presenters: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.object,
      }),
    ),
    session_audience: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        token: PropTypes.string,
      }),
    ),
    session_level: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        token: PropTypes.string,
      }),
    ),
    track: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        token: PropTypes.string,
      }),
    ),
    end: PropTypes.string,
    start: PropTypes.string,
  }).isRequired,
};

export default PresentersInfo;
