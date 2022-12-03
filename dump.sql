--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

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
-- Name: comments; Type: TABLE; Schema: public; Owner: samuel.v.phipps
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    content character varying,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer,
    post_id integer,
    parent_comment_id integer
);


ALTER TABLE public.comments OWNER TO "samuel.v.phipps";

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: samuel.v.phipps
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO "samuel.v.phipps";

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: samuel.v.phipps
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: hunt_area; Type: TABLE; Schema: public; Owner: samuel.v.phipps
--

CREATE TABLE public.hunt_area (
    id integer NOT NULL,
    hunt_area character varying
);


ALTER TABLE public.hunt_area OWNER TO "samuel.v.phipps";

--
-- Name: hunt_area_id_seq; Type: SEQUENCE; Schema: public; Owner: samuel.v.phipps
--

CREATE SEQUENCE public.hunt_area_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hunt_area_id_seq OWNER TO "samuel.v.phipps";

--
-- Name: hunt_area_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: samuel.v.phipps
--

ALTER SEQUENCE public.hunt_area_id_seq OWNED BY public.hunt_area.id;


--
-- Name: liked_post; Type: TABLE; Schema: public; Owner: samuel.v.phipps
--

CREATE TABLE public.liked_post (
    id integer NOT NULL,
    user_id integer,
    post_id integer
);


ALTER TABLE public.liked_post OWNER TO "samuel.v.phipps";

--
-- Name: liked_post_id_seq; Type: SEQUENCE; Schema: public; Owner: samuel.v.phipps
--

CREATE SEQUENCE public.liked_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.liked_post_id_seq OWNER TO "samuel.v.phipps";

--
-- Name: liked_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: samuel.v.phipps
--

ALTER SEQUENCE public.liked_post_id_seq OWNED BY public.liked_post.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: samuel.v.phipps
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(255),
    species character varying(255),
    hunt_area_id integer,
    date_of_hunt date,
    success boolean,
    picture character varying,
    content character varying,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer,
    land_type character varying(255),
    flagged boolean DEFAULT false,
    weapon_type character varying
);


ALTER TABLE public.posts OWNER TO "samuel.v.phipps";

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: samuel.v.phipps
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO "samuel.v.phipps";

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: samuel.v.phipps
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: samuel.v.phipps
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(1000) NOT NULL,
    created_date date DEFAULT CURRENT_DATE,
    profile_pic character varying(255),
    "about me" character varying,
    access_level integer DEFAULT 1
);


ALTER TABLE public."user" OWNER TO "samuel.v.phipps";

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: samuel.v.phipps
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO "samuel.v.phipps";

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: samuel.v.phipps
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: hunt_area id; Type: DEFAULT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.hunt_area ALTER COLUMN id SET DEFAULT nextval('public.hunt_area_id_seq'::regclass);


--
-- Name: liked_post id; Type: DEFAULT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.liked_post ALTER COLUMN id SET DEFAULT nextval('public.liked_post_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: samuel.v.phipps
--

COPY public.comments (id, content, created, user_id, post_id, parent_comment_id) FROM stdin;
229	Congratulations! I know what you mean. I havent been successful this year yet, and I almost find that a good thing cause I get to keep hunting!!!	2022-11-11 09:54:37.488069	3	89	\N
233	Acorns are truly the BEST place to hunt!	2022-11-12 11:17:29.146949	8	89	229
231	SO fun! Glad it was a nice weekend!	2022-11-20 09:59:44.640751	3	90	\N
232	Deer camp is one of the best weekends of my year!	2022-11-22 11:17:01.463106	8	90	\N
226	Congratulations to you! So exciting to go on your first squirrel outing. What a great way to warm up for the weekend.	2022-11-04 09:51:44.392134	7	88	\N
230	Nicely done!!!	2022-11-04 09:59:21.513698	3	88	226
227	Agreed!!! Glad you had a great day!	2022-11-04 09:53:29.53981	2	88	226
234	Good Job!!!	2022-11-26 11:21:39.561608	8	88	\N
235	That is a bruiser!	2022-11-17 11:22:02.20849	8	89	\N
225	Nicely done! Good luck this weekend! We are getting warmed up with squirrel hunting this week. Cant wait! You hunt in 232 for deer? 	2022-11-01 09:38:14.19462	6	87	\N
228	Great Job! Hunting with family is really the best.	2022-11-02 09:54:10.284332	3	87	\N
236	That is where I hunt too! Id be interested to hear any tips you have!	2022-11-02 11:23:45.75295	8	87	225
237	Yes I do, we have access on a great piece of private land. Its all about agriculture in this area. If you can hunt near a bean field or corn field thats the ticket. Good luck out there this year!	2022-11-04 11:25:12.735878	5	87	225
243	No kidding!	2022-11-26 13:01:17.605251	1	89	235
244	Really cool you got to do that with the DNR! I would be curious to see some more photos from the hunt.	2022-11-26 13:01:46.572794	1	92	\N
\.


--
-- Data for Name: hunt_area; Type: TABLE DATA; Schema: public; Owner: samuel.v.phipps
--

COPY public.hunt_area (id, hunt_area) FROM stdin;
1	263
2	201
3	267
4	264
5	268
6	203
7	208
8	209
9	257
10	256
11	210
12	265
13	661
14	262
15	266
16	297
17	298
18	251
19	258
20	239
21	269
22	270
23	240
24	241
25	259
26	246
27	248
28	214
29	213
30	273
31	272
32	271
33	249
34	221
35	222
36	224
37	223
38	229
39	219
40	218
41	215
42	277
43	225
44	227
45	235
46	236
47	285
48	284
49	283
50	282
51	281
52	275
53	274
54	278
55	279
56	280
57	286
58	294
59	234
60	288
61	295
62	238
63	237
64	250
65	289
66	296
67	252
68	105
69	290
70	291
71	292
72	299
73	230
74	253
75	254
76	293
77	233
78	255
79	232
80	338
81	701
82	605
83	341
84	342
85	343
86	344
87	643
88	655
89	647
90	645
91	648
92	646
93	649
94	101
95	111
96	104
97	110
98	169
99	109
100	107
101	119
102	177
103	176
104	184
105	197
106	172
107	171
108	679
109	173
110	199
111	181
112	182
113	178
114	132
115	133
116	130
117	131
118	117
119	126
120	155
121	156
122	183
123	159
124	157
125	152
126	604
127	114
128	260
129	Red Lake Reservation
130	No area
\.


--
-- Data for Name: liked_post; Type: TABLE DATA; Schema: public; Owner: samuel.v.phipps
--

COPY public.liked_post (id, user_id, post_id) FROM stdin;
217	2	89
218	2	88
220	3	87
221	3	88
226	3	89
227	8	90
228	8	89
230	8	88
231	1	89
232	1	89
233	1	87
234	1	87
235	1	87
236	1	88
237	1	88
239	2	90
240	5	92
241	5	90
242	5	89
246	1	89
247	1	88
248	1	88
249	1	88
250	1	88
251	1	88
252	1	88
253	5	88
254	1	90
255	1	92
210	6	87
212	7	88
213	7	87
214	1	89
215	1	88
216	1	87
277	2	92
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: samuel.v.phipps
--

COPY public.posts (id, title, species, hunt_area_id, date_of_hunt, success, picture, content, created, user_id, land_type, flagged, weapon_type) FROM stdin;
88	First squirrels!	Squirrel	41	2022-11-03	t	http://localhost:3000/images/post-image1669477228119.jpg	Took my son on his first squirrel hunt to get ready for opener this weekend~! He got three! He was most excited about the fox squirrel, I didnt have the heart to tell him they taste worse. Such a fun day, cant wait to get him his first deer this weekend. (at leas I hopE!) Anyone got any tips for a kids first hunt? I barely remember mine at this point.	2022-11-03 09:40:28.126616	6	private	f	Shotgun
90	Deer Camp	Deer	114	2022-11-19	f	http://localhost:3000/images/post-image1669478236600.jpg	Well! Another year and another Deer Camp! The whole family came up to our annual hunt, and boy did we have a great time. Lots of beer, hunting, cards, and sadly, no deer. We tried everything, even tried the acorns like Variable Goose recommended, and no luck. Thats hunting tho! Looking forward to next year already.	2022-11-20 09:57:16.614237	3	private	f	Rifle
89	First Buck!!!	Deer	106	2022-11-20	t	http://localhost:3000/images/post-image1669477849647.jpg	Shot my first northwoods Buck this week! Slow opener up here in northern MN, but we finally got on deer. Turns out the secret is ACORNS! So hunters, pay attention to those oaks. Especially in years with lots of acorns like this year. Im an addict and I cant wait for next year.	2022-11-09 09:50:49.651774	7	public	f	Rifle
92	An old hunt!	Turkey	40	2022-04-22	f	http://localhost:3000/images/post-image1669481410945.jpg	I had the opportunity to go shoot some turkey pictures for the DNR this past spring. I had a marvelous time, and Im sure many of you wish you would have been there with me while I called in this long-beard. I just had my article come out in the conservation volunteer and I hope you all give it a read. You will be happy to know that sometimes I go out with a gun too :)	2022-11-22 10:50:10.948256	8	private	f	Camera
87	A Great Pheasant Hunt!	Pheasant	79	2022-10-29	t	http://localhost:3000/images/post-image1669476978756.jpg	My dad and I took our yearly pheasant hunting trip this past weekend and had a wonderful time. Of course I brought Jake (the dog :)) with. We were really successful this year! Afterwords we enjoyed fresh pheasant and beer, what a way to start the hunting season. Looking forward to our deer hunt in a week!	2022-11-01 09:36:18.765037	5	public	f	12 Guage
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: samuel.v.phipps
--

COPY public."user" (id, username, password, created_date, profile_pic, "about me", access_level) FROM stdin;
1	Sam	$2a$10$93xG49IQ.al/2qI1CLs31.VdW7kY5OjuQ90VBJ3QVb3Y./uXluoKS	2022-11-17	\N	\N	1
2	Julia	$2a$10$gef2qXWAMS27Ow/q11h3MukRkdK.k1s21joC8dZIeryw01wcKKYwG	2022-11-17	\N	\N	1
3	CatMan	$2a$10$gzSVMsFLApC.lgUySgyF3.XsaU3ZPY4VsVETEtXHVEbxEJwItAceO	2022-11-21	\N	\N	1
4	Josephine	$2a$10$BHKwrCtphi.yTqP6Hetz3.SWDOMqHRHsgumA0ROVFQr4b2FkqEpIe	2022-11-23	\N	\N	1
5	DoggyDad1	$2a$10$8zgMoB2Bg9soWfj5tFUP9O0DUl.gbwFywoqPZAFfXTUKeutoyjA3u	2022-11-26	\N	\N	1
6	SquirrelMan1	$2a$10$hIYUncF4O85IDdSEIcrfNO8LW6Y2dnB2QAJtAFDFR7MZp2xtCZBpu	2022-11-26	\N	\N	1
7	Variablegoose2	$2a$10$5WKDPDjIKKpqi/3Ql2VSyudFrNI.YH4Gxk62MnSmYjBEHCovSgJeO	2022-11-26	\N	\N	1
8	FancyPants123	$2a$10$nXhr8fcuGT3GTdczs8hrju7iwdEzgqRO73im42OoUdJyUuG90ARXK	2022-11-26	\N	\N	1
9	FlamingTurnip	$2a$10$QvWt/.srxdsoTCnsBwL5uu.UAbF6of69f5Eehx2vPLc8mz/Y2BPeK	2022-11-26	\N	\N	1
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: samuel.v.phipps
--

SELECT pg_catalog.setval('public.comments_id_seq', 290, true);


--
-- Name: hunt_area_id_seq; Type: SEQUENCE SET; Schema: public; Owner: samuel.v.phipps
--

SELECT pg_catalog.setval('public.hunt_area_id_seq', 130, true);


--
-- Name: liked_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: samuel.v.phipps
--

SELECT pg_catalog.setval('public.liked_post_id_seq', 324, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: samuel.v.phipps
--

SELECT pg_catalog.setval('public.posts_id_seq', 146, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: samuel.v.phipps
--

SELECT pg_catalog.setval('public.user_id_seq', 9, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: hunt_area hunt_area_pkey; Type: CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.hunt_area
    ADD CONSTRAINT hunt_area_pkey PRIMARY KEY (id);


--
-- Name: liked_post liked_post_pkey; Type: CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.liked_post
    ADD CONSTRAINT liked_post_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: liked_post liked_post_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.liked_post
    ADD CONSTRAINT liked_post_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: liked_post liked_post_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.liked_post
    ADD CONSTRAINT liked_post_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: posts posts_hunt_area_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_hunt_area_id_fkey FOREIGN KEY (hunt_area_id) REFERENCES public.hunt_area(id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: samuel.v.phipps
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

