import React, { useEffect, useState } from "react";
import { getRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";

interface PrivacyPolicyResponse {
  success?: boolean;
  data?: string;
}

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

    const response = await getRequest<PrivacyPolicyResponse>(endPoints.getPrivacyPolicy);

    let html = "";

    if (typeof response === "string") {
      html = response;
    } else if (response?.data) {
      html = response.data;
    }

    // 👇 convert headings
    html = convertHeadings(html);

    setHtmlContent(html);
  } catch (err) {
    console.log(err);
    setError("Failed to fetch Privacy Policy");
  } finally {
    setLoading(false);
  }
};

  const convertHeadings = (html: string) => {
  return html
    .replace(/<h3>/g, "<h4>")
    .replace(/<\/h3>/g, "</h4>")
    .replace(/<h2>/g, "<h3>")
    .replace(/<\/h2>/g, "</h3>")
    .replace(/<h1>/g, "<h2>")
    .replace(/<\/h1>/g, "</h2>");
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="col-md-9 ms-sm-auto col-lg-9 px-md-4 py-4">
      {/* <h2>Privacy Policy</h2>
      <hr className="fw-light text-secondary" /> */}

      {/* 🔥 render the HTML exactly as backend gives it */}
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </main>
  );
};

export default PrivacyPolicyComponent;
