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

      if (typeof response === "string") {
        setHtmlContent(response);
      } else if (response?.data) {
        setHtmlContent(response.data);
      } else {
        setError("No content available");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch Privacy Policy");
    } finally {
      setLoading(false);
    }
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
