const Joi = require('joi');

const quadrinhoSchema = Joi.object({
  titulo: Joi.string().trim().required(),
  autor: Joi.string().trim().required(),
  capa: Joi.string().trim().required(),
  capitulo: Joi.number().integer().required(),
});
  function validateQuadrinho(req,res,next){

const {  titulo, autor,capa,capitulo} = req.body;
  
const {error}=quadrinhoSchema.validate( { titulo, autor,capa,capitulo})

if(error){
  next({status:400,message:error.details[0].message});    }

next()
  }

module.exports=validateQuadrinho