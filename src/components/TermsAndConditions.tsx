import { useState, useEffect } from 'react';
import { baseUrl, endPoints } from '../services/utils/urls';

const TermsAndConditions = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}${endPoints.getTermsAndConditions}`)
      .then(response => response.text())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="px-3 py-4">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="px-3 py-4 d-flex justify-content-center">
      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-4" style={{maxWidth: '800px', width: '100%'}}>
        <style>
          {`
            .terms-content h2 {
              text-align: center;
              font-weight: bold;
              margin-bottom: 1rem;
            }
          `}
        </style>
        <div 
          className="fs14px text-black terms-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  );
};

export default TermsAndConditions;