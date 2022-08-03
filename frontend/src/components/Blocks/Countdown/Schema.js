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
  addText: {
    id: 'Add aside text',
    defaultMessage: 'Add aside text',
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
        fields: ['date','addText'],
      },
    ],

    properties: {
      date: {
        title: intl.formatMessage(messages.date),
        widget: 'datetime',
      },
      addText : {
        title: intl.formatMessage(messages.addText),
      }
    },
    required: ['date'],
  };
};
