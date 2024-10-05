import React, { useState } from 'react';

function UploadWebnovel() {
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [coverArt, setCoverArt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitting:', { title, synopsis, coverArt });
    // Reset form or redirect user after successful upload
  };

  return (
    <div className="upload-webnovel">
      <h2>Upload Your Webnovel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Webnovel Title"
          required
        />
        <textarea
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          placeholder="Synopsis"
          required
        />
        <input
          type="file"
          onChange={(e) => setCoverArt(e.target.files[0])}
          accept="image/*"
          required
        />
        <button type="submit">Upload Webnovel</button>
      </form>
    </div>
  );
}

export default UploadWebnovel;
