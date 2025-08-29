// Disclaimer.tsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface DisclaimerProps {
    linkRef?: React.RefObject<HTMLAnchorElement>;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ linkRef }) => {
    // DisclaimerPopup Component
    const DisclaimerPopup = ({ show, onClose }: { show: boolean; onClose: () => void; position: { top: number; left: number } }) => {
        const popupRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent | TouchEvent) => {
                if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                    onClose();
                }
            };

            if (show) {
                document.addEventListener('mousedown', handleClickOutside);
                document.addEventListener('touchstart', handleClickOutside);
            }

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                document.removeEventListener('touchstart', handleClickOutside);
            };
        }, [show, onClose]);

        if (!show) return null;

        return (
            <div
                ref={popupRef}
                style={{
                    position: 'absolute',
                    top : '45px' ,
                    left : '250px',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '15px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    zIndex: 1060,
                    maxWidth: '300px',
                    fontSize: '12px',
                    lineHeight: '1.4',
                    color: '#333',
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'none',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer',
                        color: '#666',
                        padding: '0',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    ×
                </button>
                <p style={{ margin: 0 }}>
                    Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully.
                    The past performance of the mutual funds is not necessarily indicative of the future performance of the schemes.
                </p>
            </div>
        );
    };

    // Disclaimer popup states
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [disclaimerPosition, setDisclaimerPosition] = useState({ top: 0, left: 0 });
    const internalRef = useRef<HTMLAnchorElement>(null);
    const disclaimerRef = linkRef || internalRef;

    const handleDisclaimerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (disclaimerRef.current) {
            const rect = disclaimerRef.current.getBoundingClientRect();
            setDisclaimerPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }

        setShowDisclaimer(true);
    };

    const handleCloseDisclaimer = () => {
        setShowDisclaimer(false);
    };

    return (
        <>
            <Link ref={disclaimerRef} to="#" onClick={handleDisclaimerClick}>
                Disclaimers
            </Link>
            <DisclaimerPopup show={showDisclaimer} onClose={handleCloseDisclaimer} position={disclaimerPosition} />
        </>
    );
};

export default Disclaimer;