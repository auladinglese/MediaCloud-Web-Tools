import PropTypes from 'prop-types';
import React from 'react';

const DEFAULT_WIDTH = 67.5;
const DEFAULT_HEIGHT = 74.746;
const SCALE = DEFAULT_WIDTH / DEFAULT_HEIGHT;

const MediaSourceIcon = (props) => {
  const height = props.height || DEFAULT_HEIGHT;
  const width = height * SCALE;
  return (
    <div className="app-icon app-icon-large app-icon-media-source">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width={`${width}px`} height={`${height}px`} viewBox="0 0 67.5 74.746" enableBackground="new 0 0 67.5 74.746" xmlSpace="preserve">
        <g>
          <path d="M62.225,19.685H40.907c-0.214-1.897-1.164-3.575-2.562-4.735L53.219,2.284L51.274,0L35.427,13.494 c-0.539-0.129-1.099-0.205-1.677-0.205c-1.233,0-2.396,0.312-3.412,0.861L22.976,2.908l-2.51,1.644l7.573,11.565 c-0.778,1.013-1.297,2.234-1.447,3.568H5.276c-2.909,0-5.275,2.468-5.275,5.5l0,39.916c0,3.032,2.367,5.5,5.275,5.5h0.729v0.646 c0,1.93,1.57,3.5,3.5,3.5h1.059c1.93,0,3.5-1.57,3.5-3.5v-0.646h39.374v0.646c0,1.93,1.57,3.5,3.5,3.5h1.058 c1.93,0,3.5-1.57,3.5-3.5v-0.646h0.73c2.909,0,5.275-2.468,5.275-5.5V25.185C67.5,22.152,65.134,19.685,62.225,19.685z  M33.75,16.289c2.041,0,3.744,1.463,4.123,3.396h-8.248C30.004,17.752,31.708,16.289,33.75,16.289z M11.063,71.246 c0,0.275-0.225,0.5-0.5,0.5H9.504c-0.275,0-0.5-0.225-0.5-0.5v-0.646h2.058V71.246z M11.063,67.601H9.005h-1.5H5.275 c-1.255,0-2.275-1.121-2.275-2.5l0-39.916c0-1.379,1.021-2.5,2.275-2.5H46.28v44.916H11.063z M57.995,71.746h-1.058 c-0.275,0-0.5-0.225-0.5-0.5v-0.646h2.058v0.646C58.495,71.521,58.27,71.746,57.995,71.746z M64.5,65.101 c0,1.379-1.021,2.5-2.275,2.5h-2.23h-1.5h-2.058H49.28V22.685h12.945c1.255,0,2.275,1.121,2.275,2.5V65.101z" />
          <path d="M56.68,27.672c-2.906,0-5.271,2.364-5.271,5.271s2.365,5.271,5.271,5.271s5.271-2.365,5.271-5.271 S59.586,27.672,56.68,27.672z M56.68,35.214c-1.253,0-2.271-1.019-2.271-2.271c0-1.252,1.019-2.271,2.271-2.271 c1.252,0,2.271,1.019,2.271,2.271C58.951,34.195,57.932,35.214,56.68,35.214z" />
          <path d="M56.68,40.661c-2.906,0-5.271,2.364-5.271,5.271s2.365,5.271,5.271,5.271s5.271-2.364,5.271-5.271 S59.586,40.661,56.68,40.661z M56.68,48.202c-1.253,0-2.271-1.019-2.271-2.271s1.019-2.271,2.271-2.271 c1.252,0,2.271,1.019,2.271,2.271S57.932,48.202,56.68,48.202z" />
          <rect x="57.916" y="53.955" width="3.758" height="3.758" />
          <rect x="52.246" y="53.955" width="3.757" height="3.759" />
        </g>
      </svg>
    </div>
  );
};

MediaSourceIcon.propTypes = {
  height: PropTypes.number,
};

export default MediaSourceIcon;
