import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BackArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
}

// Move chapterContent outside of the component
const chapterContent = {
  1: {
    title: 'Chapter 1: The Beginning',
    thumbnail: 'https://cdn.midjourney.com/d8636298-53f0-4136-a529-0bdca883d723/0_1.png',
    content: [
      { type: 'text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { type: 'image', src: 'https://cdn.midjourney.com/9e70f61d-0434-435c-84a1-ac5c45e8bfd0/0_3.png' },
      // ... (rest of the content)
    ]
  },
  2: {
    title: 'Chapter 2: The Continuation',
    thumbnail: 'https://cdn.midjourney.com/a7ad33a7-6308-4fb5-863a-d7edc88cb79f/0_0.png',
    content: [
      { type: 'text', content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.' },
      { type: 'image', src: 'https://cdn.midjourney.com/a7ad33a7-6308-4fb5-863a-d7edc88cb79f/0_0.png' },
      // ... (rest of the content)
    ]
  },
};

function ReadingInterface() {
  const { id, chapter } = useParams();
  const [content, setContent] = useState([]);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterThumbnail, setChapterThumbnail] = useState('');
  const chapterNumber = parseInt(chapter, 10);

  useEffect(() => {
    const chapterData = chapterContent[chapter] || { title: 'Chapter Not Found', content: [], thumbnail: '' };
    setChapterTitle(chapterData.title);
    setContent(chapterData.content);
    setChapterThumbnail(chapterData.thumbnail);
  }, [chapter]);

  return (
    <div className="reading-interface">
      <div className="chapter-banner">
        <img src={chapterThumbnail} alt={chapterTitle} />
        <Link to={`/webnovel/${id}`} className="back-arrow">
          <BackArrowIcon />
        </Link>
        <h2 className="chapter-title">{chapterTitle}</h2>
      </div>
      <div className="content">
        {content.map((item, index) => (
          <div key={index}>
            {item.type === 'text' ? (
              <p className="chapter-text">{item.content}</p>
            ) : (
              <img src={item.src} alt={`Illustration ${index + 1}`} loading="lazy" />
            )}
          </div>
        ))}
      </div>
      <div className="chapter-navigation">
        {chapterNumber > 1 && (
          <Link to={`/read/${id}/${chapterNumber - 1}`} className="nav-button prev">
            Previous Chapter
          </Link>
        )}
        <Link to={`/webnovel/${id}`} className="nav-button home">
          Home
        </Link>
        {chapterNumber < Object.keys(chapterContent).length && (
          <Link to={`/read/${id}/${chapterNumber + 1}`} className="nav-button next">
            Next Chapter
          </Link>
        )}
      </div>
    </div>
  );
}

export default ReadingInterface;