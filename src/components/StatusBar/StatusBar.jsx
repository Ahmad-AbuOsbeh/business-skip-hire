import React from 'react';
import './StatusBar.css';

const StatusBar = ({ currentStepIndex }) => {
    const steps = [
        { label: 'Postcode' },
        { label: 'Waste', subLabel: 'Type' },
        { label: 'Select', subLabel: 'Skip' },
        { label: 'Permit', subLabel: 'Check' },
        { label: 'Choose', subLabel: 'Date' },
        { label: 'Payment' }
    ];

    return (
        <nav className="status-bar-container" aria-label="Progress">
            {steps.map((step, index) => (
                <div key={step.label} className="step-wrapper">
                    <div className="step-label">
                        {step.label}
                        {step.subLabel && <span className="sub-label">{step.subLabel}</span>}
                    </div>
                    <div className="step-bar">
                        <div
                            className="step-bar-progress"
                            style={{ width: index < currentStepIndex ? '100%' : index === currentStepIndex ? '50%' : '0%' }}
                        ></div>
                    </div>
                </div>
            ))}
        </nav>
    );
};

export default StatusBar;