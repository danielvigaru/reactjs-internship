import React from "react";

export const LastEpisodes = ({ episodesArray }) => {
  return (
    <ul>
      {episodesArray.map((episode) => (
        <li key={episode.id}>
          <span className='info-white-text'>{`${episode.episode} - `}</span>
          {episode.name}
          <span className='info-white-text'>{` - ${episode.air_date}`}</span>
        </li>
      ))}
    </ul>
  );
};
