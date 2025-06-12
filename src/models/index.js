const db = require('../config/db');
const {DataTypes} = require('sequelize');

const User = db.define('user', {
    id: {type: DataTypes.UUID, primaryKey: true},
    fullName: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    phone: {type: DataTypes.STRING, unique: true, allowNull: false},
    cafe: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING, allowNull: false, unique: true},
});

const Session = db.define('session', {
    id: {type: DataTypes.UUID, primaryKey: true},
    refreshToken: {type: DataTypes.STRING, unique: true, allowNull: false},
    userAgent: {type: DataTypes.STRING, allowNull: false},
});

User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
    User,
    Session
};