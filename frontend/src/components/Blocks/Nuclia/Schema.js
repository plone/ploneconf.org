import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Nuclia Search',
    defaultMessage: 'Nuclia Search',
  },
  knowledgebox: {
    id: 'Knowledge Box',
    defaultMessage: 'Knowledge Box',
  },
  zone: {
    id: 'Zone',
    defaultMessage: 'Zone',
  },
});

export const Schema = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['knowledgebox', 'zone'],
      },
    ],

    properties: {
      knowledgebox: {
        title: intl.formatMessage(messages.knowledgebox),
      },
      zone: {
        title: intl.formatMessage(messages.zone),
      },
    },
    required: ['knowledgebox', 'zone'],
  };
};
