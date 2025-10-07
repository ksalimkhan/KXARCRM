--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: customers; Type: TABLE; Schema: public; Owner: bashiho
--

CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email_address character varying(255) NOT NULL,
    phone_number character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    last_contact timestamp without time zone NOT NULL,
    notes character varying(255),
    status character varying(50)
);


ALTER TABLE public.customers OWNER TO bashiho;

--
-- Name: users_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: bashiho
--

CREATE SEQUENCE public.users_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_customer_id_seq OWNER TO bashiho;

--
-- Name: users_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bashiho
--

ALTER SEQUENCE public.users_customer_id_seq OWNED BY public.customers.customer_id;


--
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: bashiho
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.users_customer_id_seq'::regclass);


--
-- Name: customers users_pkey; Type: CONSTRAINT; Schema: public; Owner: bashiho
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT users_pkey PRIMARY KEY (customer_id);


--
-- PostgreSQL database dump complete
--

