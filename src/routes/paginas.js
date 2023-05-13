const express = require('express');
const connection = require('../db/connection');

const validatePaginas = require('../middlewares/validatepaginas')

const route = express.Router();

route.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * FROM paginas');
  
  res.status(200).json(result);
})

route.post('/', async (req, res) => {
  const { id_quadrinho, numero_pagina, imagem } = req.body;

  
  const [result] = await connection.execute(
    'INSERT INTO paginas(id_quadrinho, numero_pagina, imagem) VALUES(?, ?, ?)', [id_quadrinho, numero_pagina, imagem] 
  );

  const newPlayer = {
    id: result.insertId,
    id_quadrinho, 
    numero_pagina, 
    imagem
  }

  res.status(201).json(newPlayer);
})

route.put('/:id',validatePaginas, async (req, res) => {
  const {id_quadrinho, numero_pagina, imagem } = req.body;
  const { id } = req.params;

  const [[result]] = await connection.execute(`
  SELECT * FROM paginas WHERE id = ?`, [id]);

  if(!result) {
    res.status(404).json({ message: 'Pagina não encontrado'})
  }

  const updatedPlayer = await connection.execute(`
  UPDATE paginas 
  SET id_quadrinho = ?, numero_pagina = ? , imagem = ?
  WHERE id = ?`, [id_quadrinho, numero_pagina, imagem]);

  const newPlayer = {
    id,
    id_quadrinho, 
    numero_pagina,
   imagem
  }

  res.status(200).json(newPlayer);
})

route.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await connection.execute(`
    DELETE FROM paginas
    WHERE id = ?
  `, [id])

  res.status(204).send();
});


module.exports = route;