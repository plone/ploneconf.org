/**
 * SponsorLevel container.
 * @module components/Sponsors/SponsorLevel
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import Sponsor from './Sponsor';
import { FormattedMessage, injectIntl } from 'react-intl';
import bronzeSponsor from './bronzeSponsor.svg';
import silverSponsor from './silverSponsor.svg';
import goldSponsor from './goldSponsor.svg';
import patron from './patron.svg';

/**
 * SponsorLevel function.
 * @function SponsorLevel
 * @returns {JSX.Element} Markup of the a SponsorLevel option.
 */
function SponsorLevel({ levelId, title, sponsors }) {
  const iconSponsor = {
    diamond: null,
    platinum: null,
    gold: goldSponsor,
    silver: silverSponsor,
    bronze: bronzeSponsor,
    supporting: null,
    oss: null,
    patron: patron,
    organizer: null,
  };

  console.log(
    '🚀 ~ file: SponsorLevel.jsx ~ line 16 ~ SponsorLevel ~ levelId',
    levelId,
  );
  return (
    <Container id={levelId} className="sponsorLevel">
      <h3>
        {levelId === 'patron' && (
          <FormattedMessage id="Under the" defaultMessage="Under the" />
        )}{' '}
        <span className="sponsor_title">{title}</span>{' '}
        {levelId !== 'organizer' && levelId !== 'patron' && (
          <FormattedMessage id="Sponsor" defaultMessage="Sponsor" />
        )}
        {levelId === 'patron' && (
          <FormattedMessage id="of" defaultMessage="of" />
        )}
      </h3>
      <Container className="sponsorList">
        <div className="sponsor_icon">
          {iconSponsor[levelId] && (
            <img src={iconSponsor[levelId]} alt={title} />
          )}
        </div>
        {sponsors &&
          sponsors.map(function (sponsor, i) {
            return <Sponsor content={sponsor} key={i} />;
          })}
      </Container>
    </Container>
  );
}

SponsorLevel.propTypes = {
  levelId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sponsors: PropTypes.array.isRequired,
};

export default injectIntl(SponsorLevel);
