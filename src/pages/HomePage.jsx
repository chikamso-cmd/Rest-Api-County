import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Search, ChevronDown, LayoutGrid, ListFilter, Heart } from 'lucide-react';
import CountryCard from '../components/CountyCard';
import { useFavorites } from '../context/FavoritesContext';

const ITEMS_PER_PAGE = 12;

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // New States
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isGroupedByRegion, setIsGroupedByRegion] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  
  const { isFavorite } = useFavorites();
  const observer = useRef();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3');
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError('Error fetching country data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, regionFilter, showFavoritesOnly, isGroupedByRegion]);

  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prevVisibleCount => prevVisibleCount + ITEMS_PER_PAGE);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRegion = regionFilter ? country.region === regionFilter : true;
      const matchesFavorites = showFavoritesOnly ? isFavorite(country.cca3) : true;
      return matchesSearch && matchesRegion && matchesFavorites;
    });
  }, [countries, search, regionFilter, showFavoritesOnly, isFavorite]);

  const groupedCountries = useMemo(() => {
    if (!isGroupedByRegion) return null;
    return filteredCountries.reduce((acc, country) => {
      const region = country.region;
      if (!acc[region]) acc[region] = [];
      acc[region].push(country);
      return acc;
    }, {});
  }, [filteredCountries, isGroupedByRegion]);

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-blue dark:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-8 sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
            <Search size={18} className="text-dark-gray dark:text-white" />
          </div>
          <input
            type="text"
            placeholder="Search for a country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-dark-blue custom-shadow py-4 pl-16 pr-6 rounded-md focus:outline-none text-sm placeholder:text-dark-gray dark:placeholder:text-white"
          />
        </div>

        {/* Region Filter & Toggles */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Favorites Toggle */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-6 py-4 rounded-md custom-shadow text-sm font-semibold transition-all duration-200 ${
              showFavoritesOnly 
                ? 'bg-red-500 text-white' 
                : 'bg-white dark:bg-dark-blue'
            }`}
          >
            <Heart size={16} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
            <span className="hidden sm:inline">Favorites</span>
          </button>

          {/* Grouping Toggle */}
          <button
            onClick={() => setIsGroupedByRegion(!isGroupedByRegion)}
            className={`flex items-center gap-2 px-6 py-4 rounded-md custom-shadow text-sm font-semibold transition-all duration-200 ${
              isGroupedByRegion 
                ? 'bg-blue-500 text-white' 
                : 'bg-white dark:bg-dark-blue'
            }`}
          >
            {isGroupedByRegion ? <LayoutGrid size={16} /> : <ListFilter size={16} />}
            <span className="hidden sm:inline">{isGroupedByRegion ? 'Ungroup' : 'Group by Region'}</span>
          </button>

          {/* Region Filter */}
          <div className="relative w-48 sm:w-52">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white dark:bg-dark-blue custom-shadow px-6 py-4 rounded-md flex items-center justify-between text-sm font-semibold focus:outline-none"
            >
              <span>{regionFilter || 'Filter by Region'}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-dark-blue custom-shadow rounded-md py-4 z-10 animate-in fade-in zoom-in duration-200">
                <button
                  onClick={() => { setRegionFilter(''); setIsDropdownOpen(false); }}
                  className="w-full text-left px-6 py-1 hover:bg-very-light-gray-bg dark:hover:bg-very-dark-blue-bg text-sm font-semibold transition-colors"
                >
                  All Regions
                </button>
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => { setRegionFilter(region); setIsDropdownOpen(false); }}
                    className="w-full text-left px-6 py-1 hover:bg-very-light-gray-bg dark:hover:bg-very-dark-blue-bg text-sm font-semibold transition-colors"
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      {isGroupedByRegion ? (
        <div className="space-y-16">
          {Object.entries(groupedCountries).map(([region, regionCountries]) => (
            <div key={region} className="space-y-8">
              <h3 className="text-2xl font-extrabold pb-2 border-b-2 border-dark-gray/20">
                {region} <span className="text-sm font-normal opacity-60">({regionCountries.length} countries)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
                {regionCountries.map((country) => (
                  <CountryCard key={country.cca3} country={country} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
            {filteredCountries.length > 0 ? (
              filteredCountries.slice(0, visibleCount).map((country, index) => {
                const isLastElement = index === visibleCount - 1 || index === filteredCountries.length - 1;
                return (
                  <div key={country.cca3} ref={isLastElement ? lastElementRef : null}>
                    <CountryCard country={country} />
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-lg opacity-60 italic">No countries found matching your criteria.</p>
              </div>
            )}
          </div>
          
          {visibleCount < filteredCountries.length && !loading && (
            <div className="flex justify-center py-10">
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-dark-gray rounded-full"></div>
                <div className="h-2 w-2 bg-dark-gray rounded-full"></div>
                <div className="h-2 w-2 bg-dark-gray rounded-full"></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
