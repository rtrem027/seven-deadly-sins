const Joi = require('joi');

const schema = Joi.object({
  id_quadrinho: Joi.number().required(),
  numero_pagina: Joi.number().required(),
  imagem: Joi.string().trim().required(),
});

function validatePaginas(pagina) {
    const { error } = schema.validate(pagina);
    if (error) {
      return { valid: false, message: error.details[0].message };
    }
    return { valid: true };
  }

  module.exports=validatePaginas