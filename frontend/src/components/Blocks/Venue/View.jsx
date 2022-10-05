/**
 * Venue block.
 * @module components/manage/Blocks/Venue/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Grid, Header } from 'semantic-ui-react';
import { LinkMore } from '@plone/volto/components';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import beerSVG from '@package/icons/beer.svg';
import citadelleSVG from '@package/icons/citadelle.svg';
import snailSVG from '@package/icons/snail.svg';

/**
 * Venue View block.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  return (
    <div className="block hero venue">
      <div className={'block-inner-wrapper ' + data.align}>
        <div className="wrapper-aside text">
          {data?.align === 'left' && (
            <div
              className="aside-title"
              color={data.asideColor ? data.asideColor : 'black'}
              textAlign={'center'}
            >
              {data.asideTitle}
            </div>
          )}
        </div>
        <Grid>
          <Grid.Row>
            <Grid.Column
              width={2}
              verticalAlign={'middle'}
              textAlign={'center'}
              className="icons-wrapper"
            >
              <Icon name={beerSVG} size="75px" />
              <Icon name={citadelleSVG} size="75px" />
              <Icon name={snailSVG} size="75px" />
            </Grid.Column>
            <Grid.Column stretched width={10} className="text-wrapper">
              <div className="hero-body">
                <div className="hero-text">
                  <h3 className="title">{data.title}</h3>
                  <div className="sub-title">{data.subtitle}</div>
                  {data.content?.data && (
                    <div
                      className={cx('richtext', 'widget', 'description')}
                      dangerouslySetInnerHTML={{
                        __html: data.content.data,
                      }}
                    />
                  )}
                  <LinkMore data={data} />
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {data?.align === 'right' && (
          <Header
            as={'h2'}
            className="aside-title"
            color={data.asideColor ? data.asideColor : 'black'}
            textAlign={'center'}
            size={'huge'}
          >
            {data.asideTitle}
          </Header>
        )}
      </div>
    </div>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
