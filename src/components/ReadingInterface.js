import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

function BackArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
}

function splitIntoParagraphs(text) {
  return text.split('\n\n').map((paragraph, index) => (
    <p key={index} className="chapter-text">{paragraph}</p>
  ));
}

function ImageWithSkeleton({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`image-container ${className}`}>
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

const staticChapterContent = {
  1: {
    title: 'The Sky of Death',
    thumbnail: 'https://cdn.midjourney.com/06ae7116-7ffc-400a-a960-0965120406cb/0_3.png',
    banner: 'https://cdn.midjourney.com/4102051c-c796-4d16-81d2-9c3f33460eac/0_1.png',
    content: [
      { type: 'image', src: 'https://cdn.midjourney.com/4102051c-c796-4d16-81d2-9c3f33460eac/0_1.png' },
      { type: 'text', content: `The orange sky was a reminder of death. The smog in New Tokyo was known for killing its citizens, making goggles and masks necessary for daily life. The boy had already lost his throat to the smog, and he was not about to lose his eyes. Usually, that would be the price of going out during the burning hours. He fastened his goggles.` },
      { type: 'image', src: 'https://cdn.midjourney.com/19e2d3d1-958d-4b68-ac1a-a22987439b00/0_3.png' },
      { type: 'text', content: `It was a bright day, but not a soul could be found outside. Shibuya-01 was completely empty. The boy neatly tucked a nondescript bag into a crevice on the floor. He did the same thing several times in different places.

"Om, shanti, shanti."` },
      { type: 'image', src: 'https://cdn.midjourney.com/06ae7116-7ffc-400a-a960-0965120406cb/0_3.png' },
      { type: 'text', content: `He recited a prayer. He tapped his goggles, which fizzled with energy, and emitted a green light indicating the communication was successfully delivered.

"Let's go home."` },
      { type: 'image', src: 'https://cdn.midjourney.com/d72cfc63-7a28-41db-bed9-ba72f8f201cb/0_1.png' },
      { type: 'text', content: `The city came alive at nighttime. After the burning hours, the children go to school, the adults go to work, and the streets begin to flood with people.

That night, however, was different. At 6:00PM sharp, an explosion triggered in Shibuya-01, killing 136 men, women, and children.` },
      { type: 'image', src: 'https://cdn.midjourney.com/ea039c8a-797f-4230-a7c5-10fc5ac5458c/0_0.png' },
    ]
  },
  2: {
    title: 'The Prodigy',
    thumbnail: 'https://cdn.midjourney.com/e7c6ff04-74b3-45f9-b0eb-6db7ceb92721/0_1.png',
    banner: 'https://cdn.midjourney.com/82f3f5cf-ee03-44d3-ada7-e7266a1c5700/0_3.png',
    content: [
      { type: 'image', src: 'https://cdn.midjourney.com/c5b71cae-d0de-463f-b165-ebd0dc041901/0_2.png' },
      { type: 'text', content: `"Excuse me, I'm looking for the Chief."

A tall, well-dressed man was holding an envelope, waiting expectantly at the front desk.

The receptionist gave him an amused look. He had seen many people come into the station and make demands, but not many who ask for the Chief directly.

"Sorry sir, the Chief is very busy right now, there's been an explosion downtown—"

The man removed his elegant smog goggles. He was clearly someone important. It wasn't easy to manufacture such aesthetically pleasing goggles that can also protect from the smog. They must have cost a fortune.

"My name is Algan Terran, the right hand of the King."

The receptionist went white. One of the Inner Circle was inside their police station? This was unheard of.

"Of course," he stammered, "let me get her."` },
      { type: 'image', src: 'https://cdn.midjourney.com/e7521b78-9eeb-4b80-aee8-84ace17336cc/0_1.png' },
      { type: 'text', content: `"Algan… Terran is here to see you Madam." The receptionist could barely deliver the news.

"He's here already is he?" Her lips were pursed. She was a beautiful girl with dark, short hair. She looked to be in her early twenties. She was wearing golden headphones.

"Let him in," she waved.

"Where is the Deputy Chief?" Terran looked annoyed. He didn't know why this girl was sitting in the Deputy Chief's chair, but he didn't have any time to waste. 136 citizens of New Tokyo were dead, and a shadow organization had declared war against the Circles. He had heard that Chief Tokozawa was on leave, and that the Deputy Chief was new blood. But to leave his post unstaffed?

"I'm right here," she looked bored. Men always underestimated her.

"Don't play games, girl!" Terran slammed his fist on the desk. "People are dead, and we need answers." A dark energy swarmed around him.

"Oh…?" She raised an eyebrow. He wasn't joking around.

"And what makes you think, I can't be Deputy Chief?"` },
      { type: 'image', src: 'https://cdn.midjourney.com/82f3f5cf-ee03-44d3-ada7-e7266a1c5700/0_3.png' },
      { type: 'text', content: `The air was instantly sucked out of the room. Algan narrowed his eyes. This girl…

"Forgive me, King of Shadows Algan Terran." A furious energy began to gather around her.

"But I don't appreciate when guests come into my house uninvited, making accusations and demands."

He raised his hand in acknowledgement. "I see, Chief Tokozawa has found an interesting apprentice."

For a moment, he sensed danger. This girl has an unfathomable power.

"136 people are dead. A note was left behind with this seal, and an organization called Shinigami is claiming responsibility." He sighed. "Eliminate them."` },
      { type: 'image', src: 'https://cdn.midjourney.com/03156334-2801-470b-9dc9-dda70750109b/0_2.png' },
    ]
  },
};

function ReadingInterface() {
  const { id, chapter } = useParams();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const chapterNumber = parseInt(chapter, 10);
  const location = useLocation();

  const fetchChapterContent = useCallback(async () => {
    const cachedContent = localStorage.getItem(`chapter_${id}_${chapter}`);
    if (cachedContent) {
      return JSON.parse(cachedContent);
    }

    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const chapterData = staticChapterContent[chapter] || { title: 'Chapter Not Found', content: [], banner: '' };
        localStorage.setItem(`chapter_${id}_${chapter}`, JSON.stringify(chapterData));
        resolve(chapterData);
      }, 1000);
    });
  }, [id, chapter]);

  useEffect(() => {
    setIsLoading(true);
    fetchChapterContent().then((chapterData) => {
      setContent(chapterData);
      setIsLoading(false);
      if (location.state && location.state.top) {
        window.scrollTo(0, 0);
      }
    });
  }, [fetchChapterContent, location]);

  if (isLoading || !content) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="reading-interface">
      <div className="chapter-banner">
        <ImageWithSkeleton src={content.banner} alt={content.title} className="banner-image" />
        <Link to={`/webnovel/${id}`} className="back-arrow">
          <BackArrowIcon />
        </Link>
        <h2 className="chapter-title">{content.title}</h2>
      </div>
      <div className="content">
        {content.content.map((item, index) => (
          <div key={index} className="content-item">
            {item.type === 'text' ? (
              splitIntoParagraphs(item.content)
            ) : (
              <ImageWithSkeleton src={item.src} alt={`Illustration ${index + 1}`} className="content-image" />
            )}
          </div>
        ))}
      </div>
      <div className="chapter-navigation">
        {chapterNumber > 1 && (
          <Link to={`/read/${id}/${chapterNumber - 1}`} state={{ top: true }} className="nav-button prev">
            Previous Chapter
          </Link>
        )}
        <Link to={`/webnovel/${id}`} className="nav-button home">
          Home
        </Link>
        {chapterNumber < Object.keys(staticChapterContent).length && (
          <Link to={`/read/${id}/${chapterNumber + 1}`} state={{ top: true }} className="nav-button next">
            Next Chapter
          </Link>
        )}
      </div>
    </div>
  );
}

export default ReadingInterface;

