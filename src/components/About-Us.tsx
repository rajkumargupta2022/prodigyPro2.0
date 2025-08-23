// AboutUs.tsx - Simplified version
import { useState, useEffect } from "react";
import { getRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";

function AboutUs() {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutUs();
  }, []);

  const fetchAboutUs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getRequest<any>(endPoints.getAboutUs);

      // Handle response based on type
      if (typeof response === 'string') {
        setHtmlContent(response);
      } else if (response?.success && response?.data) {
        setHtmlContent(response.data);
      } else if (response?.data) {
        setHtmlContent(response.data);
      } else {
        setError("No content available");
      }
    } catch (error) {
      console.error("Error fetching About Us:", error);
      setError("Failed to fetch About Us data");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (!htmlContent) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Parse sections
    const aboutSection = doc.querySelector('#about-prodigy-pro');
    const keyFeaturesSection = doc.querySelector('#key-features');
    const whoIsItForSection = doc.querySelector('#who-is-it-for');

    return (
      <>
        {/* About Section */}
        {aboutSection && (
          <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-4">
            <h6>{aboutSection.querySelector('h2')?.textContent}</h6>
            {Array.from(aboutSection.querySelectorAll('p')).map((para, idx) => (
              <p key={idx} className="fs14px">
                {para.textContent}
              </p>
            ))}
          </div>
        )}

        {/* Key Features Section */}
        {keyFeaturesSection && (
          <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-4">
            <h6>{keyFeaturesSection.querySelector('h2')?.textContent}</h6>
            <ul>
              {Array.from(keyFeaturesSection.querySelectorAll('li')).map((feature, idx) => (
                <li key={idx} className="fs14px" dangerouslySetInnerHTML={{ __html: feature.innerHTML }}>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Who Is It For Section */}
        {whoIsItForSection && (
          <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-4">
            <h6>{whoIsItForSection.querySelector('h2')?.textContent}</h6>
            {/* First paragraph (before ul) */}
            {whoIsItForSection.querySelector('p') && (
              <p className="fs14px">
                {whoIsItForSection.querySelector('p')?.textContent}
              </p>
            )}
            <ul>
              {Array.from(whoIsItForSection.querySelectorAll('ul li')).map((item, idx) => (
                <li key={idx} className="fs14px">
                  {item.textContent}
                </li>
              ))}
            </ul>
            {/* Remaining paragraphs (excluding the first one) */}
            {Array.from(whoIsItForSection.querySelectorAll('p'))
              .slice(1)
              .map((para, idx) => (
                <p key={idx} className="fs14px">
                  {para.textContent}
                </p>
              ))}
          </div>
        )}
      </>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
        <h2>About Us</h2>
        <hr className="fw-light text-secondary" />
        <div className="alert alert-danger">
          <p>Error: {error}</p>
          <button className="btn btn-danger" onClick={fetchAboutUs}>Try Again</button>
        </div>
      </main>
    );
  }

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>About Us</h2>
      <hr className="fw-light text-secondary" />
      {renderContent()}
    </main>
  );
}

export default AboutUs;