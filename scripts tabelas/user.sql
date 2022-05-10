CREATE TABLE users (
	id serial,
	nome varchar(255),
	cpf varchar(11),
	email varchar(255),
	senha varchar(255),
	equipe varchar(10),
	funcao varchar(20),
	user_token varchar(255)
);