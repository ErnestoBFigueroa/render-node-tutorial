import pool from "../db.js";
import bcrypt from "bcryptjs";

import { token } from "morgan";
import { createAccessToken } from "../lib/jwt.js";

export const getAllUsua = async (req, res) => {
  const result = await pool.query(
    "SELECT id , usua, fechaCreacion, status, empresa, perfil, email, idcreacion  FROM public.usuarios"
  );

  var data = JSON.parse(JSON.stringify(result.rows));

  return res.json({
    data,
  });
};

export const getUsua = async (req, res) => {
  try {
    const { id } = req.params;

    const userFound = await pool.query(
      "SELECT * FROM public.usuarios WHERE id=$1",
      [id]
    );
    if (userFound.rows.length === 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });

    var data = JSON.parse(JSON.stringify(userFound.rows));

    return res.json({
      id: data[0].id,
      usua: data[0].usua,
      email: data[0].email,
      empresa: data[0].empresa,
      sistema: data[0].sistema,
      perfil: data[0].perfil,
    });
  } catch (error) {
    next(error);
  }
};

export const createUsua = async (req, res) => {
  try {
    const { email, username, password, sistema } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO public.usuarios (usua, pass, sistema, status, empresa, perfil, email, idcreacion)  VALUES ($1,$2,$3,'Activo','demo','demo',$4, $5) RETURNING *",
      [username, passwordHash, sistema, email, req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Usuario no creado",
      });

    var data = JSON.parse(JSON.stringify(result.rows));

    return res.json({
      id: data[0].id,
      usua: data[0].usua,
      email: data[0].email,
      empresa: data[0].empresa,
      sistema: data[0].sistema,
      perfil: data[0].perfil,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUsua = async (req, res) => {
  try {
    const { id } = req.params;

    const userDelete = await pool.query(
      "DELETE FROM public.usuarios WHERE id=$1 RETURNING *",
      [id]
    );
    if (userDelete.rowCount === 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });

    var data = JSON.parse(JSON.stringify(userDelete.rows));

    return res.json({
      id: data[0].id,
      usua: data[0].usua,
      email: data[0].email,
      empresa: data[0].empresa,
      sistema: data[0].sistema,
      perfil: data[0].perfil,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUsua = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username, password, sistema, status } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "UPDATE public.usuarios SET email=$1, usua=$2, pass=$3, sistema=$4, status=$5 WHERE id=$6 RETURNING *",
      [email, username, passwordHash, sistema, status, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });

    var data = JSON.parse(JSON.stringify(result.rows));

    return res.json({
      id: data[0].id,
      usua: data[0].usua,
      email: data[0].email,
      empresa: data[0].empresa,
      sistema: data[0].sistema,
      perfil: data[0].perfil,
      status: data[0].status,
    });
  } catch (error) {
    next(error);
  }
};
