
# Getting Started

## Prereqs

You need to already have

* docker
* docker-compose

Files

    $ tree
    .
    └── docker-compose.yml
    0 directories, 1 file


Compose config

    $ cat docker-compose.yml
    neo4j:
      image: neo4j:3.0
      ports:
       - "17474:7474"

Running

    $ docker-compose up neo4j
    Starting docker_neo4j_1
    Attaching to docker_neo4j_1
    neo4j_1  | Starting Neo4j.
    neo4j_1  | 2017-02-11 02:48:16.237+0000 INFO  Starting...
    neo4j_1  | 2017-02-11 02:48:16.936+0000 INFO  Bolt enabled on 0.0.0.0:7687.
    neo4j_1  | 2017-02-11 02:48:20.515+0000 INFO  Started.
    neo4j_1  | 2017-02-11 02:48:22.484+0000 INFO  Remote interface available at http://0.0.0.0:7474/
    neo4j_1  | 2017-02-11 02:48:32.821+0000 WARN  Failed authentication attempt for 'neo4j' from 172.17.0.1

# Querying

Open http://localhost:17474/browser/

### Clear Everything

```neo4j
MATCH (n) DETACH DELETE n
```

### Populate / Add Connections

```neo4j
CREATE (Erik:Person {name: "Erik"})
CREATE (Neville:Person {name: "Neville"})
CREATE (Guntars:Person {name: "Guntars"})
CREATE (Sarah:Person {name: "Sarah"})

CREATE (LinkReact:Link {title: "Getting Started With React"})

CREATE
  (Erik)-[:COMPLETED]->(LinkReact),
  (Neville)-[:COMPLETED]->(LinkReact)

CREATE (LinkRelay:Link {title: "Relay Gotchas"})
CREATE
  (Neville)-[:COMPLETED]->(LinkRelay),
  (Guntars)-[:COMPLETED]->(LinkRelay)

CREATE (LinkScrum:Link {title: "SCRUM Techniques"})
CREATE (LinkScrum2:Link {title: "SCRUM Pro"})
CREATE (LinkScrum3:Link {title: "SCRUM Master 2000"})
CREATE
  (Neville)-[:COMPLETED]->(LinkScrum),
  (Neville)-[:COMPLETED]->(LinkScrum2),
  (Sarah)-[:COMPLETED]->(LinkScrum),
  (Sarah)-[:COMPLETED]->(LinkScrum2),
  (Sarah)-[:COMPLETED]->(LinkScrum3)
```

### Queries

```neo4j
MATCH (erik:Person {name:"Erik"})-[:COMPLETED]->(m)<-[:COMPLETED]-(coCompleters),
      (coCompleters)-[:COMPLETED]->(m2)<-[:COMPLETED]-(cocoCompleters)
WHERE NOT (erik)-[:COMPLETED]->(m2)
RETURN erik, m, coCompleters, m2
```

```neo4j
MATCH (erik:Person {name:"Erik"})-[:COMPLETED]->(m)<-[:COMPLETED]-(coCompleters),
      (coCompleters)-[:COMPLETED]->(m2)
WHERE NOT (erik)-[:COMPLETED]->(m2)
RETURN erik, m, coCompleters, m2
```
