
-- DROP DATABASE IF EXISTS "Adincoha";

CREATE DATABASE "Adincoha"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    usua character varying(50) COLLATE pg_catalog."default" NOT NULL,
    pass character varying(200) COLLATE pg_catalog."default" NOT NULL,
    sistema character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "fechaCreacion" timestamp with time zone NOT NULL DEFAULT now(),
    status character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "Empresa" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usuarios_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;