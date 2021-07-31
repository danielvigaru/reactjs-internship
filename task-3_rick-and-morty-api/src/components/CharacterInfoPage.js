import React, { useEffect, useState } from "react";
import { CharacterBox } from "./CharacterBox";
import { LastEpisodes } from "./LastEpisodes";
import { CharacterDetails } from "./CharacterDetails";
import "../scss/RickAndMorty.scss";
import "../scss/components/info-page.scss";

const characterObjPlaceholder = {
  name: "<name>",
  species: "<species>",
  gender: "<gender>",
  origin: { name: "<origin location>" },
  location: { name: "<last known location>" },
  episode: [""],
};

export const CharacterInfoPage = ({ characterId, setIsOpenCharacterInfo }) => {
  const [characterObj, setCharacterObj] = useState(characterObjPlaceholder);
  const [episodesArray, setEpisodesArray] = useState([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => response.json())
      .then((characterInfo) => setCharacterObj(characterInfo));
  }, [characterId]);

  useEffect(() => {
    // get the episodes in which the character is present,
    // keep the last 'numberOfEpisodesToShow' episodes,
    // reorder them from latest to oldest
    const episodesUrlArray = characterObj.episode.slice(-5).reverse();
    episodesUrlArray.forEach((url) => {
      fetch(url)
        .then((response) => response.json())
        .then((episodeObj) =>
          setEpisodesArray((episodesArray) => [...episodesArray, episodeObj])
        );
    });
  }, [characterObj]);

  return (
    <>
      <h1>About {characterObj.name}</h1>
      <span
        className='back-button'
        onClick={() => setIsOpenCharacterInfo(false)}
      >
        <h3>{"<< Back"}</h3>
      </span>
      <div className='info-grid-container'>
        <div className='character-info-panel'>
          <CharacterBox character={characterObj} imageSize='300px' />
          <div>
            <CharacterDetails character={characterObj} />
          </div>
        </div>
        <div className='episode-info'>
          <h3>Latest 5 episodes with this character:</h3>
          <LastEpisodes episodesArray={episodesArray} />
        </div>
      </div>
    </>
  );
};
