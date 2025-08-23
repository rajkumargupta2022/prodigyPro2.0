import React, { useEffect, useState } from "react";
import { getRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";

const PrivacyPolicyComponent: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getRequest<any>(endPoints.getPrivacyPolicy);

      if (typeof response === "string") {
        setHtmlContent(response);
      } else if (response?.success && response?.data) {
        setHtmlContent(response.data);
      } else if (response?.data) {
        setHtmlContent(response.data);
      } else {
        setError("No content available");
      }
    } catch (error) {
      console.error("Error fetching Privacy Policy:", error);
      setError("Failed to fetch Privacy Policy data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Only ONE renderSection
  const renderSection = (section: Element) => {
    if (!section) return null;

    const isContact = section.id === "contact";

    return (
      <div className="p-4 shadow-sm bg-white border-0 rounded-4 mb-4">
        <h6>{section.querySelector("h2, h1")?.textContent}</h6>

        {isContact ? (
          // Special handling for Contact section
          <>
            {Array.from(section.querySelectorAll("p")).map((para, idx) => {
              let html = para.innerHTML;

              // Make labels bold
              html = html.replace(/(Email:)/i, `<strong>$1</strong>`);
              html = html.replace(/(Website:)/i, `<strong>$1</strong>`);

              // Replace email with mailto link
              html = html.replace(
                /([\w.-]+@[\w.-]+\.\w+)/,
                `<a href="mailto:$1" class="text-blue-500 underline">$1</a>`
              );

              // Replace website with clickable link
              html = html.replace(
                /(https?:\/\/[^\s<]+)/,
                `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>`
              );

              return (
                <p
                  key={idx}
                  className="fs14px"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            })}
          </>
        ) : (
          // Normal handling for other sections
          <>
            {Array.from(section.querySelectorAll("p")).map((para, idx) => (
              <p
                key={idx}
                className="fs14px"
                dangerouslySetInnerHTML={{ __html: para.innerHTML }}
              />
            ))}

            {section.querySelector("ul") && (
              <ul>
                {Array.from(section.querySelectorAll("ul > li")).map(
                  (item, idx) => (
                    <li
                      key={idx}
                      className="fs14px"
                      dangerouslySetInnerHTML={{ __html: item.innerHTML }}
                    />
                  )
                )}
              </ul>
            )}

            {Array.from(section.querySelectorAll("section")).map(
              (subSection, subIdx) => (
                <div key={subIdx} className="ms-3 mb-3">
                  <h6 className="fs16px">
                    {subSection.querySelector("h3")?.textContent}
                  </h6>
                  <ul>
                    {Array.from(subSection.querySelectorAll("li")).map(
                      (item, itemIdx) => (
                        <li key={itemIdx} className="fs14px">
                          {item.textContent}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )
            )}
          </>
        )}
      </div>
    );
  };

  // ✅ Render content with contact separated
  const renderContent = () => {
    if (!htmlContent) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const allSections = [
      doc.querySelector("header"),
      doc.querySelector("#information-collected"),
      doc.querySelector("#use-of-information"),
      doc.querySelector("#disclosure-of-information"),
      doc.querySelector("#kyc-compliance"),
      doc.querySelector("#user-rights"),
      doc.querySelector("#data-retention"),
      doc.querySelector("#dpo"),
      doc.querySelector("#security"),
      doc.querySelector("#changes"),
      doc.querySelector("#contact"),
    ].filter((section) => section !== null);

    const contactSection = allSections.find((s) => s?.id === "contact");
    const otherSections = allSections.filter((s) => s?.id !== "contact");

    return (
      <>
        {otherSections.map((section, idx) => (
          <React.Fragment key={idx}>{renderSection(section)}</React.Fragment>
        ))}

        {contactSection && (
          <React.Fragment>{renderSection(contactSection)}</React.Fragment>
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
        <h2>Privacy Policy</h2>
        <hr className="fw-light text-secondary" />
        <div className="alert alert-danger">
          <p>Error: {error}</p>
          <button className="btn btn-danger" onClick={fetchPrivacyPolicy}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      <h2>Privacy Policy</h2>
      <hr className="fw-light text-secondary" />
      {renderContent()}
    </main>
  );
};

export default PrivacyPolicyComponent;
