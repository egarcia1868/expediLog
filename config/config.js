module.exports = {
  "development": {
    "username": "root",
    "password": "password1",
    "database": "expediLogDB",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.productionDBname,
    "password": process.env.productionDBpass,
    "database": process.env.productionDB,
    "host": process.env.productionDBhost,
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
