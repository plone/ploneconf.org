import React from 'react';
import { Container } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import githubSVG from '@package/icons/github.svg';
import twitterSVG from '@package/icons/twitter.svg';

const Person = ({ content }) => {
  return (
    <Container className="person-view">
      <div className="person-header">
        <div className="person-image-wrapper">
          <img src={flattenToAppURL(content.image.scales.teaser.download)} />
        </div>
        <div className="person-content">
          <h1>{content.title}</h1>
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
        </div>
      </div>
    </Container>
  );
};

export default Person;
