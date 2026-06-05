import React from 'react';
import { SparklesIcon } from './Icons';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-pulse">
        <SparklesIcon size={20} className="loader-sparkle" />
      </div>
      <div className="loader-text-wrapper">
        <span className="loader-text">Analyzing vibe</span>
        <span className="loader-dots">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </div>
    </div>
  );
}