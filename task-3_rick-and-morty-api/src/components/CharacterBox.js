import React from "react";
import "../scss/characters-grid.scss";

export const CharacterBox = ({ character, imageSize }) => {
  const style = {
    height: `min(${imageSize},70vw`,
    width: `min(${imageSize},70vw`,
  };
  return (
    <div className='character-box' style={style}>
      <img src={character.image} alt='Character avatar' />
      <div className='text-bg'>
        <div className='character-box-name'>{character.name}</div>
      </div>
    </div>
  );
};
