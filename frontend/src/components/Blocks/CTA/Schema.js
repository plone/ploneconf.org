import { defineMessages } from 'react-intl';

const messages = defineMessages({
  href: {
    id: 'URL',
    defaultMessage: 'URL',
  },
  item: {
    id: 'Item',
    defaultMessage: 'Item',
  },
  label: {
    id: 'Label',
    defaultMessage: 'Label',
  },
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  size: {
    id: 'Size',
    defaultMessage: 'Size',
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
        fields: ['content', 'href', 'align', 'size'],
      },
    ],

    properties: {
      content: {
        title: intl.formatMessage(messages.label),
        default: 'Label',
      },
      align: {
        title: intl.formatMessage(messages.align),
        default: 'left',
        choices: [
          ['left', 'Left'],
          ['mid-left', 'Mid Left'],
          ['center', 'Center'],
          ['mid-right', 'Mid Right'],
          ['right', 'Right'],
        ],
      },
      size: {
        title: intl.formatMessage(messages.size),
        default: 'medium',
        choices: [
          ['mini', 'mini'],
          ['tiny', 'tiny'],
          ['small', 'small'],
          ['medium', 'medium'],
          ['large', 'large'],
          ['big', 'big'],
          ['huge', 'huge'],
          ['massive', 'massive'],
        ],
      },
      href: {
        title: intl.formatMessage(messages.href),
        widget: 'url',
      },
    },
    required: ['content', 'href'],
  };
};
