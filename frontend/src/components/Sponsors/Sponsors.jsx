/**
 * Sponsors container.
 * @module components/Sponsors/Sponsors
 */
import React, { useEffect } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { listSponsors } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import SponsorLevel from './SponsorLevel';

/**
 * Sponsor function.
 * @function Sponsors
 * @returns {JSX.Element} Markup of the a Sponsor option.
 */
function Sponsors({ content }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.sponsors.loading);
  const levels = useSelector((state) => state.sponsors.levels);

  useEffect(() => {
    dispatch(listSponsors());
  }, [dispatch]);

  return (
    <div className="sponsors">
      <div className="wrapper-aside text">
        <h2 className="aside-title">
          <FormattedMessage id="Sponsors" defaultMessage="Sponsors" />
        </h2>
      </div>
      {!loading &&
        levels &&
        levels.map(function (sponsorLevel, i) {
          return (
            <SponsorLevel
              levelId={sponsorLevel.id}
              title={sponsorLevel.title}
              sponsors={sponsorLevel.items}
              key={i}
            />
          );
        })}
    </div>
  );
}

export default injectIntl(Sponsors);
