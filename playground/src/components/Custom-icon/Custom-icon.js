import React from 'react';
import './Custom-icon.css';

export default function CustomIcon({ name }) {
  const renderIcon = () => {
    switch (name) {
      case 'green_dot':
        return <img src="/assets/pngs/green_circle.png" />;
      case 'red_dot':
        return <img src="/assets/pngs/red_circle.png" />;
      default:
        break;
    }
  };
  return <div className="icon-detector-container">{renderIcon()}</div>;
}
