import React from 'react';
import { Image } from 'semantic-ui-react';

const FixedBackground = (props) => {
  return (
    <div className="fixed-background">
      {props.image[0] && (
        <Image
          src={`${props.image[0]['@id']}/@@images/image/teaser`}
          alt={props.image[0].title}
        />
      )}
    </div>
  );
};

export default FixedBackground;
