import React from "react";
import { ChevronRight } from "react-bootstrap-icons";
import { searchKeys } from "../pages/data-interfaces/explore";



interface Props {
  schemes: searchKeys[];
  onSelect?: (scheme: searchKeys) => void;
}

const SchemeList: React.FC<Props> = ({ schemes, onSelect }) => {
  if (!schemes || schemes.length === 0) return null;

  return (
    <div className="wrapper">
      {schemes.map((scheme, index) => (
        <div
          key={index}

          className="scheme-card scheme-list-card"
          onClick={() => onSelect?.(scheme)}
        >
          {/* Icon badge */}
          <div className="icon-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="#3B5BDB"
              viewBox="0 0 16 16"
            >
              <path d="M2 10h12v1H2v-1zm1-3h10v1H3V7zm5-5 6 3H2L8 2z" />
              <path d="M1 11h14v1H1v-1zm0 2h14v1H1v-1z" />
            </svg>
          </div>

          {/* Scheme name */}
          <span className="scheme-name">{scheme.scheme_name}</span>

          {/* Chevron */}
          <ChevronRight className="" />
        </div>
      ))}


    </div>
  );
};



export default SchemeList;