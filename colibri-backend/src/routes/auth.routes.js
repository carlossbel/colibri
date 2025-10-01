import { Router } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = Router();

const registerSchema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().min(7),
  password: z.string().min(4),
  rol: z.enum(["viajero","conductor","ambos"]).default("viajero")
});

router.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const exists = await prisma.usuario.findUnique({ where: { email: data.email }});
    if (exists) return res.status(400).json({ message: "Email ya registrado" });

    const hash = await bcrypt.hash(data.password, 10);
    const user = await prisma.usuario.create({
      data: { ...data, password: hash }
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (e) {
    res.status(400).json({ message: "Datos inválidos", error: e?.message });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2d" });
    res.json({ token });
  } catch (e) {
    res.status(400).json({ message: "Datos inválidos", error: e?.message });
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        rol: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

export default router;
