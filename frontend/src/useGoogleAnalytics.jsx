import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const trackingCode = 'G-WR6JCFDL2H';

if (__CLIENT__ && trackingCode) {
  ReactGA.initialize(trackingCode, {
    debug: __DEVELOPMENT__ ?? false,
    gaOptions: {
      anonymizeIp: true,
    },
  });
}

const useGoogleAnalytics = () => {
  let location = useLocation();

  useEffect(() => {
    ReactGA.send('pageview');
  }, [location]);
};

export { useGoogleAnalytics };

export default (config) => config;
