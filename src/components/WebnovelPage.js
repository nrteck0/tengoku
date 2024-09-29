import React from 'react';
import { Link, useParams } from 'react-router-dom';

function WebnovelPage() {
  const { id } = useParams();
  // In a real app, you'd fetch the webnovel data based on the ID
  const webnovel = {
    title: 'A New Order',
    coverArt: 'https://cdn.midjourney.com/884f0fa1-68fa-42c6-90d3-92f452a551aa/0_0.png',
    synopsis: 'A boy from the streets of New Tokyo and a girl from the Outer Circle. As their paths cross, what does fate have in store for them?',
    chapters: [
      { id: 1, title: 'The Sky of Death', thumbnail: 'https://cdn.midjourney.com/06ae7116-7ffc-400a-a960-0965120406cb/0_3.png' },
      { id: 2, title: 'The Prodigy', thumbnail: 'https://cdn.midjourney.com/e7c6ff04-74b3-45f9-b0eb-6db7ceb92721/0_1.png' },
      // Add more chapters as needed
    ],
  };

  return (
    <div className="webnovel-page">
      <div className="cover-art-container">
        <img src={webnovel.coverArt} alt={webnovel.title} className="cover-art" />
      </div>
      <h1 className="webnovel-title">{webnovel.title}</h1>
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