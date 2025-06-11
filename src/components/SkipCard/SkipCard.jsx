import React from 'react';
import './SkipCard.css';

const SkipCard = ({ skip, isSelected, onSelect }) => {
    return (
        <div
            className={`skip-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(skip.id)}
            role="radio"
            aria-checked={isSelected}
            tabIndex="0"
            onKeyPress={(e) => e.key === 'Enter' && onSelect(skip.id)}
        >
            <div className="card-image-wrapper">
                <img src={skip.image} alt={skip.name} className="card-image" />
            </div>
            <div className="card-content">
                <h3 className="card-title">{skip.name}</h3>
                <p className="card-subtitle">{skip.hire_period}</p>
                <div className="card-price">£{skip.price}</div>
            </div>
        </div>
    );
};

export default SkipCard;