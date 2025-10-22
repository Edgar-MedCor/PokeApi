import React, { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import ParticlesBackground from "./components/ParticlesBackground";



// Componente principal de la aplicación
export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState("");

  // carga inicial
  useEffect(() => {
    loadPokemons(nextUrl, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPokemons(url, initial = false) {
    if (!url) return;
    try {
      initial ? setLoading(true) : setLoadingMore(true);

      const res = await fetch(url);
      const data = await res.json();

      // trae detalle de cada pokemon para la imagen oficial
      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const r = await fetch(p.url);
          return r.json();
        })
      );

      setPokemons((prev) => (initial ? detailed : [...prev, ...detailed]));
      setNextUrl(data.next);
    } catch (err) {
      console.error("Error cargando pokemons:", err);
    } finally {
      initial ? setLoading(false) : setLoadingMore(false);
    }
  }

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      {/* Partículas: quedan detrás */}
      <ParticlesBackground />

      {/* Contenedor principal: relative y con z-index sobre las partículas */}
      <div className="relative z-10 min-h-screen px-6 py-10 flex flex-col items-center">
        <header className="w-full max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
              PokePWA
            </h1>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar Pokémon..."
                className="w-full sm:w-64 px-4 py-2 rounded-xl bg-white/10 border border-white/20 placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white"
              />
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center mt-12">
            <div className="pokeball-spinner" />
            <p className="mt-4 text-white/90">Cargando Pokémons...</p>
          </div>
        ) : (
          <main className="w-full max-w-6xl">
            {filtered.length === 0 ? (
              <p className="text-center text-white/80">No se encontró ningún Pokémon.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filtered.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            )}

            <div className="flex justify-center mt-8">
              {nextUrl ? (
                <button
                  onClick={() => loadPokemons(nextUrl)}
                  disabled={loadingMore}
                  className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition disabled:opacity-60"
                >
                  {loadingMore ? "Cargando..." : "Cargar más"}
                </button>
              ) : (
                <span className="text-white/80">Todos los Pokémon cargados</span>
              )}
            </div>
          </main>
        )}
      </div>
    </>
  );
}
