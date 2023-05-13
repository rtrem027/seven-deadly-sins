CREATE DATABASE IF NOT EXISTS `quadrinhosLeitor`;

USE `quadrinhosLeitor`;

CREATE TABLE IF NOT EXISTS quadrinhos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    capa varchar(255) NOT NULL,
    capitulo INT NOT NULL
);

CREATE TABLE IF NOT EXISTS paginas (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_quadrinho INT NOT NULL,
    numero_pagina INT NOT NULL,
    imagem varchar(255) NOT NULL,
    FOREIGN KEY (id_quadrinho) REFERENCES quadrinhos(id)
);
