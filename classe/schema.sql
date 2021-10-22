CREATE DATABASE newsletter;

DROP TABLE IF EXISTS pessoas;

CREATE TABLE pessoas (
  id serial PRIMARY KEY,
  email text NOT NULL,
  nome varchar(50) NOT NULL
);