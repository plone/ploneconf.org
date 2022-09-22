import React from 'react';

const loadNucliaSearch = (callback, widgetId) => {
  const scriptSrc = `https://cdn.nuclia.cloud/nuclia-widget.umd.js`;
  const existingScript = document.getElementById(widgetId);
  if (existingScript && callback) {
    callback(true);
  } else {
    if (callback) callback(false);
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.id = widgetId;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback(true);
    };
  }
};

const Body = (props) => {
  const { data } = props;
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const scriptId = 'nuclia-search-script';
    loadNucliaSearch(setLoaded, scriptId);
    return () => {
      const script = document.getElementById(scriptId);
      if (script) script.remove();
    };
  }, []);

  return (
    <div id={'nuclia-search-wrapper'}>
      {loaded && (
        <nuclia-search
          knowledgebox={data.knowledgebox}
          zone={data.zone}
          widgetid="dashboard"
          type="form"
        ></nuclia-search>
      )}
    </div>
  );
};

export default Body;
