DROP DATABASE IF EXISTS biztime;

CREATE DATABASE biztime;


\c biztime

DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS industries;


CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);


CREATE TABLE industries (
    industry_id serial PRIMARY KEY,
    company_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    industry text
);


INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.'),
         ('pwc', 'PWC', 'cpa firm.');


INSERT INTO invoices (comp_Code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null),
         ('pwc', 400, false, null);

INSERT INTO industries (company_code, industry)
  VALUES ('pwc', 'acct'),
         ('apple', 'tech'),
         ('ibm', 'tech');
         






