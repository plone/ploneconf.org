import React from 'react';
import { Container, Label, Tab } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import githubSVG from '@package/icons/github.svg';
import twitterSVG from '@package/icons/twitter.svg';
import { Link } from 'react-router-dom';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { ScheduleInfo } from '@package/components';
import { SessionInfo } from '@package/components';

const Person = ({ content }) => {
  const getColor = (label) => {
    switch (label) {
      case 'speaker':
        return 'blue';
      case 'keynote-speaker':
        return 'red';
      case 'instructor':
        return 'orange';
      default:
        return 'grey';
    }
  };

  return (
    <Container className="person-view">
      <div className="person-header">
        <div className="person-image-wrapper">
          {content.image ? (
            <img
              src={flattenToAppURL(content.image.scales.preview.download)}
              alt={content.image_caption}
            />
          ) : (
            <img src={DefaultImageSVG} alt="" />
          )}
        </div>
        <div className="person-content">
          <h1>{content.title}</h1>
          <div className="person-label">
            {content?.labels?.map((label) => (
              <div key={label} style={{ marginRight: '10px' }}>
                <Label color={getColor(label)}>{label}</Label>
              </div>
            ))}
          </div>
          <div className="person-social">
            {content.github && (
              <a href={`https://github.com/${content.github}`}>
                <Icon name={githubSVG} size="18px" />
                {content.github}
              </a>
            )}

            {content.twitter && (
              <a
                href={`https://twitter.com/${content.twitter.replace('@', '')}`}
              >
                <Icon name={twitterSVG} size="18px" />
                {content.twitter.replace('@', '')}
              </a>
            )}
          </div>
          <p className="person-description">{content.description}</p>
          {content.text && (
            <div
              dangerouslySetInnerHTML={{
                __html: content.text.data,
              }}
            />
          )}
          {content?.activities?.length > 0 && (
            <div className="person-activities">
              <Tab
                menu={{
                  secondary: true,
                  pointing: true,
                  attached: true,
                  tabular: true,
                  className: 'formtabs',
                }}
                className="tabs-wrapper"
                renderActiveOnly={false}
                panes={content?.activities?.map((activity) => ({
                  menuItem: activity['@type'],
                  pane: (
                    <Tab.Pane key={activity['@type']}>
                      {activity?.items?.map((item, idx) => (
                        <div className="person-activity" key={idx}>
                          <Link to={flattenToAppURL(item['@id'])}>
                            <h2>{item.title}</h2>
                            <ScheduleInfo
                              start={item.start}
                              end={item.end}
                              track={item.track}
                            />
                            <SessionInfo
                              audience={item.audience}
                              level={item.level}
                            />
                          </Link>
                        </div>
                      ))}
                    </Tab.Pane>
                  ),
                }))}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Person;
