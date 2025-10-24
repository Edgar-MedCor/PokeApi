import React, { useState } from "react";

export default function PokemonCard({ pokemon }) {
  const [showDetails, setShowDetails] = useState(false);

  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <>
      {/* Carta */}
      <div className="relative">
        <div
          className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col items-center text-center transform transition duration-400 hover:scale-105 hover:-translate-y-2 cursor-pointer"
          onClick={() => setShowDetails(true)}
        >
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
          <p className="text-sm text-white/80">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>

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

      {/* Modal de detalles */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 rounded-3xl p-6 w-11/12 max-w-lg relative shadow-2xl border-2 border-white/20">
            {/* Botón de cerrar */}
            <button
              className="absolute top-3 right-3 text-white text-xl font-bold hover:text-gray-200 transition"
              onClick={() => setShowDetails(false)}
            >
              ✕
            </button>

            {/* Encabezado */}
            <div className="flex flex-col items-center">
              <img
                src={image}
                alt={pokemon.name}
                className="w-40 h-40 object-contain drop-shadow-2xl mb-4"
              />
              <h2 className="text-2xl font-bold capitalize text-white drop-shadow-md mb-1">
                {pokemon.name}
              </h2>
              <p className="text-white/80 mb-4">
                #{pokemon.id.toString().padStart(3, "0")}
              </p>
            </div>

            {/* Tipos */}
            <div className="flex justify-center gap-2 mb-4">
              {pokemon.types?.map((t) => (
                <span
                  key={t.type.name}
                  className="text-sm px-3 py-1 rounded-full bg-white/20 text-white font-semibold border border-white/30"
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            {/* Stats */}
            {pokemon.stats && (
              <div className="mb-4">
                <h3 className="text-white font-semibold mb-2">Stats</h3>
                <div className="space-y-1">
                  {pokemon.stats.map((s) => (
                    <div key={s.stat.name} className="flex justify-between text-white/90">
                      <span className="capitalize">{s.stat.name}</span>
                      <span className="font-bold">{s.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades */}
            {pokemon.abilities && (
              <div>
                <h3 className="text-white font-semibold mb-2">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((a) => (
                    <span
                      key={a.ability.name}
                      className="text-sm px-2 py-1 rounded-full bg-white/20 text-white font-semibold border border-white/30"
                    >
                      {a.ability.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
