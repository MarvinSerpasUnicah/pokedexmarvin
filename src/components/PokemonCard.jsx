import React, { useState } from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };

  const primaryType = pokemon.types[0].type.name;
  const cardColor = typeColors[primaryType] || '#68A090';

  const formatId = (id) => {
    return `#${id.toString().padStart(3, '0')}`;
  };

  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getStatColor = (statValue) => {
    if (statValue >= 100) return '#4CAF50';
    if (statValue >= 70) return '#FF9800';
    if (statValue >= 40) return '#FFC107';
    return '#F44336';
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="pokemon-card" style={{ '--primary-color': cardColor }}>
      <div className="card-header">
        <div className="pokemon-id">{formatId(pokemon.id)}</div>
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span 
              key={index} 
              className="type-badge"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {formatName(type.type.name)}
            </span>
          ))}
        </div>
      </div>

      <div className="pokemon-image-container">
        {!imageLoaded && (
          <div className="image-placeholder">
            <div className="loading-spinner"></div>
          </div>
        )}
        <img
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className={`pokemon-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={handleImageLoad}
        />
        <div className="image-background"></div>
      </div>

      <div className="pokemon-info">
        <h3 className="pokemon-name">{formatName(pokemon.name)}</h3>
        
        <div className="pokemon-stats-preview">
          <div className="stat-item">
            <span className="stat-label">HP</span>
            <span className="stat-value">{pokemon.stats[0].base_stat}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">ATK</span>
            <span className="stat-value">{pokemon.stats[1].base_stat}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">DEF</span>
            <span className="stat-value">{pokemon.stats[2].base_stat}</span>
          </div>
        </div>

        <button className="details-button" onClick={toggleDetails}>
          {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
          <span className={`arrow ${showDetails ? 'up' : 'down'}`}>▼</span>
        </button>

        {showDetails && (
          <div className="pokemon-details">
            <div className="detail-section">
              <h4>Estadísticas</h4>
              <div className="stats-grid">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="stat-bar-container">
                    <div className="stat-info">
                      <span className="stat-name">{stat.stat.name.replace('-', ' ')}</span>
                      <span className="stat-number">{stat.base_stat}</span>
                    </div>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill"
                        style={{ 
                          width: `${Math.min((stat.base_stat / 150) * 100, 100)}%`,
                          backgroundColor: getStatColor(stat.base_stat)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h4>Información</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Altura</span>
                  <span className="info-value">{(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Peso</span>
                  <span className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Experiencia</span>
                  <span className="info-value">{pokemon.base_experience}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Habilidades</h4>
              <div className="abilities-list">
                {pokemon.abilities.map((ability, index) => (
                  <span key={index} className="ability-badge">
                    {formatName(ability.ability.name.replace('-', ' '))}
                    {ability.is_hidden && <span className="hidden-indicator">🔒</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;