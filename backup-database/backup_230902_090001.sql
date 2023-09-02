--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE tododb;
ALTER ROLE tododb WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:yqikwI17wqDZS31PK0tqAA==$gpPMCpCKYdRy+3BPaBdYN1msTScqaEqlY/sMX9QNcFI=:8+88gqPNl5mMJmUVSfYdLgJgAFkdsGLxLQc9kCpu72Q=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "todo_db" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: todo_db; Type: DATABASE; Schema: -; Owner: tododb
--

CREATE DATABASE todo_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE todo_db OWNER TO tododb;

\connect todo_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blacklist_token; Type: TABLE; Schema: public; Owner: tododb
--

CREATE TABLE public.blacklist_token (
    id integer NOT NULL,
    jti character varying(36) NOT NULL
);


ALTER TABLE public.blacklist_token OWNER TO tododb;

--
-- Name: blacklist_token_id_seq; Type: SEQUENCE; Schema: public; Owner: tododb
--

CREATE SEQUENCE public.blacklist_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blacklist_token_id_seq OWNER TO tododb;

--
-- Name: blacklist_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tododb
--

ALTER SEQUENCE public.blacklist_token_id_seq OWNED BY public.blacklist_token.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: tododb
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.projects OWNER TO tododb;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: tododb
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO tododb;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tododb
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: tododb
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    description text,
    due_date date,
    is_done boolean DEFAULT false,
    user_id integer NOT NULL,
    project_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.tasks OWNER TO tododb;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: tododb
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO tododb;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tododb
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tododb
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(124) NOT NULL,
    password character varying(1024) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO tododb;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tododb
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tododb;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tododb
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: blacklist_token id; Type: DEFAULT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.blacklist_token ALTER COLUMN id SET DEFAULT nextval('public.blacklist_token_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: blacklist_token; Type: TABLE DATA; Schema: public; Owner: tododb
--

COPY public.blacklist_token (id, jti) FROM stdin;
1	02e810c4-642c-43ed-b1b8-eb481f72eb64
2	ac7e2112-3722-4aed-9381-7867110a5993
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: tododb
--

COPY public.projects (id, name, description, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: tododb
--

COPY public.tasks (id, title, description, due_date, is_done, user_id, project_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tododb
--

COPY public.users (id, name, email, password, created_at, updated_at) FROM stdin;
1	test2	test2@gmail.com	pbkdf2:sha256:600000$VOjuH9eEJi5g9rr7$4657b173ce38f31ca2dc4333bbb21b8693e977c521ba27dd94484090fe763763	2023-09-02 00:29:50.523073+00	\N
2	Nadine Winter	nadine@gmail.com	pbkdf2:sha256:600000$6KjcblfihTq5Uz1q$007b26d246b33f364ab096e198705b0f9eb3422b889af1dbded4d0f26afaed32	2023-09-02 01:49:54.926462+00	\N
3	Rudi Budiman	budimanrudi@gmail.com	pbkdf2:sha256:600000$uCt4CQ3LGDLDdWRO$f9e67dc8ef2b27a3451c8452c9a81f15bb12842262049d655a3f74864afde848	2023-09-02 01:50:24.187742+00	\N
4	Martha Deborah	deborahm@gmail.com	pbkdf2:sha256:600000$euTO2OQKPW5mZRfD$c418c5a75d9758b97267f174d052e3510810d1e7736edaebe5cc9f7eda608572	2023-09-02 01:51:11.928957+00	\N
5	Johan Azhari	johana@gmail.com	pbkdf2:sha256:600000$JHaSDtAPMTqEkAId$1bee6a1b646c5de14509b5a2748f1bf69837a30f829b0c42f156951ec25a9f8f	2023-09-02 01:52:12.67184+00	\N
\.


--
-- Name: blacklist_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tododb
--

SELECT pg_catalog.setval('public.blacklist_token_id_seq', 2, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tododb
--

SELECT pg_catalog.setval('public.projects_id_seq', 2, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tododb
--

SELECT pg_catalog.setval('public.tasks_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tododb
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: blacklist_token blacklist_token_jti_key; Type: CONSTRAINT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.blacklist_token
    ADD CONSTRAINT blacklist_token_jti_key UNIQUE (jti);


--
-- Name: blacklist_token blacklist_token_pkey; Type: CONSTRAINT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.blacklist_token
    ADD CONSTRAINT blacklist_token_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: projects projects_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: tasks tasks_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: tasks tasks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tododb
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

