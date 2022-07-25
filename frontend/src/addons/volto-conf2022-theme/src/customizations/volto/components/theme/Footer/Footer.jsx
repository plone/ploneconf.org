/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, List, Segment, Image, Icon } from 'semantic-ui-react';

import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';
import ploneConfLogo from './Logo_ploneconf_2022_white_bg_200px.png';
import ploneSVG from './Plone-logo.svg';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  const logged_in = useSelector((state) => state.userSession.token);
  return (
    <Segment role="contentinfo" padded inverted id="footer">
      <Container>
        <Segment basic inverted className="discreet text">
          <div className="plone-logo">
            <img src={ploneSVG} alt="Plone" />
          </div>
          <FormattedMessage
            id="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
            defaultMessage="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
            values={{
              plonecms: (
                <FormattedMessage
                  id="Plone{reg} Open Source CMS/WCM"
                  defaultMessage="Plone{reg} Open Source CMS/WCM"
                  values={{ reg: <sup>®</sup> }}
                />
              ),
              copyright: (
                <abbr title={intl.formatMessage(messages.copyright)}>©</abbr>
              ),
              current_year: new Date().getFullYear(),
              plonefoundation: (
                <a className="item" href="https://plone.org/foundation">
                  <FormattedMessage
                    id="Plone Foundation"
                    defaultMessage="Plone Foundation"
                  />
                </a>
              ),
            }}
          />{' '}
          <FormattedMessage
            id="Distributed under the {license}."
            defaultMessage="Distributed under the {license}."
            values={{
              license: (
                <a
                  className="item"
                  href="http://creativecommons.org/licenses/GPL/2.0/"
                >
                  <FormattedMessage
                    id="GNU GPL license"
                    defaultMessage="GNU GPL license"
                  />
                </a>
              ),
            }}
          />
        </Segment>
        <Image src={ploneConfLogo} className="logo" />
        <List inverted className="actions text">
          {/* wrap in div for a11y reasons: listitem role cannot be on the <a> element directly */}

          <div role="listitem" className="item">
            <UniversalLink
              className="item"
              href={
                settings.isMultilingual
                  ? `/${lang}/code-of-conduct`
                  : '/code-of-conduct'
              }
            >
              <FormattedMessage
                id="Code of Conduct"
                defaultMessage="Code of Conduct"
              />
            </UniversalLink>
          </div>
          <div role="listitem" className="item">
            <UniversalLink
              className="item"
              href={settings.isMultilingual ? `/${lang}/sitemap` : '/sitemap'}
            >
              <FormattedMessage id="Site Map" defaultMessage="Site Map" />
            </UniversalLink>
          </div>
          <div role="listitem" className="item">
            {logged_in && (
              <UniversalLink className="item" href="/logout">
                <FormattedMessage id="Logout" defaultMessage="Logout" />
              </UniversalLink>
            )}
            {!logged_in && (
              <UniversalLink className="item" href="/login">
                <FormattedMessage id="Login" defaultMessage="Login" />
              </UniversalLink>
            )}
          </div>
          <div role="listitem" className="item social-network">
            <UniversalLink
              className="item"
              href="https://www.youtube.com/c/PloneCMS"
            >
              <Icon name="youtube square" size="large" />
            </UniversalLink>
            <UniversalLink className="item" href="https://twitter.com/plone">
              <Icon name="twitter square" size="large" />
            </UniversalLink>
            <UniversalLink
              className="item"
              href="https://www.facebook.com/Plone"
            >
              <Icon name="facebook" size="large" />
            </UniversalLink>
          </div>
        </List>
      </Container>
    </Segment>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
