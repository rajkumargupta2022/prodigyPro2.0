import React from "react";
import { ChevronRight, FolderFill, PlusLg } from "react-bootstrap-icons";
import { foliosKeys } from "../pages/data-interfaces/transact";

interface Props {
  folios: foliosKeys[];
  onSelect: (folio: foliosKeys | null) => void;
}

const InvestFolioList: React.FC<Props> = ({ folios, onSelect }) => {
  return (
    <div style={styles.wrap}>
      {folios.map((folio, idx) => (
        <div key={idx} style={styles.card} onClick={() => onSelect(folio)}>
          <div style={styles.iconBadge}>
            <FolderFill size={18} color="#3B5BDB" />
          </div>
          <div style={styles.middle}>
            <span style={styles.title}>Folio {folio.folio_number}</span>
            <span style={styles.subtitle}>Current value: ₹{folio.current_value}</span>
          </div>
          {folio.is_recommended && <span style={styles.recommendedBadge}>Recommended</span>}
          <ChevronRight size={16} color="#9ca3af" />
        </div>
      ))}

      <div style={styles.createCard} onClick={() => onSelect(null)}>
        <div style={styles.createIconBadge}>
          <PlusLg size={16} color="#3B5BDB" />
        </div>
        <span style={styles.createTitle}>Create New Folio</span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#ffffff",
    borderRadius: 14,
    border: "1px solid #eef0f6",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    padding: "12px 14px",
    cursor: "pointer",
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#e8ecff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  middle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
  },
  subtitle: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  recommendedBadge: {
    background: "#dcfce7",
    color: "#15803d",
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 12,
    padding: "3px 10px",
    whiteSpace: "nowrap",
  },
  createCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#e8ecff",
    borderRadius: 14,
    border: "1px solid #c7d2fe",
    padding: "12px 14px",
    cursor: "pointer",
  },
  createIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  createTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#3B5BDB",
  },
};

export default InvestFolioList;
