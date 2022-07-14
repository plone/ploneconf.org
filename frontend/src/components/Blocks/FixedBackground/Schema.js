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
  image: {
    id: 'Image',
    defaultMessage: 'Image',
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
        fields: ['image', 'align', 'size'],
      },
    ],

    properties: {
      image: {
        title: intl.formatMessage(messages.image),
        widget: 'object_browser',
      },
      align: {
        title: intl.formatMessage(messages.align),
        default: 'left',
        choices: [
          ['left', 'left'],
          ['center', 'center'],
          ['right', 'right'],
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
    },
    required: ['image'],
  };
};
