import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function BackArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
}

function ImageWithSkeleton({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="image-container">
      {!isLoaded && <div className="image-skeleton"></div>}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </div>
  );
}

function WebnovelPage() {
  const { id } = useParams();
  const [webnovel, setWebnovel] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchWebnovel = async () => {
      const data = {
        title: 'The New Order',
        coverArt: 'https://cdn.midjourney.com/884f0fa1-68fa-42c6-90d3-92f452a551aa/0_0.png',
        synopsis: 'A boy from the streets of New Tokyo and a girl from the Outer Circle. Their threads of fate intertwined.',
        chapters: [
          { id: 1, title: 'The Sky of Death', thumbnail: 'https://cdn.midjourney.com/06ae7116-7ffc-400a-a960-0965120406cb/0_3.png' },
          { id: 2, title: 'The Prodigy', thumbnail: 'https://cdn.midjourney.com/e7c6ff04-74b3-45f9-b0eb-6db7ceb92721/0_1.png' },
        ],
      };
      setWebnovel(data);
    };

    fetchWebnovel();
  }, [id]);

  if (!webnovel) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="webnovel-page">
      <div className="chapter-banner">
        <ImageWithSkeleton src={webnovel.coverArt} alt={webnovel.title} />
        <Link to="/" className="back-arrow">
          <BackArrowIcon />
        </Link>
        <h1 className="chapter-title">{webnovel.title}</h1>
      </div>
      <p className="synopsis">{webnovel.synopsis}</p>
      <ul className="chapter-list">
        {webnovel.chapters.map((chapter) => (
          <li key={chapter.id} className="chapter-item">
            <Link to={`/read/${id}/${chapter.id}`} className="chapter-link">
              <img src={chapter.thumbnail} alt={`Thumbnail for ${chapter.title}`} className="chapter-thumbnail" />
              <div className="chapter-info">
                <span className="chapter-title">{chapter.title}</span>
              </div>
              <span className="chapter-number">#{chapter.id}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WebnovelPage;