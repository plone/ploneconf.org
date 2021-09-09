/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';

import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  siteTitle: {
    id: 'Plone Conference',
    defaultMessage: 'Plone Conference',
  },
});

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = () => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  const intl = useIntl();

  return (
    <Link
      to={settings.isMultilingual ? `/${lang}` : '/'}
      title={intl.formatMessage(messages.home)}
    >
      <Image
        src={LogoImage}
        alt={intl.formatMessage(messages.siteTitle)}
        title={intl.formatMessage(messages.siteTitle)}
        height={50}
      />
    </Link>
  );
};

export default Logo;
