import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const WebnovelTile = ({ title, coverArt, synopsis }) => (
  <div className="webnovel-tile">
    <Link to="/webnovel/1" className="webnovel-link">
      <img src={coverArt} alt={title} className="webnovel-cover" />
      <h3 className="webnovel-title">{title}</h3>
      <div className="webnovel-synopsis">
        <p>{synopsis}</p>
      </div>
    </Link>
  </div>
);

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const dummyWebnovel = {
    id: 1,
    title: 'The New Order',
    coverArt: 'https://cdn.midjourney.com/884f0fa1-68fa-42c6-90d3-92f452a551aa/0_0.png',
    synopsis: 'A boy from the streets of New Tokyo and a girl from the Outer Circle. Their threads of fate intertwined.'
  };

  const webnovels = Array(20).fill(dummyWebnovel);

  return (
    <div className="home-page">
      <div className="chapter-banner homepage-banner">
        <img src="https://cdn.midjourney.com/c8a1631a-e326-43ca-bd5c-d21dab8c97b6/0_2.png"
          alt="Tengoku Banner"
        />
        <button className="btn logout-button" onClick={handleLogout}>Log Out</button>
        <div className="banner-content">
        <h1 className="site-title">Tengoku</h1>
        <p className="site-subtitle">Find your next favorite manga, webcomic or webnovel</p>
      </div>
      </div>
      <div className="webnovel-grid">
        {webnovels.map((webnovel, index) => (
          <WebnovelTile key={index} {...webnovel} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;