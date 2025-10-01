import { useState, useEffect } from "react";
import "./Historial.css"; // 👈 Importamos CSS puro

export default function Historial() {
  const [viajes, setViajes] = useState([]);

  // cargar desde localStorage cuando se abra historial
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("viajesColibri")) || [];
    setViajes(guardados);
  }, []);

  return (
    <div className="historial-container">
      <div className="historial-box">
        <h1 className="historial-title">📋 Historial de viajes</h1>

        {viajes.length === 0 ? (
          <p className="historial-empty">Aún no hay viajes guardados.</p>
        ) : (
          <ul className="historial-list">
            {viajes.map((viaje) => (
              <li key={viaje.id} className="historial-item">
                <p><strong>De:</strong> {viaje.origen}</p>
                <p><strong>A:</strong> {viaje.destino}</p>
                <p><strong>Conductor:</strong> {viaje.conductor}</p>
                <p><strong>Costo:</strong> ${viaje.costo}</p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <span className={`estado ${viaje.estado}`}>
                    {viaje.estado}
                  </span>
                </p>
                {viaje.calificacion && (
                  <p><strong>Calificación:</strong> ⭐ {viaje.calificacion}/5</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
