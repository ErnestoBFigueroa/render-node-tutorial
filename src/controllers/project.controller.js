import pool from "../db.js";

export const getAllProjects = async (req, res, next) => {
  try {
    // throw new Error("Algo fue mal");
    const result = await pool.query(
      "SELECT 'Adincoha' Base,* FROM public.projects ORDER BY id ASC"
    );
    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT 'Adincoha' Base,* FROM public.projects WHERE id= $1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Projecto no encontrado",
      });

    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const createProjects = async (req, res, next) => {
  const { name, priority, description, createdAt, updatedAt } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO public.projects (name, priority, description) VALUES ($1, $2, $3) RETURNING *",
      [name, priority, description]
    );

    //   res.send("Creando proyectos");
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM public.projects WHERE id= $1",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Projecto no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, priority, description, createdAt, updatedAt } = req.body;
    const result = await pool.query(
      "UPDATE public.projects SET name=$1, priority=$2, description=$3 WHERE id=$4 RETURNING *",
      [name, priority, description, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Projecto no encontrado",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
