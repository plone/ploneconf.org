import { defineMessages } from 'react-intl';

const messages = defineMessages({
  date: {
    id: 'Date',
    defaultMessage: 'Date',
  },
  item: {
    id: 'Item',
    defaultMessage: 'Item',
  },
});

export const Schema = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.item),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['date'],
      },
    ],

    properties: {
      date: {
        title: intl.formatMessage(messages.date),
        widget: "datetime"
      }
    },
    required: ['date'],
  };
};
