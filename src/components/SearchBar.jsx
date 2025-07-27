import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onTypeFilter, selectedType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const pokemonTypes = [
    'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

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
    fairy: '#EE99AC',
    all: '#68A090'
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleTypeSelect = (type) => {
    onTypeFilter(type);
    setIsFilterOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <div className="search-input-container">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Buscar Pokémon por nombre o número..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-button" onClick={clearSearch}>
              ✕
            </button>
          )}
        </div>

        <div className="filter-container">
          <button 
            className="filter-button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{ backgroundColor: typeColors[selectedType] }}
          >
            <span className="filter-icon">🏷️</span>
            <span className="filter-text">
              {selectedType === 'all' ? 'Todos los tipos' : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            </span>
            <span className={`filter-arrow ${isFilterOpen ? 'open' : ''}`}>▼</span>
          </button>

          {isFilterOpen && (
            <div className="filter-dropdown">
              <div className="filter-grid">
                {pokemonTypes.map((type) => (
                  <button
                    key={type}
                    className={`type-button ${selectedType === type ? 'active' : ''}`}
                    style={{ backgroundColor: typeColors[type] }}
                    onClick={() => handleTypeSelect(type)}
                  >
                    <span className="type-name">
                      {type === 'all' ? 'Todos' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="search-suggestions">
        <div className="suggestion-chip" onClick={() => onSearch('pikachu')}>⚡ Pikachu</div>
        <div className="suggestion-chip" onClick={() => onSearch('charizard')}>🔥 Charizard</div>
        <div className="suggestion-chip" onClick={() => onSearch('blastoise')}>💧 Blastoise</div>
        <div className="suggestion-chip" onClick={() => onSearch('venusaur')}>🌿 Venusaur</div>
      </div>
    </div>
  );
};

export default SearchBar;