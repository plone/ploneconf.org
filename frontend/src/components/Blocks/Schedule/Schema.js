import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Title',
    defineMessages: 'Title',
  },
  typeOfEvent: {
    id: 'Type of event',
    defineMessages: 'Type of event',
  },
  startDate: {
    id: 'Start Date',
    defineMessages: 'Start Date',
  },
  endDate: {
    id: 'End Date',
    defineMessages: 'End Date',
  },
  schedule: {
    id: 'Schedule',
    defineMessages: 'Schedule',
  },
  miscEvent: {
    id: 'Misc Event',
    defineMessages: 'Misc Event',
  },
  registration: {
    id: 'Registration',
    defineMessages: 'Registration',
  },
  coffeBreak: {
    id: 'Coffe Break',
    defineMessages: 'Coffe Break',
  },
  lunch: {
    id: 'Lunch',
    defineMessages: 'Lunch',
  },
  party: {
    id: 'Party',
    defineMessages: 'Party',
  },
  talk: {
    id: 'Talk',
    defineMessages: 'Talk',
  },
});

const miscEventSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.miscEvent),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'eventType', 'start', 'end'],
      },
    ],

    properties: {
      title: {
        title: intl.formatMessage(messages.title),
      },
      eventType: {
        title: intl.formatMessage(messages.typeOfEvent),
        choices: [
          ['registration', intl.formatMessage(messages.registration)],
          ['coffe', intl.formatMessage(messages.coffeBreak)],
          ['lunch', intl.formatMessage(messages.lunch)],
          ['party', intl.formatMessage(messages.party)],
          ['talk', intl.formatMessage(messages.talk)],
        ],
      },
      start: {
        title: intl.formatMessage(messages.startDate),
        type: 'datetime',
      },
      end: {
        title: intl.formatMessage(messages.endDate),
        type: 'datetime',
      },
    },
    required: ['title', 'eventType', 'start', 'end'],
  };
};

export const Schema = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.schedule),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['miscEvent'],
      },
    ],

    properties: {
      miscEvent: {
        title: intl.formatMessage(messages.miscEvent),
        widget: 'object_list',
        schema: miscEventSchema,
      },
    },
    required: [],
  };
};
