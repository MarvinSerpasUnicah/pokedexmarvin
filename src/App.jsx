import React, { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    filterPokemon();
  }, [pokemon, searchTerm, selectedType]);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          return await pokemonResponse.json();
        })
      );
      
      setPokemon(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPokemon = () => {
    let filtered = pokemon;

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(p => 
        p.types.some(type => type.type.name === selectedType)
      );
    }

    setFilteredPokemon(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  if (loading) {
    return (
      <div className="app">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <SearchBar 
        onSearch={handleSearch}
        onTypeFilter={handleTypeFilter}
        selectedType={selectedType}
      />
      
      <div className="pokemon-stats">
        <div className="stats-card">
          <span className="stats-number">{filteredPokemon.length}</span>
          <span className="stats-label">Pokémon encontrados</span>
        </div>
      </div>

      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {filteredPokemon.length === 0 && !loading && (
        <div className="no-results">
          <div className="no-results-content">
            <div className="no-results-icon">🔍</div>
            <h3>No se encontraron Pokémon</h3>
            <p>Intenta con otro término de búsqueda o filtro</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;