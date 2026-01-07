
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// import { Country } from '../types';

const DetailPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetail = async () => {
      if (!code) return;
      try {
        setLoading(true);
        // Fetch detailed country info
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!response.ok) throw new Error('Country not found');
        const data = await response.json();
        const mainCountry = data[0];
        setCountry(mainCountry);

        // Fetch border full names if they exist
        if (mainCountry.borders && mainCountry.borders.length > 0) {
          const bordersResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${mainCountry.borders.join(',')}`
          );
          if (bordersResponse.ok) {
            const bordersData = await bordersResponse.json();
            setBorderCountries(
              bordersData.map((c) => ({
                name: c.name.common,
                cca3: c.cca3,
              }))
            );
          }
        } else {
          setBorderCountries([]);
        }
      } catch (err) {
        setError('Error loading country details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetail();
  }, [code]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-blue dark:border-white"></div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-bold">{error || 'Country not found'}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center gap-2 bg-white dark:bg-dark-blue custom-shadow px-6 py-2 rounded-md hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={18} />
          <span>Go back</span>
        </button>
      </div>
    );
  }

  // Fix: Property 'common' does not exist on type 'unknown' by casting the result of Object.values
  const nativeName = country.name.nativeName 
    ? (Object.values(country.name.nativeName)[0]).common 
    : country.name.common;
    
  // Fix: Property 'name' does not exist on type 'unknown' by casting the result of Object.values
  const currencies = country.currencies 
    ? (Object.values(country.currencies)).map(c => c.name).join(', ')
    : 'N/A';
    
  const languages = country.languages 
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  return (
    <div className="space-y-16 lg:space-y-20">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-white dark:bg-dark-blue custom-shadow px-8 py-2.5 rounded-md hover:opacity-80 transition-opacity text-sm font-semibold"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
        {/* Flag Container */}
        <div className="w-full lg:w-1/2">
          <img 
            src={country.flags.svg} 
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-auto object-contain custom-shadow rounded-sm"
          />
        </div>

        {/* Info Container */}
        <div className="w-full lg:w-1/2 py-4">
          <h1 className="text-2xl lg:text-3xl font-extrabold mb-8">{country.name.common}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
            <div className="space-y-3 text-sm lg:text-base">
              <p><span className="font-bold">Native Name:</span> <span className="font-light">{nativeName}</span></p>
              <p><span className="font-bold">Population:</span> <span className="font-light">{country.population.toLocaleString()}</span></p>
              <p><span className="font-bold">Region:</span> <span className="font-light">{country.region}</span></p>
              <p><span className="font-bold">Sub Region:</span> <span className="font-light">{country.subregion || 'N/A'}</span></p>
              <p><span className="font-bold">Capital:</span> <span className="font-light">{country.capital?.[0] || 'N/A'}</span></p>
            </div>
            
            <div className="space-y-3 text-sm lg:text-base">
              <p><span className="font-bold">Top Level Domain:</span> <span className="font-light">{country.tld?.[0] || 'N/A'}</span></p>
              <p><span className="font-bold">Currencies:</span> <span className="font-light">{currencies}</span></p>
              <p><span className="font-bold">Languages:</span> <span className="font-light">{languages}</span></p>
            </div>
          </div>

          {/* Borders */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-baseline">
            <span className="font-bold text-sm lg:text-base whitespace-nowrap">Border Countries:</span>
            <div className="flex flex-wrap gap-2">
              {borderCountries.length > 0 ? (
                borderCountries.map((border) => (
                  <Link 
                    key={border.cca3}
                    to={`/country/${border.cca3}`}
                    className="bg-white dark:bg-dark-blue custom-shadow px-6 py-1 rounded-sm text-xs sm:text-sm font-light hover:opacity-70 transition-opacity border border-transparent dark:border-very-dark-blue-bg"
                  >
                    {border.name}
                  </Link>
                ))
              ) : (
                <span className="text-sm font-light italic">None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
