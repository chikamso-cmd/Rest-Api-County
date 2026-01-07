
import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
// import { Country, Region } from '../types';
import CountryCard from '../components/CountyCard';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRegion = regionFilter ? country.region === regionFilter : true;
      return matchesSearch && matchesRegion;
    });
  }, [countries, search, regionFilter]);

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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-lg opacity-60 italic">No countries found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
