import React from 'react'
import './StreamerAvailability.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w45';

function StreamerAvailability({ platforms = [] }) {
    return (
        <div className="streaming-availability">
            <h4>Disponible en:</h4>
            <div className="platforms">
                {platforms.length > 0 ? (
                platforms.map(platform => (
                    <div key={platform.provider_id} className="platform">
                    <img 
                        src={`${IMAGE_BASE_URL}${platform.logo_path}`} 
                        alt={platform.provider_name} 
                        className="platform-logo"
                    />
                    <span>{platform.provider_name}</span>
                    </div>
                ))
                ) : (
                <p>No disponible en plataformas de streaming.</p>
                )}
            </div>
        </div>
    );
}

export default StreamerAvailability
