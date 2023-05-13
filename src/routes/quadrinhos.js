const express = require('express');
const connection = require('../db/connection');
const validateQuadrinho = require('../middlewares/validatequadrinhos')
const route = express.Router();

route.get('/',async(req,res)=>{
  const [result] = await connection.execute('SELECT * FROM quadrinhos');

  res.status(200).json(result);
})

route.post('/', async (req, res) => {
  const { titulo, autor,capa,capitulo } = req.body;

  const [result] = await connection.execute(
    'INSERT INTO quadrinhos(titulo, autor,capa,capitulo) VALUES(?, ?,?,?)', [titulo, autor,capa,capitulo] 
  );

  const newTeam = {
    id: result.insertId,
    titulo, 
    autor,
    capa,
    capitulo
  }

  res.status(201).json(newTeam);
})

route.put('/:id',validateQuadrinho, async (req, res) => {
  const { titulo, autor,capa,capitulo} = req.body;
  const { id } = req.params;

  const [[result]] = await connection.execute(`
  SELECT * FROM quadrinhos WHERE id = ?`, [id]);

  if(!result) {
    res.status(404).json({ message: 'Quadrino não encontrado'})
  }

  const updatedTeam = await connection.execute(`
  UPDATE quadrinhos 
  SET titulo = ?, autor = ? ,capa = ?,capitulo = ?
  WHERE id = ?`, [ titulo, autor,capa,capitulo, id]);

  const newTeam = {
    id,
    titulo, 
    autor,
    capa,
    capitulo
  }

  res.status(200).json(newTeam);
})

route.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const [[result]] = await connection.execute(`
  SELECT * FROM quadrinhos WHERE id = ?`, [id]);

  if(!result) {
    res.status(404).json({ message: 'Quadrino não encontrado'})
  }

  await connection.execute(`
    DELETE FROM quadrinhos
    WHERE id = ?
  `, [id])

  res.status(204).send();
})


module.exports = route;