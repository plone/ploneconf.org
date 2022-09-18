import React from 'react';
import { useDispatch } from 'react-redux';
import { Tab, Label, Icon, Menu } from 'semantic-ui-react';
import { listTalks } from '../../actions';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
var _ = require('lodash');

const groupByDay = (e) => {
  const datetimeObj = new Date(`${e.start}`);
  return datetimeObj.getDate();
};

const groupByHour = (e) => {
  const datetimeObj = new Date(`${e.start}`);
  const hour = `${datetimeObj.getUTCHours()}`;
  const min = `${datetimeObj.getUTCMinutes()}0`.slice(0, 2);
  return `${hour}${min}`;
};

const broupByTrack = (e) => {
  return e['@type'] === 'MiscEvent' ? 'misc-event' : e.track?.[0].token;
};

const Schedule = (props) => {
  const { miscEvent = [] } = props;
  const dispatch = useDispatch();
  const [talks, setTalks] = React.useState({});

  const iconDict = {
    registration: 'clipboard list',
    coffe: 'coffee',
    lunch: 'utensils',
    party: 'beer',
    talk: 'microphone',
    Talk: 'microphone',
    Keynote: 'microphone',
  };

  React.useEffect(() => {
    dispatch(listTalks()).then((results) => {
      const allEvent = [
        ...results.map((event, index) => {
          return { ...event, eventType: event['@type'] };
        }),
        ...miscEvent.map((event, index) => {
          return {
            ...event,
            start: event.start.slice(0, -1),
            end: event.end.slice(0, -1),
            '@type': 'MiscEvent',
          };
        }),
      ];
      let resutTemp = _.chain(allEvent).groupBy(groupByDay).value();
      Object.keys(resutTemp).forEach((key, index) => {
        resutTemp[key] = _.groupBy(resutTemp[key], groupByHour);
      });
      setTalks(resutTemp);
    });
  }, [dispatch, miscEvent]);

  const talkCardGenerator = (data) => {
    return data.map((talk, index) => {
      const start = new Date(`${talk.start}`);
      const end = new Date(`${talk.end}`);
      let presenters = [];
      if (talk.presenters?.length === 1) {
        presenters = [...talk.presenters];
      }
      if (talk.presenters?.length > 1) {
        presenters = talk.presenters.slice(0, -1);
      }
      return (
        <div className="talk-card">
          {talk['@type'] === 'Keynote' && (
            <Label ribbon className="keynote">
              Keynote
            </Label>
          )}
          <div className="session-info">
            <div className="track-room">
              <Icon name="map marker alternate" />
              {talk.track[0].title}
            </div>
            <div className="timing">
              <Icon name="clock outline" />
              {`${start.toLocaleTimeString('fr', {
                hour: '2-digit',
                minute: '2-digit',
              })} - ${end.toLocaleTimeString('fr', {
                hour: '2-digit',
                minute: '2-digit',
              })}`}
            </div>
          </div>
          <div className="talk-card-title">
            <UniversalLink href={flattenToAppURL(talk['@id'])}>
              {talk.title}
            </UniversalLink>
          </div>
          {talk.presenters && (
            <div className="presenters">
              {talk['@type'] === 'Keynote' ? (
                'Keynote presented by: '
              ) : (
                <Icon name={`user${talk.presenters.length > 1 ? 's' : ''}`} />
              )}
              {presenters.map((persenter, index) => {
                return (
                  <>
                    <UniversalLink href={persenter.path}>
                      {persenter.title}
                    </UniversalLink>
                    {presenters.length !== index + 1 && ', '}
                  </>
                );
              })}
              {talk.presenters.length > 1 && (
                <>
                  {' '}
                  and{' '}
                  <UniversalLink
                    href={talk.presenters[talk.presenters.length - 1].path}
                  >
                    {talk.presenters[talk.presenters.length - 1].title}
                  </UniversalLink>
                </>
              )}
            </div>
          )}
          {talk.level && (
            <div className="info level">
              <span>Level:</span>{' '}
              {talk.level.map((levelItem, index) => {
                return <Label key={index}>{levelItem.title}</Label>;
              })}
            </div>
          )}
          {talk.audience && (
            <div className="info audience">
              <span>Audiance :</span>{' '}
              {talk.audience.map((audienceItem, index) => {
                return <Label key={index}>{audienceItem.title}</Label>;
              })}
            </div>
          )}
        </div>
      );
    });
  };

  const panes = Object.keys(talks).map((keyDay, index) => {
    return {
      menuItem: (
        <Menu.Item key={keyDay}>
          <div>{`Day ${index + 1}`}</div>
          <div>{`${keyDay} oct`}</div>
        </Menu.Item>
      ),
      render: () => {
        return (
          <div className="tab-content">
            {Object.keys(talks[keyDay]).map((keyHour, index) => {
              const data = _.groupBy(talks[keyDay][keyHour], broupByTrack);
              const time = new Date(`${talks[keyDay][keyHour][0].start}`);
              return (
                <div
                  className={`timeslot ${
                    data['misc-event']
                      ? `slot-misc-event ${data['misc-event'][0]['eventType']}`
                      : 'slot-talk'
                  }`}
                >
                  <div className="aside-indication">
                    <div className="icon-type">
                      <Icon
                        name={iconDict[data[Object.keys(data)[0]][0].eventType]}
                      />
                    </div>
                    <div className="time-indication">
                      {time.toLocaleTimeString('fr', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div className="rooms">
                    {(data['track-1'] ||
                      data['track-2'] ||
                      data['track-3']) && (
                      <>
                        {
                          <div className="track track-1">
                            {data['track-1'] &&
                              talkCardGenerator(data['track-1'])}
                          </div>
                        }
                        {
                          <div className="track track-2">
                            {data['track-2'] &&
                              talkCardGenerator(data['track-2'])}
                          </div>
                        }
                        {
                          <div className="track track-3">
                            {data['track-3'] &&
                              talkCardGenerator(data['track-3'])}
                          </div>
                        }
                      </>
                    )}
                    {data['misc-event'] && (
                      <div className="misc-event">
                        <div className="session-info">
                          <div className="timing">
                            <Icon name="clock outline" />
                            {`${new Date(
                              `${data['misc-event'][0].start}`,
                            ).toLocaleTimeString('fr', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })} - ${new Date(
                              `${data['misc-event'][0].end}`,
                            ).toLocaleTimeString('fr', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}`}
                          </div>
                        </div>
                        <div className="title">
                          {data['misc-event'][0].title}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      },
    };
  });

  return (
    <div className="schedule">
      <Tab panes={panes} className="tab" />
    </div>
  );
};

export default Schedule;
