import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  subtitle: {
    id: 'Subtitle',
    defaultMessage: 'Subtitle',
  },
  content: {
    id: 'Content',
    defaultMessage: 'Content',
  },
  asideTitle: {
    id: 'Aside title',
    defaultMessage: 'Aside title',
  },
  asideColor: {
    id: 'Aside color',
    defaultMessage: 'Aside color',
  },
  align: {
    id: 'Align',
    defaultMessage: 'Align',
  },
  link: {
    id: 'Link',
    defaultMessage: 'Link',
  },
  linkTitle: {
    id: 'Link title',
    defaultMessage: 'Link Title',
  },
  linkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
});

const ASIDE_COLORS = [
  { name: 'white', label: 'White' },
  { name: 'blue', label: 'Blue' },
  { name: 'grey', label: 'Grey' },
  { name: 'black', label: 'Black' },
];

const schemaVenue = ({ intl }) => {
  return {
    title: 'Block settings',
    required: [],
    fieldsets: [
      {
        id: 'default',
        title: 'default',
        fields: [
          'asideTitle',
          'asideColor',
          'title',
          'subtitle',
          'content',
          'align',
        ],
      },
      {
        id: 'link',
        title: intl.formatMessage(messages.link),
        fields: ['linkTitle', 'linkHref'],
      },
    ],
    properties: {
      asideTitle: {
        title: intl.formatMessage(messages.asideTitle),
      },
      asideColor: {
        title: intl.formatMessage(messages.asideColor),
        widget: 'color_picker',
        colors: ASIDE_COLORS,
      },
      title: {
        title: intl.formatMessage(messages.title),
      },
      subtitle: {
        title: intl.formatMessage(messages.subtitle),
        widget: 'textarea',
      },
      content: {
        title: intl.formatMessage(messages.content),
        widget: 'richtext',
      },
      align: {
        title: intl.formatMessage(messages.align),
        widget: 'align',
        actions: ['left', 'right', 'full'],
      },
      linkTitle: {
        title: intl.formatMessage(messages.linkTitle),
      },
      linkHref: {
        title: intl.formatMessage(messages.linkTo),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description'],
        allowExternals: true,
      },
    },
  };
};
export default schemaVenue;
