import React from 'react';

// Компонент використовується для відображення поточного кольору
export const ColorDot = (props: { color: string }) => {
  return (
    <div
      // Стилі для відображення кольорової точки
      style={{
        height: '10px',
        width: '10px',
        backgroundColor: props.color,
        borderRadius: '50%',
        display: 'inline-block',
      }}
    ></div>
  );
};
