import React from 'react';
import './StreamerAvailability.css';

// Importa los logos desde la carpeta correcta
import NetflixLogo from '../../assets/logos/netflix.jpeg';
import DisneyLogo from '../../assets/logos/disney.jpeg';
import MaxLogo from '../../assets/logos/max.jpeg';
import PrimeLogo from '../../assets/logos/prime.jpeg';

// Asocia los provider_id con los logos
const logos = {
    8: NetflixLogo,
    119: DisneyLogo,
    9: PrimeLogo,
    384: MaxLogo
};

function StreamerAvailability({ platforms = [] }) {
    return (
        <div className="streaming-availability">
            <div className="platforms">
                {platforms.length > 0 ? (
                    platforms.map(platform => (
                        logos[platform.provider_id] ? (
                            <img 
                                key={platform.provider_id} 
                                src={logos[platform.provider_id]} 
                                alt={platform.provider_name} 
                                className="platform-logo"
                            />
                        ) : null
                    ))
                ) : (
                    <p>No disponible en plataformas de streaming.</p>
                )}
            </div>
        </div>
    );
}

export default StreamerAvailability;