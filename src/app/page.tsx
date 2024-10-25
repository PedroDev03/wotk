"use client";

import { useState, useEffect, ChangeEvent } from "react";
import "./page.css";
import pokelogo from "./assets/pokelogo.png";
import Image from "next/image";

interface PokemonData {
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
    front_shiny: string;
  };
}

export default function Home() {
  const [data, setData] = useState<PokemonData | null>(null);
  const [responsestatus, setResponseStatus] = useState<number>()
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonshiny, setPokemonshiny] = useState<boolean>(false);

  console.log(responsestatus) 
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setResponseStatus(response.status)

      if (response.ok) {
        const jsonData: PokemonData = await response.json();
        setData(jsonData);
      } else {
        setData(null); // Reseta se não encontrar o Pokémon
        console.error("Pokémon não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    if (pokemonName) fetchData();
  }, [pokemonName]);

  console.log("nome aqui", pokemonName);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setPokemonName(name.toLowerCase());
  };

  const typeColors: { [key: string]: string } = {
    fire: "orangered",
    water: "dodgerblue",
    grass: "green",
    flying: "gray",
    ice: "lightskyblue",
    fairy: "lightpink",
    dark: "darkslateblue",
    poison: "purple",
    ground: "brown",
    psychic: "rgb(228, 177, 185)",
    bug: "lightgreen",
    ghost: "darkorchid",
    steel: "darkgrey",
    dragon: "coral",
    rock: "darkslategrey",
    electric: "gold",
    fighting: "goldenrod",
  };

  const saberTipo = (verify: string) => {
    return typeColors[verify] || "white";
  };

  const imageshiny = data?.sprites.front_shiny;
  const actualImage = data?.sprites.front_default;
  const verify =
    data?.types?.[0]?.type?.name || data?.types?.[1]?.type?.name || "";
  const habilidade = data?.abilities?.[0]?.ability?.name || "";

  return (
    <div className="container">
      <div className="texto">Digite o nome do Pokémon desejado: </div>
      <div
        className="card"
        style={{
          backgroundColor: saberTipo(verify),
        }}
      >
        <input type="text" onChange={handleInputChange} />
        {pokemonName.length <= 0  || responsestatus !== 200  ? (
          <>
            <Image alt="poke" src={pokelogo} />
          </>
        ) : (
          <>
            <div className="header-card">
              <div className="input-area">
                
                <div className="tipo">
                  Tipo:{" "}
                  {data && data.types && data.types.length > 0
                    ? data.types[0].type.name
                    : data && data.types && data.types.length > 1
                    ? data.types[1].type.name
                    : ""}
                </div>
              </div>

              <img
                alt={pokemonshiny ? "Shiny" : "Normal"}
                src={pokemonshiny ? imageshiny : actualImage}
                onClick={() => setPokemonshiny(!pokemonshiny)}
              />
            </div>

            <div className="card-info">
              {pokemonshiny && data ? (
                <div className="aviso-shiny">shiny</div>
              ) : (
                ""
              )}
              <p>Nome: {data ? data.name : "  ..."}</p>
              <p>
                altura:{" "}
                {data && data.height ? data.height / 10 + " m" : "  ..."}
              </p>
              <p>
                peso: {data && data.weight ? data.weight / 10 + " kg" : "  ..."}
              </p>
              <p>habilidade: {data && habilidade ? habilidade : "..."}</p>
              {/* Exibindo os tipos do Pokémon */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
