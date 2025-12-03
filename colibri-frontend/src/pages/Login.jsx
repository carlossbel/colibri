import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://colibri-backend-od5b.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Guardamos el token en localStorage
        localStorage.setItem("token", data.token);

        // Redirigimos al home
        navigate("/home");
      } else {
        alert(data.message || "Credenciales incorrectas ❌");
      }
    } catch (error) {
      console.error("Error al conectar con backend:", error);
      alert("Error al conectar con el servidor 🚨");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img
            src="/icons/icon-192x192.png"
            alt="Colibrí logo"
            className="login-logo"
          />
          <h1 className="login-title">Colibríiiii</h1>
          <h2 className="login-subtitle">Inicia sesión</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="login-footer">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="login-link"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
