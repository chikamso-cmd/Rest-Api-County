import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

const CountryCard = ({ country }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(country.cca3);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(country.cca3);
  };

  return (
    <Link
      to={`/country/${country.cca3}`}
      className="bg-white dark:bg-dark-blue rounded-md overflow-hidden custom-shadow hover:scale-[1.02] transition-transform duration-200 group relative block"
    >
      <button
        onClick={handleFavoriteToggle}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-dark-blue/80 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all duration-200"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          size={20}
          className={`transition-colors duration-200 ${
            favorite ? "fill-red-500 text-red-500" : "text-dark-gray dark:text-white"
          }`}
        />
      </button>

      <div className="aspect-[4/3] w-full">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6 pb-10">
        <h2 className="text-lg font-extrabold mb-4 line-clamp-1">
          {country.name.common}
        </h2>
        <div className="space-y-1 text-sm font-semibold">
          <p>
            <span className="font-bold">Population:</span>{" "}
            <span className="font-light">
              {country.population.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="font-bold">Region:</span>{" "}
            <span className="font-light">{country.region}</span>
          </p>
          <p>
            <span className="font-bold">Capital:</span>{" "}
            <span className="font-light">{country.capital?.[0] || "N/A"}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
