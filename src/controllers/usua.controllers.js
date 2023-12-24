import pool from "../db.js";

export const getAllUsua = async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0].now);
};

export const getUsua = async (req, res) => {
  res.send("Retornando usuario 10");
};

export const createUsua = async (req, res) => {
  res.send("Creando usuarios");
};

export const deleteUsua = async (req, res) => {
  res.send("Eliminando usuarios");
};

export const updateUsua = async (req, res) => {
  res.send("Actualizando usuarios");
};
