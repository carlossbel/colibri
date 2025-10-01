import { useState, useEffect } from "react";
import "./Home.css"; // 👈 Importamos estilos puros

export default function Home() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [conductor, setConductor] = useState("");
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [viajeActual, setViajeActual] = useState(null);
  const [calificacion, setCalificacion] = useState(null);

  // Generar costo aleatorio (50–300)
  const generarCosto = () =>
    Math.floor(Math.random() * (300 - 50 + 1)) + 50;

  useEffect(() => {
    const viajesGuardados =
      JSON.parse(localStorage.getItem("viajesColibri")) || [];
    if (viajesGuardados.length > 0) {
      const ultimo = viajesGuardados[viajesGuardados.length - 1];
      setViajeActual(ultimo);
      setCalificacion(ultimo.calificacion || null);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoViaje = {
      id: Date.now(),
      origen,
      destino,
      costo: generarCosto(),
      conductor,
      metodoPago,
      estado: "pendiente",
      calificacion: null,
    };

    const viajesGuardados =
      JSON.parse(localStorage.getItem("viajesColibri")) || [];
    const viajesActualizados = [...viajesGuardados, nuevoViaje];
    localStorage.setItem("viajesColibri", JSON.stringify(viajesActualizados));

    setViajeActual(nuevoViaje);
    setCalificacion(null);

    alert("🚕 Viaje creado correctamente ✅");
    setOrigen("");
    setDestino("");
    setConductor("");
    setMetodoPago("efectivo");
  };

  const cambiarEstado = () => {
    if (!viajeActual) return;
    let nuevoEstado = "pendiente";
    if (viajeActual.estado === "pendiente") nuevoEstado = "en curso";
    else if (viajeActual.estado === "en curso") nuevoEstado = "finalizado";
    else nuevoEstado = viajeActual.estado;

    const actualizado = { ...viajeActual, estado: nuevoEstado };
    setViajeActual(actualizado);

    const viajesGuardados =
      JSON.parse(localStorage.getItem("viajesColibri")) || [];
    const viajesActualizados = viajesGuardados.map((v) =>
      v.id === viajeActual.id ? actualizado : v
    );
    localStorage.setItem("viajesColibri", JSON.stringify(viajesActualizados));
  };

  const cancelarViaje = () => {
    if (!viajeActual) return;
    const cancelado = { ...viajeActual, estado: "cancelado" };
    setViajeActual(cancelado);

    const viajesGuardados =
      JSON.parse(localStorage.getItem("viajesColibri")) || [];
    const viajesActualizados = viajesGuardados.map((v) =>
      v.id === viajeActual.id ? cancelado : v
    );
    localStorage.setItem("viajesColibri", JSON.stringify(viajesActualizados));
    alert("❌ El viaje ha sido cancelado");
  };

  const guardarCalificacion = (valor) => {
    const calificado = { ...viajeActual, calificacion: valor };
    setViajeActual(calificado);
    setCalificacion(valor);

    const viajesGuardados =
      JSON.parse(localStorage.getItem("viajesColibri")) || [];
    const viajesActualizados = viajesGuardados.map((v) =>
      v.id === viajeActual.id ? calificado : v
    );
    localStorage.setItem("viajesColibri", JSON.stringify(viajesActualizados));
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">🐦 Colibrí — Crear viaje</h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="home-form">
          <input
            type="text"
            placeholder="Origen"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            required
            className="home-input"
          />

          <input
            type="text"
            placeholder="Destino"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            required
            className="home-input"
          />

          <input
            type="text"
            placeholder="Conductor"
            value={conductor}
            onChange={(e) => setConductor(e.target.value)}
            required
            className="home-input"
          />

          <select
            value={metodoPago}
            disabled
            onChange={(e) => setMetodoPago(e.target.value)}
            className="home-select"
          >
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta (próximamente)</option>
          </select>

          <button type="submit" className="home-button">
            Crear viaje
          </button>
        </form>

        {/* Viaje actual */}
        {viajeActual && (
          <div className="viaje-actual">
            <h2 className="viaje-title">🚖 Viaje actual</h2>
            <p><strong>De:</strong> {viajeActual.origen}</p>
            <p><strong>A:</strong> {viajeActual.destino}</p>
            <p><strong>Conductor:</strong> {viajeActual.conductor}</p>
            <p><strong>Costo:</strong> ${viajeActual.costo}</p>
            <p><strong>Estado:</strong> 
              <span className={`estado ${viajeActual.estado}`}>
                {viajeActual.estado}
              </span>
            </p>

            {viajeActual.estado !== "finalizado" &&
              viajeActual.estado !== "cancelado" && (
                <div className="botones-estado">
                  <button onClick={cambiarEstado} className="btn-estado verde">
                    Cambiar estado
                  </button>
                  <button onClick={cancelarViaje} className="btn-estado rojo">
                    Cancelar viaje
                  </button>
                </div>
              )}

            {viajeActual.estado === "finalizado" && (
              <div className="calificacion">
                <h3>Califica este viaje:</h3>
                <div className="estrellas">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => guardarCalificacion(num)}
                      className={`estrella ${calificacion === num ? "activo" : ""}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                {calificacion && (
                  <p className="mensaje-ok">
                    ✅ Has calificado este viaje con {calificacion}/5
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
