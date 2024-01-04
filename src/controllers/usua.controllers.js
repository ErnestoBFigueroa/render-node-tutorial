import pool from "../db.js";
import bcrypt from "bcryptjs";

import { token } from "morgan";
import { createAccessToken } from "../lib/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { email, username, password, sistema } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO public.usuarios (usua, pass, sistema, status, empresa, perfil, email)  VALUES ($1,$2,$3,'Activo','demo','demo',$4) RETURNING *",
      [username, passwordHash, sistema, email]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Usuario no creado",
      });

    var data = JSON.parse(JSON.stringify(result.rows));

    // console.log(data[0].email);
    const token = await createAccessToken({ id: data[0].id });
    res.cookie("token", token);
    // res.json({
    //   message: "Usuario creado satisfactoriamente",
    // });
    // res.send("Retornando Register");
    // return res.json(result.rows);
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

export const login = async (req, res, next) => {
  try {
    const { email, password, sistema } = req.body;

    const userFound = await pool.query(
      "SELECT * FROM public.usuarios WHERE email=$1 AND sistema=$2",
      [email, sistema]
    );
    if (userFound.rows.length === 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });

    var data = JSON.parse(JSON.stringify(userFound.rows));

    const isMatch = await bcrypt.compare(password, data[0].pass);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = await createAccessToken({ id: data[0].id });
    res.cookie("token", token);

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

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await pool.query(
    "SELECT * FROM public.usuarios WHERE id=$1",
    [req.user.id]
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
  // res.send("profile");
};
