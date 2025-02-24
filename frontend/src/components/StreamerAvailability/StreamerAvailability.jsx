import React from 'react';
import './StreamerAvailability.css';

// Importa los logos desde la carpeta correcta
import NetflixLogo from '../../assets/logos/netflix.png';
import DisneyLogo from '../../assets/logos/disney.png';
import MaxLogo from '../../assets/logos/max.png';
import PrimeLogo from '../../assets/logos/prime.png';

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