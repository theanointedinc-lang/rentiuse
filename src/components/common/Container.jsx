import React from 'react';

export default function Container({
  children,
  narrow = false,
  className = '',
  style = {},
  as: Component = 'div',
  ...props
}) {
  const containerClass = narrow ? 'container-narrow' : 'container';

  return (
    <Component className={`${containerClass} ${className}`} style={style} {...props}>
      {children}
    </Component>
  );
}
