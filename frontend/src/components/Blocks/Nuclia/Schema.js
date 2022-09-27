import { defineMessages } from 'react-intl';

const messages = defineMessages({
  titleInput: {
    id: 'Title',
    defaultMessage: 'Title',
  },
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
        fields: ['title', 'knowledgebox', 'zone'],
      },
    ],

    properties: {
      title: {
        title: intl.formatMessage(messages.titleInput),
      },
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
