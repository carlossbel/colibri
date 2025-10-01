import { Router } from "express";
import { prisma } from "../db.js";
import { auth } from "../middleware/auth.js";
import { z } from "zod";

const router = Router();

// Crear viaje (costo llega del frontend o puedes generarlo aquí)
const createTripSchema = z.object({
  origen: z.string().min(2),
  destino: z.string().min(2),
  conductor: z.string().min(2),
  metodoPago: z.enum(["efectivo"]).default("efectivo"),
  costo: z.number().int().positive()
});

router.post("/", auth, async (req, res) => {
  try {
    const data = createTripSchema.parse(req.body);
    const trip = await prisma.viaje.create({
      data: { ...data, usuarioId: req.user.id }
    });
    res.status(201).json(trip);
  } catch (e) {
    res.status(400).json({ message: "Datos inválidos", error: e?.message });
  }
});

// Listar viajes del usuario (para Historial)
router.get("/", auth, async (req, res) => {
  const trips = await prisma.viaje.findMany({
    where: { usuarioId: req.user.id },
    orderBy: { createdAt: "desc" }
  });
  res.json(trips);
});

// Cambiar estado: PENDIENTE → EN_CURSO → FINALIZADO
router.patch("/:id/estado", auth, async (req, res) => {
  const { id } = req.params;
  const trip = await prisma.viaje.findFirst({ where: { id: Number(id), usuarioId: req.user.id }});
  if (!trip) return res.status(404).json({ message: "Viaje no encontrado" });

  let next = trip.estado;
  if (trip.estado === "PENDIENTE") next = "EN_CURSO";
  else if (trip.estado === "EN_CURSO") next = "FINALIZADO";

  const updated = await prisma.viaje.update({
    where: { id: trip.id },
    data: { estado: next }
  });
  res.json(updated);
});

// Cancelar
router.patch("/:id/cancelar", auth, async (req, res) => {
  const { id } = req.params;
  const trip = await prisma.viaje.findFirst({ where: { id: Number(id), usuarioId: req.user.id }});
  if (!trip) return res.status(404).json({ message: "Viaje no encontrado" });

  const updated = await prisma.viaje.update({
    where: { id: trip.id },
    data: { estado: "CANCELADO" }
  });
  res.json(updated);
});

// Calificar (1..5) solo si FINALIZADO
const rateSchema = z.object({ calificacion: z.number().int().min(1).max(5) });

router.patch("/:id/calificar", auth, async (req, res) => {
  const { id } = req.params;
  const { calificacion } = rateSchema.parse(req.body);

  const trip = await prisma.viaje.findFirst({ where: { id: Number(id), usuarioId: req.user.id }});
  if (!trip) return res.status(404).json({ message: "Viaje no encontrado" });
  if (trip.estado !== "FINALIZADO")
    return res.status(400).json({ message: "Solo se califica un viaje finalizado" });

  const updated = await prisma.viaje.update({
    where: { id: trip.id },
    data: { calificacion }
  });
  res.json(updated);
});

export default router;
