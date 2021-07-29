import React, { useEffect, useState } from "react";
import { CharacterBox } from "./components/CharacterBox";
import { CharacterInfoPage } from "./components/CharacterInfoPage";
import { PageNavigation } from "./components/PageNavigation";
import "./scss/RickAndMorty.scss";

export const RickAndMorty = () => {
  const [apiReqPageNumber, setApiReqPageNumber] = useState(1);
  const [charactersArray, setCharactersArray] = useState([]);
  const [isOpenCharacterInfo, setIsOpenCharacterInfo] = useState(false);
  const [characterId, setCharacterId] = useState(0);
  const [apiReqMaxPageNumber, setApiReqMaxPageNumber] = useState();

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${apiReqPageNumber}`)
      .then((response) => response.json())
      .then((json) => {
        setApiReqMaxPageNumber(json.info.pages);
        setCharactersArray(json.results);
      });
  }, [apiReqPageNumber]);

  return (
    <>
      {isOpenCharacterInfo ? (
        <CharacterInfoPage
          characterId={characterId}
          setIsOpenCharacterInfo={setIsOpenCharacterInfo}
        />
      ) : (
        <>
          <h1>Rick And Morty Characters</h1>
          <PageNavigation
            apiReqPageNumber={apiReqPageNumber}
            setApiReqPageNumber={setApiReqPageNumber}
            apiReqMaxPageNumber={apiReqMaxPageNumber}
          />
          <div className='grid-container'>
            {charactersArray.map((character) => (
              <div
                onClick={() => {
                  setIsOpenCharacterInfo(true);
                  setCharacterId(character.id);
                }}
                key={character.id}
              >
                <CharacterBox character={character} imageSize='150px' />
              </div>
            ))}
          </div>
          <PageNavigation
            apiReqPageNumber={apiReqPageNumber}
            setApiReqPageNumber={setApiReqPageNumber}
            apiReqMaxPageNumber={apiReqMaxPageNumber}
          />
          <br />
        </>
      )}
    </>
  );
};
