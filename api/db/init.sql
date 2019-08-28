DROP TABLE IF EXISTS medicine;
CREATE TABLE medicine
(
    id              integer NOT NULL PRIMARY KEY,
    name            varchar(255),
    condition       integer,
    recommendations bigint,

    FOREIGN KEY (condition) REFERENCES condition(id)
);

DROP TABLE IF EXISTS condition;
CREATE TABLE condition
(
    id              integer NOT NULL PRIMARY KEY,
    name            varchar(255)
);


DROP TABLE IF EXISTS symptom;
CREATE TABLE symptom
(
    id              integer NOT NULL PRIMARY KEY,
    name            varchar(255)
);


DROP TABLE IF EXISTS condition_symptom_freq;
CREATE TABLE condition_symptom_freq
(
    condition       integer,
    symptom         integer,
    appearances     bigint NOT NULL,

    FOREIGN KEY (condition) REFERENCES condition(id),
    FOREIGN KEY (symptom) REFERENCES symptom(id)
);
