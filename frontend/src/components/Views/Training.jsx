import React from 'react';
import { Container } from 'semantic-ui-react';
import { PresentersInfo } from '@package/components';
import { ScheduleInfo } from '@package/components';
import { SessionInfo } from '@package/components';
import { Embed } from 'semantic-ui-react';

const Training = ({ content }) => {
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
      {(content.slides_url || content.slides_embed) && <h3>Slides</h3>}
      {content.slides_url && <a href={content.slides_url}>Slides URL</a>}
      {content.slides_embed && (
        <div
          dangerouslySetInnerHTML={{
            __html: content.slides_embed,
          }}
        />
      )}
      {content.video_url && (
        <>
          <h3>Recorded training</h3>
          <div className="video-inner">
            <Embed
              id={
                content.video_url.match(/.be\//)
                  ? content.video_url.match(/^.*\.be\/(.*)/)[1]
                  : content.video_url.match(/^.*\?v=(.*)$/)[1]
              }
              source="youtube"
              icon="play"
              defaultActive
              autoplay={false}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default Training;
