import { defineMessages } from 'react-intl';

const messages = defineMessages({
  more: {
    id: 'Link more',
    defaultMessage: 'Link more',
  },
  LinkTitle: {
    id: 'Link title',
    defaultMessage: 'Link Title',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  ImageSide: {
    id: 'Image side',
    defaultMessage: 'Image side',
  },
  asideTitle: {
    id: 'Aside title',
    defaultMessage: 'Aside title',
  }
});

const schemaHero = ({ intl }) => {
  return {
    title: 'Block settings',
    required: [],
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.more),
        fields: ['linkTitle', 'linkHref', 'imageSide','asideTitle'],
      },
    ],
    properties: {
      linkTitle: {
        title: intl.formatMessage(messages.LinkTitle),
      },
      linkHref: {
        title: intl.formatMessage(messages.LinkTo),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description'],
        allowExternals: true,
      },
      imageSide: {
        title: intl.formatMessage(messages.ImageSide),
        choices: [
          ['left', 'left'],
          ['right', 'right'],
        ],
        default: 'left',
      },
      asideTitle:{
        title: intl.formatMessage(messages.asideTitle),
      }
    },
  };
};
export default schemaHero;
