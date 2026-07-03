import React from "react";
import { ChevronRight, FolderFill, PlusLg } from "react-bootstrap-icons";
import { foliosKeys } from "../pages/data-interfaces/transact";

interface Props {
  folios: foliosKeys[];
  onSelect: (folio: foliosKeys | null) => void;
}

const InvestFolioList: React.FC<Props> = ({ folios, onSelect }) => {
  return (
    <div className="folio-wrap">
      {folios.map((folio, idx) => (
        <div key={idx} className="folio-card" onClick={() => onSelect(folio)}>
          <div className="folio-icon-badge">
            <FolderFill size={18} color="#3B5BDB" />
          </div>
          <div className="folio-middle">
            <span className="folio-title">Folio {folio.folio_number}</span>
            <span className="folio-subtitle">Current value: ₹{folio.current_value}</span>
          </div>
          {folio.is_recommended && <span className="folio-recommended-badge">Recommended</span>}
          <ChevronRight size={16} color="#9ca3af" />
        </div>
      ))}

      <div className="folio-create-card" onClick={() => onSelect(null)}>
        <div className="folio-create-icon-badge">
          <PlusLg size={16} color="#3B5BDB" />
        </div>
        <span className="folio-create-title">Create New Folio</span>
      </div>
    </div>
  );
};

export default InvestFolioList;
