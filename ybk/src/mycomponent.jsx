import React, { useRef } from 'react';

const MyComponent = () => {
  const targetRef = useRef();

  const handleClick = () => {
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={handleClick}>Scroll to the target element</button>
      <div ref={targetRef}>This is the target element</div>
    </div>
  );
};

export default MyComponent;