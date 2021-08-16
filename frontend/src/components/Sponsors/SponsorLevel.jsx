/**
 * SponsorLevel container.
 * @module components/Sponsors/SponsorLevel
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import Sponsor from './Sponsor';

/**
 * SponsorLevel function.
 * @function SponsorLevel
 * @returns {JSX.Element} Markup of the a SponsorLevel option.
 */
function SponsorLevel({ levelId, title, sponsors }) {
  return (
    <Container id={levelId} className="sponsorLevel">
      <h3>{title}</h3>
      <Container className="sponsorList">
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

export default SponsorLevel;
