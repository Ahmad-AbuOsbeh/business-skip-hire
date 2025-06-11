import React, { useState, useEffect } from 'react';
import SkipCard from '../SkipCard/SkipCard';
import ActionFooter from '../ActionFooter/ActionFooter';
import './SkipSelector.css';

const API_URL = 'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft';

const getImageUrlForSize = (size) => {
    const imageUrls = { 4: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg', 6: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg', 8: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg', 10: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg', 12: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/12-yarder-skip.jpg', 14: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/14-yarder-skip.jpg', 16: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/16-yarder-skip.jpg', 20: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg', 40: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/40-yarder-skip.jpg' };
    return imageUrls[size] || imageUrls[8];
};

const SkipSelector = () => {
    const [skips, setSkips] = useState([]);
    const [selectedSkipId, setSelectedSkipId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkips = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`HTTP error`);
                const apiData = await response.json();

                if (Array.isArray(apiData)) {
                    const transformedSkips = apiData.map(skip => ({
                        id: skip.id,
                        name: `${skip.size} Yard Skip`,
                        hire_period: `${skip.hire_period_days} day hire`,
                        price: (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(2),
                        image: getImageUrlForSize(skip.size),
                    }));
                    setSkips(transformedSkips);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (e) {
                setError('Failed to load skip options.');
            } finally {
                setLoading(false);
            }
        };
        fetchSkips();
    }, []);

    const selectedSkipDetails = skips.find(skip => skip.id === selectedSkipId);

    return (
        <main className="selector-main">
            <header className="selector-header">
                <h1>Select Your Skip</h1>
                <p>Choose the right size for your project needs.</p>
            </header>

            {loading && <p className="status-message">Loading options...</p>}
            {error && <p className="status-message error">{error}</p>}

            {!loading && !error && (
                <div className="skip-options-scroller" role="radiogroup">
                    {skips.map((skip) => (
                        <SkipCard
                            key={skip.id}
                            skip={skip}
                            isSelected={selectedSkipId === skip.id}
                            onSelect={setSelectedSkipId}
                        />
                    ))}
                </div>
            )}

            <ActionFooter selectedSkipDetails={selectedSkipDetails} />
        </main>
    );
};

export default SkipSelector;