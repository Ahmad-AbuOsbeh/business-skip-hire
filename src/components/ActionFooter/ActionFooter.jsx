import React from 'react';
import './ActionFooter.css';

const ActionFooter = ({ selectedSkipDetails }) => {
    return (
        <footer className="action-footer-container">
            <div className="footer-content">
                <button className="back-button">Back</button>
                <div className="footer-selection-info">
                    {selectedSkipDetails ? (
                        <>
                            <strong>{selectedSkipDetails.name}</strong>
                            <span>£{selectedSkipDetails.price}</span>
                        </>
                    ) : (
                        <span>Select a skip to proceed</span>
                    )}
                </div>
                <button
                    className="continue-button"
                    disabled={!selectedSkipDetails}
                    onClick={() => alert(`Proceeding with ${selectedSkipDetails?.name}`)}
                >
                    Continue
                </button>
            </div>
        </footer>
    );
};

export default ActionFooter;