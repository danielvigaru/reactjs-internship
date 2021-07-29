import React, { useEffect, useState } from "react";

export const CharacterDetails = ({ character }) => {
  const [status, setSatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [origin, setOrigin] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setSatus(character.status);
    setSpecies(character.species);
    setGender(character.gender);
    setOrigin(character.origin.name);
    setLocation(character.location.name);
  }, [character]);

  return (
    <>
      <div>
        <span className='info-white-text'>{"STATUS: "}</span>
        {status}
      </div>

      <div>
        <span className='info-white-text'>{"SPECIES: "}</span>
        {species}
      </div>

      <div>
        <span className='info-white-text'>{"GENDER: "}</span>
        {gender}
      </div>

      <div>
        <span className='info-white-text'>{"ORIGIN: "}</span>
        {origin}
      </div>

      <div>
        <span className='info-white-text'>{"LAST LOCATION: "} </span>
        {location}
      </div>
    </>
  );
};
