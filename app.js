const faker = require('faker');

function createCompany(rows, callback) {
  for (var i = 0; i < rows; i++) {
    callback && callback({
      companyName: faker.company.companyName(),
      companyAddress: faker.address.streetName(),
      companyCity: faker.address.city(),
      companyCountry: faker.address.country(),
    });
  }
}


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://root:root@localhost:27017/admin";

// connect to mongo
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) throw err;
  console.log("Database Connected.");

  // connect to mydb
  const mydb = db.db('mydb');

  // create collection company
  mydb.createCollection('company', (err, collection) => {
    if (err) throw err;
    console.log("Collection created!");

    // collection.insert()
    createCompany(20, (value) => {
      collection.insert(value);
    })

    db.close();
  });
});