import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const trackingCode = 'G-SS1TF6M8TK';

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
