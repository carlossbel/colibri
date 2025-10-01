import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // 👈 Importamos estilos

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("viajero"); // viajero o conductor
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoUsuario = { nombre, email, telefono, password, rol };

    // guardar en localStorage simulando BD
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuariosColibri")) || [];
    localStorage.setItem(
      "usuariosColibri",
      JSON.stringify([...usuariosGuardados, nuevoUsuario])
    );

    alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
    navigate("/"); // vuelve al login
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <img
            src="/icons/icon-192x192.png"
            alt="Colibrí logo"
            className="register-logo"
          />
          <h1 className="register-title">Colibrí</h1>
          <h2 className="register-subtitle">Crear cuenta</h2>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="register-input"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />

          <input
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            className="register-input"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />

          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="register-select"
          >
            <option value="viajero">Viajero</option>
            <option value="conductor">Conductor</option>
          </select>

          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>

        <p className="register-footer">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => navigate("/")}
            className="register-link"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
