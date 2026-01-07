import React from "react";
import { Link } from "react-router-dom";
// import { Country } from "../types";

// interface CountryCardProps {
//   country: Country;
// }

const CountryCard = ({ country }) => {
  return (
    <Link
      to={`/country/${country.cca3}`}
      className="bg-white dark:bg-dark-blue rounded-md overflow-hidden custom-shadow hover:scale-[1.02] transition-transform duration-200"
    >
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
