import React from 'react';
import { Link, useParams } from 'react-router-dom';

function WebnovelPage() {
  const { id } = useParams();
  // In a real app, you'd fetch the webnovel data based on the ID
  const webnovel = {
    title: 'Sample Illustrated Webnovel',
    coverArt: 'https://cdn.midjourney.com/884f0fa1-68fa-42c6-90d3-92f452a551aa/0_0.png',
    synopsis: 'An exciting journey through a world of beautiful illustrations and lorem ipsum text.',
    chapters: [
      { id: 1, title: 'The Beginning', thumbnail: 'https://cdn.midjourney.com/d8636298-53f0-4136-a529-0bdca883d723/0_1.png' },
      { id: 2, title: 'The Continuation', thumbnail: 'https://cdn.midjourney.com/a7ad33a7-6308-4fb5-863a-d7edc88cb79f/0_0.png' },
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