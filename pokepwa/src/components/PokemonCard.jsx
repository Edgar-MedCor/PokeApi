import React from "react";

export default function PokemonCard({ pokemon }) {
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <div className="relative">
      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col items-center text-center transform transition duration-400 hover:scale-105 hover:-translate-y-2">
        <div className="w-28 h-28 flex items-center justify-center">
          <img
            src={image}
            alt={pokemon.name}
            className="w-24 h-24 object-contain drop-shadow-2xl animate-fade-in"
          />
        </div>

        <h3 className="capitalize mt-3 text-lg font-bold text-yellow-200">
          {pokemon.name}
        </h3>
        <p className="text-sm text-white/80">#{pokemon.id.toString().padStart(3, "0")}</p>

        <div className="mt-3 flex gap-2">
          {pokemon.types?.map((t) => (
            <span
              key={t.type.name}
              className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 text-white/90"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
