import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  typeOfEvent: {
    id: 'Type of event',
    defaultMessage: 'Type of event',
  },
  startDate: {
    id: 'Start Date',
    defaultMessage: 'Start Date',
  },
  endDate: {
    id: 'End Date',
    defaultMessage: 'End Date',
  },
  schedule: {
    id: 'Schedule',
    defaultMessage: 'Schedule',
  },
  miscEvent: {
    id: 'Misc Event',
    defaultMessage: 'Misc Event',
  },
  registration: {
    id: 'Registration',
    defaultMessage: 'Registration',
  },
  coffeeBreak: {
    id: 'Coffee Break',
    defaultMessage: 'Coffee Break',
  },
  lunch: {
    id: 'Lunch',
    defaultMessage: 'Lunch',
  },
  party: {
    id: 'Party',
    defaultMessage: 'Party',
  },
  talk: {
    id: 'Talk',
    defaultMessage: 'Talk',
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
          ['coffe', intl.formatMessage(messages.coffeeBreak)],
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
  const miscEventSchemaIntl = miscEventSchema({ ...props, intl });
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
        schema: miscEventSchemaIntl,
      },
    },
    required: [],
  };
};
