import React from 'react';

const Layer = ({ children, className, style }) => {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        transform: `translateZ(${style.zIndex}px) scale(${style.scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Layer;
