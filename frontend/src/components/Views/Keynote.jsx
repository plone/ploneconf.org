import React from 'react';
import { Container, Label } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import githubSVG from '@package/icons/github.svg';
import twitterSVG from '@package/icons/twitter.svg';
import { Link } from 'react-router-dom';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';

const Keynote = ({ content }) => {
  // const getColor = (label) => {
  //   switch (label) {
  //     case 'speaker':
  //       return 'blue';
  //     case 'keynote-speaker':
  //       return 'red';
  //     case 'instructor':
  //       return 'orange';
  //     default:
  //       return 'grey';
  //   }
  // };

  return (
    <Container className="talk-view">
      <div className="talk-header">
        <div className="talk-content">
          <h1>{content.title}</h1>
          <div className="talk-targets">
            {content.session_audience && (
              <Label.Group>
                Audience:{' '}
                {content.session_audience.map((audience) => (
                  <Label>{audience.title}</Label>
                ))}
              </Label.Group>
            )}
            {content.session_level && (
              <Label.Group>
                Level:{' '}
                {content.session_level.map((level) => (
                  <Label>{level.title}</Label>
                ))}
              </Label.Group>
            )}
          </div>
          {/* <ul>
            {content.github && (
              <li>
                <a href={`https://github.com/${content.github}`}>
                  <Icon name={githubSVG} size="18px" />
                  {content.github}
                </a>
              </li>
            )}

            {content.twitter && (
              <li>
                <a
                  href={`https://twitter.com/${content.twitter.replace(
                    '@',
                    '',
                  )}`}
                >
                  <Icon name={twitterSVG} size="18px" />
                  {content.twitter.replace('@', '')}
                </a>
              </li>
            )}
          </ul> */}
          <p className="person-description">{content.description}</p>
          {content.text && (
            <div
              dangerouslySetInnerHTML={{
                __html: content.text.data,
              }}
            />
          )}
        </div>
        <div className="speaker-image-wrapper">
          {content?.presenters?.map((item) => (
            <div className="listing-item" key={item['@id']}>
              <Link to={flattenToAppURL(item['@id'])}>
                <div className="listing-image-wrapper">
                  {!item?.image?.download && (
                    <img src={DefaultImageSVG} alt="" />
                  )}
                  {item?.image?.download && (
                    <img
                      src={flattenToAppURL(item.image.download)}
                      alt={item.title}
                    />
                  )}
                </div>
                <div className="listing-body">
                  <h3>{item.title ? item.title : item.id}</h3>
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
      </div>
    </Container>
  );
};

export default Keynote;
