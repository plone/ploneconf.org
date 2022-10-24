import React from 'react';

const loadNucliaSearch = (callback, widgetId) => {
  const scriptSrc = `https://cdn.nuclia.cloud/nuclia-video-widget.umd.js`;
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
    <div className="nuclia-block">
      <div className="wrapper-aside text">
        <h2 className="aside-title">{data.title}</h2>
      </div>
      <div id={'nuclia-search-wrapper'}>
        <p>
          Search inside the videos from
          <strong>Plone Conferences 2022, 2021 and 2020</strong> and jump
          directly to the relevant part of that talk
        </p>
        {loaded && (
          <>
            <nuclia-search-bar
              knowledgebox={data.knowledgebox}
              zone={data.zone}
              widgetid="dashboard"
              placeholder="Search for PloneConf videos"
              lang="en"
            ></nuclia-search-bar>
            <nuclia-search-results></nuclia-search-results>
          </>
        )}
      </div>
    </div>
  );
};

export default Body;
