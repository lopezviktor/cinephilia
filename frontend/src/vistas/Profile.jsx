import React from 'react';
import './Profile.css';

function Profile() {

  // Datos de usuario (Simulados, luego pueden venir de una API o Context)
  const user = {
    name: "Nombre de Usuario",
    email: "usuario@example.com",
    photo: "https://via.placeholder.com/150"
  };

// Ejemplo de historial de visualización (luego vendrá de la base de datos)
const viewedMovies = [
  {
    id: 1,
    title: "The Matrix",
    poster: "https://picsum.photos/200/300?random=1"
  },
  {
    id: 2,
    title: "Inception",
    poster: "https://picsum.photos/200/300?random=2"
  },
  {
    id: 3,
    title: "Pulp Fiction",
    poster: "https://picsum.photos/200/300?random=3"
  },
  {
    id: 4,
    title: "The Dark Knight",
    poster: "https://picsum.photos/200/300?random=4"
  },
  {
    id: 5,
    title: "Interstellar",
    poster: "https://picsum.photos/200/300?random=5"
  }
];

return (
  <div className="profile-page">

    {/* Sección Superior: Info y Configuración */}
    <div className="profile-top">
      {/* Información del Usuario */}
      <section className="user-info">
        <img 
          src={user.photo} 
          alt="Foto de perfil" 
          className="profile-photo"
        />
        <h2 className="username">{user.name}</h2>
        <p className="user-email">{user.email}</p>
        <button className="edit-profile-button">Editar Perfil</button>
      </section>

      {/* Configuración de la Cuenta */}
      <section className="account-settings">
        <h3>Configuración de la Cuenta</h3>
        <ul>
          <li>Cambiar Nombre de Usuario</li>
          <li>Cambiar Email</li>
          <li>Cambiar Contraseña</li>
          <li>Preferencias de Contenido</li>
          <li>Notificaciones</li>
          <li>Cerrar Sesión</li>
        </ul>
      </section>
    </div>

    {/* Historial de Visualización */}
    <section className="viewed-section">
        <h3>Historial de Visualización</h3>
        <div className="viewed-carousel">
          {viewedMovies.length > 0 ? (
            viewedMovies.map(movie => (
              <div key={movie.id} className="viewed-card">
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="viewed-poster"
                />
                <h4>{movie.title}</h4>
                <button className="mark-unseen-button">
                  Marcar como no vista
                </button>
              </div>
            ))
          ) : (
            <p>No has visto ninguna película aún.</p>
          )}
        </div>
      </section>
  </div>
);
}

export default Profile;