require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const options = {
  logging: false,
  native: false,
};

if (process.env.NODE_ENV === "production") {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const DATABASE = process.env.NODE_ENV === "production"
  ? process.env.DATABASE_URL
  : `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/dogs`

const sequelize = new Sequelize(DATABASE, options);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Dog, Temperament } = sequelize.models;

Dog.belongsToMany(Temperament, {
  through: 'dog_temperament'
});

Temperament.belongsToMany(Dog, {
  through: 'dog_temperament'
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
