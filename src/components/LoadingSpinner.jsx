import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="pokeball-loader">
          <div className="pokeball-loader-top"></div>
          <div className="pokeball-loader-middle">
            <div className="pokeball-loader-center"></div>
          </div>
          <div className="pokeball-loader-bottom"></div>
        </div>
        
        <div className="loading-text">
          <h2>Cargando Pokémon...</h2>
          <p>Preparando tu Pokédex</p>
        </div>
        
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        
        <div className="floating-pokemon">
          <div className="floating-icon icon-1">⚡</div>
          <div className="floating-icon icon-2">🔥</div>
          <div className="floating-icon icon-3">💧</div>
          <div className="floating-icon icon-4">🌿</div>
          <div className="floating-icon icon-5">🌟</div>
          <div className="floating-icon icon-6">❄️</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;