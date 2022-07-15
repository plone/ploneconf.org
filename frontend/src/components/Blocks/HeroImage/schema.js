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
  ctaLink: {
    id: 'Transform Link to CTA button',
    defaultMessage: 'Transform Link to CTA button',
  },
  ImageSide: {
    id: 'Image side',
    defaultMessage: 'Image side',
  },
  asideTitle: {
    id: 'Aside title',
    defaultMessage: 'Aside title',
  },
  ctaIcon: {
    id: 'CTA Icon',
    defaultMessage: 'CTA Icon',
  },
  ctaIconDescription: {
    id: 'Enter the name of icone from sementic ui library',
    defaultMessage: 'Enter the name of icone from sementic ui library',
  },
  alignIcon: {
    id: 'Align Icon',
    defaultMessage: 'Align Icon',
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
        fields: ['linkTitle', 'linkHref', 'ctaLink', 'ctaIcon', 'alignIcon','imageSide', 'asideTitle'],
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
      ctaLink:{
        title: intl.formatMessage(messages.ctaLink),
        type: 'boolean',
        default: false,
      },
      ctaIcon:{
        title: intl.formatMessage(messages.ctaIcon),
        description: intl.formatMessage(messages.ctaIconDescription),
      },
      alignIcon: {
        title: intl.formatMessage(messages.alignIcon),
        default: 'left',
        choices: [
          ['left', 'Left'],
          ['mid-left', 'Mid Left'],
          ['center', 'Center'],
          ['mid-right', 'Mid Right'],
          ['right', 'Right'],
        ],
      },
      imageSide: {
        title: intl.formatMessage(messages.ImageSide),
        choices: [
          ['left', 'left'],
          ['right', 'right'],
        ],
        default: 'left',
      },
      asideTitle: {
        title: intl.formatMessage(messages.asideTitle),
      },
    },
  };
};
export default schemaHero;
