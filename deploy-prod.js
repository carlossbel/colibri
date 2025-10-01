import axios from "axios";
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config(); // 🔑 carga el .env
try {
  console.log("🚀 Pasando cambios de main a prod...");

  // Asegura que tienes main actualizado
    execSync("git checkout main && git pull origin main", { stdio: "inherit" });

    // usa PROD (tu rama real)
    execSync("git checkout PROD", { stdio: "inherit" });
    execSync("git merge main", { stdio: "inherit" });
    execSync("git push origin PROD", { stdio: "inherit" });

  // Llamada al hook de Vercel
  console.log("🔗 Disparando deploy en Vercel...");
  await axios.post(process.env.VERCEL_DEPLOY_HOOK);

  console.log("✅ Deploy de Colibrí a producción iniciado en Vercel");
} catch (error) {
  console.error("❌ Error durante el deploy:", error.message);
  process.exit(1);
}
