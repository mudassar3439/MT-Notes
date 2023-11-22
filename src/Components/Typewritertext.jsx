import React from 'react';
import PropTypes from 'prop-types';
import Typewriter from 'typewriter-effect';

function Typewritertext({ text }) {
  return (
    <div>
      <Typewriter
        options={{
          strings: [text],
          autoStart: true,
          loop: true, // Add this to enable continuous looping
          cursor: '', 
        }}
      />
    </div>
  );
}

Typewritertext.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Typewritertext;
