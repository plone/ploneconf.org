/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import { defineMessages, useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { UniversalLink } from '@plone/volto/components';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';

const messages = defineMessages({
  site: {
    id: 'Site',
    defaultMessage: 'Site',
  },
  plonesite: {
    id: 'Plone Site',
    defaultMessage: 'Plone Site',
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <UniversalLink
      href={settings.isMultilingual ? `/${lang}` : '/'}
      title={intl.formatMessage(messages.site)}
    >
      <div
        className={
          scrollPosition > 1
            ? 'mask-logo-sticky mask-logo'
            : 'mask-logo-initial mask-logo'
        }
      ></div>
      <Image
        src={LogoImage}
        alt={intl.formatMessage(messages.plonesite)}
        title={intl.formatMessage(messages.plonesite)}
        size="small"
      />
    </UniversalLink>
  );
};

export default Logo;
