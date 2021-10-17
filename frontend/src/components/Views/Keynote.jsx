import React from 'react';
import { Container } from 'semantic-ui-react';
import { PresentersInfo } from '@package/components';
import { ScheduleInfo } from '@package/components';
import { SessionInfo } from '@package/components';

const Keynote = ({ content }) => {
  return (
    <Container className="talk-view">
      <div className="talk-header">
        <div className="talk-content">
          <h1>{content.title}</h1>
          <ScheduleInfo
            start={content.start}
            end={content.end}
            track={content.track}
            url={content['@id']}
          />
          <SessionInfo
            audience={content.session_audience}
            level={content.session_level}
          />
          <p className="person-description">{content.description}</p>
          {content.text && (
            <div
              dangerouslySetInnerHTML={{
                __html: content.text.data,
              }}
            />
          )}
        </div>
        <PresentersInfo content={content} />
      </div>
    </Container>
  );
};

export default Keynote;
