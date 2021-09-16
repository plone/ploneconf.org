import React from 'react';
import { Container, Label, Tab } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import githubSVG from '@package/icons/github.svg';
import twitterSVG from '@package/icons/twitter.svg';
import { Link } from 'react-router-dom';

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
          <img src={flattenToAppURL(content.image.scales.teaser.download)} />
        </div>
        <div className="person-content">
          <h1>{content.title}</h1>
          <ul>
            {content?.labels?.map((label) => (
              <li key={label} style={{ marginRight: '10px' }}>
                <Label color={getColor(label)}>{label}</Label>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <a href={`https://github.com/{content.github}`}>
                <Icon name={githubSVG} size="18px" />
                {content.twitter}
              </a>
            </li>

            <li>
              <a href={`https://twitter.com/{content.twitter}`}>
                <Icon name={twitterSVG} size="18px" />
                {content.github}
              </a>
            </li>
          </ul>
          <p className="person-description">{content.description}</p>
          {content.text && (
            <div
              dangerouslySetInnerHTML={{
                __html: content.text.data,
              }}
            />
          )}
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
                    {activity?.items?.map((item) => (
                      <div key={item} className="person-activity">
                        <Link to={flattenToAppURL(item['@id'])}>
                          <h2>{item.title}</h2>
                          <p>{item?.description}</p>
                          <div className="person-activity-info">
                            <div>
                              {item?.audience?.length &&
                                item?.audience.map((audience) => (
                                  <Label key={audience}>{audience}</Label>
                                ))}
                            </div>
                            {item?.level && (
                              <div>
                                <Label>Level: {item.level}</Label>
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </Tab.Pane>
                ),
              }))}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Person;
