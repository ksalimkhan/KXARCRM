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
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: bashiho
--

COPY public.customers (customer_id, first_name, last_name, email_address, phone_number, address, last_contact, notes, status) FROM stdin;
1	Gerald	Fitzgerald	gfitzgerald59@gmail.com	818-123-4567	8823 Birch Street	2025-10-06 19:03:19.641986	\N	\N
2	Timothy	Johnson	johnsontimothy@gmail.com	322-153-7834	1235 Oak Ave	2025-10-06 19:03:19.641986	\N	\N
3	Samantha	Stevenson	sstevenson@yahoo.com	987-125-7823	9013 Carpenter Street	2025-10-06 19:03:19.641986	\N	\N
4	Alexander	Smith	alexsmith@aol.com	723-612-7432	7231 Maple Street	2025-10-06 19:03:19.641986	\N	\N
5	Jose	Cruz	josecruz1983@gmail.com	123-623-7549	3922 Grove Street	2025-10-06 19:03:19.641986	\N	\N
6	Vincent	Lakes	vinnylakes39@gmail.com	125-512-9792	9382 Apple Street	2025-10-06 19:18:19.680662	\N	\N
7	Fred	LeBarry	fredericolebarrington@aol.com	823-312-5152	7323 Grape Street	2025-10-06 19:18:19.680662	\N	\N
8	Gordon	Freeman	hl3isreal@gmail.com	414-125-7932	9812 Mesa Street	2025-10-06 19:18:19.680662	PHD at MIT	\N
9	Toby	Potter	topologicaltoby@gmail.com	125-521-6923	7236 Maple Street	2025-10-06 19:36:07.343251	\N	\N
10	Samuel	Samson	sammysamson@yahoo.com	829-123-6345	8231 Lilac Street	2025-10-06 19:36:07.343251	\N	\N
11	Michael	Afton	mikeafton@aol.com	723-152-6822	9102 Junior Ave	2025-10-06 19:36:07.343251	\N	\N
12	Henry	Emily	hemily@gmail.com	889-156-2361	2381 Engineer Blv	2025-10-06 19:36:07.343251	\N	\N
13	Johnathan	Keye	keyejohnathan32@gmail.com	929-137-8245	4023 Washington Rd	2025-10-06 19:47:50.082845	\N	\N
14	Kyle	Kiske	kykiske@gmail.com	482-113-2325	8123 Hope Ave	2025-10-06 19:47:50.082845	\N	\N
15	Wendy	Tailor	wtailor1973@gmail.com	818-232-5612	1823 Fir Ave	2025-10-06 19:47:50.082845	\N	\N
\.


--
-- Name: users_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bashiho
--

SELECT pg_catalog.setval('public.users_customer_id_seq', 15, true);


--
-- Name: customers users_pkey; Type: CONSTRAINT; Schema: public; Owner: bashiho
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT users_pkey PRIMARY KEY (customer_id);


--
-- PostgreSQL database dump complete
--

