import CTAEdit from './CTA/Edit';
import CTAView from './CTA/View';

import SponsorsEdit from './Sponsors/Edit';
import SponsorsView from './Sponsors/View';

import PayPalEdit from './PayPal/Edit';
import PayPalView from './PayPal/View';

import TiToEdit from './TiTo/Edit';
import TiToView from './TiTo/View';

import sliderSVG from '@plone/volto/icons/slider.svg';
import listBulletSVG from '@plone/volto/icons/list-bullet.svg';

export const customBlocks = {
  cta: {
    id: 'cta',
    title: 'CTA',
    icon: sliderSVG,
    group: 'common',
    view: CTAView,
    edit: CTAEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  sponsorsList: {
    id: 'sponsorsList',
    title: 'Sponsors',
    icon: listBulletSVG,
    group: 'text',
    view: SponsorsEdit,
    edit: SponsorsView,
    restricted: false,
    mostUsed: false,
    sidebarTab: 0,
    security: {
      addPermission: [],
      view: [],
    },
  },
  paypalBlock: {
    id: 'paypalBlock',
    title: 'PayPal',
    icon: listBulletSVG,
    group: 'text',
    view: PayPalView,
    edit: PayPalEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 0,
    security: {
      addPermission: [],
      view: [],
    },
  },
  tito: {
    id: 'tito',
    title: 'TiTo',
    icon: sliderSVG,
    group: 'common',
    view: TiToView,
    edit: TiToView,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};
