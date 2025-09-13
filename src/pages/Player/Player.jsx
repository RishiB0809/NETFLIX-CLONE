import React, { useEffect, useState } from 'react'
import'./Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""

  });

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmQ4MzAzZDEwOGEwOTU1OTExMmIyNTRjNGM4YzU0YSIsIm5iZiI6MTc1Njk2OTY3OC40Miwic3ViIjoiNjhiOTNhY2UzYzJiMTYyYmEyMWYzZTlmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cjq5GHf1YewOfuaU0qbBhxA4fI8Itv0UPPFlqnzlOew'
  }
};

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
}, [])



  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() =>{navigate(-2)}} />
      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player