/**
 * Sponsor container.
 * @module components/Sponsors/Sponsor
 */
import React from 'react';
import PropTypes from 'prop-types';

import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * Sponsor function.
 * @function Sponsor
 * @returns {JSX.Element} Markup of the a Sponsor option.
 */
function Sponsor({ content }) {
  const sponsorId = content.id;
  const remoteUrl = content.remoteUrl;
  const title = content.title;
  const level = content.level;
  return (
    <div id={sponsorId} className={`sponsor ${level}`}>
      <a
        href={remoteUrl}
        className="link"
        title={title}
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt={content.title}
          src={flattenToAppURL(content.image.download)}
        />
      </a>
    </div>
  );
}

Sponsor.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    remoteUrl: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    image: PropTypes.shape({
      download: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Sponsor;
