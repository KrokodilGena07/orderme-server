const db = require('../config/db');
const {DataTypes} = require('sequelize');

const User = db.define('user', {
    id: {type: DataTypes.UUID, primaryKey: true},
    fullName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    activationCode: {type: DataTypes.INTEGER, allowNull: false},
    pass: {type: DataTypes.STRING}
});

const Session = db.define('session', {
    id: {type: DataTypes.UUID, primaryKey: true},
    refreshToken: {type: DataTypes.STRING, unique: true, allowNull: false},
    userAgent: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
});

const Worker = db.define('worker', {
    id: {type: DataTypes.UUID, primaryKey: true},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    pinCode: {type: DataTypes.STRING(4), allowNull: false}
});

const Shift = db.define('shift', {
    id: {type: DataTypes.UUID, primaryKey: true},
    checkCount: {type: DataTypes.INTEGER, defaultValue: 0},
    cashKitchen: {type: DataTypes.FLOAT, defaultValue: 0},
    cashBar: {type: DataTypes.FLOAT, defaultValue: 0},
    cash: {type: DataTypes.FLOAT, defaultValue: 0},
    nonCash: {type: DataTypes.FLOAT, defaultValue: 0},
    cardCash: {type: DataTypes.FLOAT, defaultValue: 0},
    transferCash: {type: DataTypes.FLOAT, defaultValue: 0},
    money: {type: DataTypes.FLOAT, allowNull: false},
    resultCash: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    shiftNumber: {type: DataTypes.INTEGER, autoIncrement: true},
    status: {type: DataTypes.ENUM('OPEN', 'CLOSED'), defaultValue: 'OPEN'}
});

const Point = db.define('point', {
    id: {type: DataTypes.UUID, primaryKey: true},
    address: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false}
});

const Network = db.define('network', {
    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

const Storage = db.define('storage', {
    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING}
});

const Ingredient = db.define('ingredient', {
    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    pricePerUnit: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    image: {type: DataTypes.STRING},
    minStock: {type: DataTypes.FLOAT}
});

const StorageItem = db.define('storageItem', {
    id: {type: DataTypes.UUID, primaryKey: true},
    networkId: {type: DataTypes.UUID},
    quantity: {type: DataTypes.FLOAT, allowNull: false}
});

const Delivery = db.define('delivery', {
    id: {type: DataTypes.UUID, primaryKey: true},
    workerId: {type: DataTypes.UUID},
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    image: {type: DataTypes.STRING}
});

const DeliveryDetail = db.define('deliveryDetail', {
    id: {type: DataTypes.UUID, primaryKey: true},
    count: {type: DataTypes.FLOAT, allowNull: false}
});

const CafeType = db.define('cafeType', {
    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Role = db.define('role', {
    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Unit = db.define('unit', {
    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const AuthType = db.define('authType', {
    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.STRING}
});

const Product = db.define('product', {
    id: {type: DataTypes.UUID, primaryKey: true},
    price: {type: DataTypes.FLOAT},
    image: {type: DataTypes.STRING},
    parentId: {type: DataTypes.UUID},
    markup: {type: DataTypes.FLOAT},
    name: {type: DataTypes.STRING, allowNull: false},
    unitCount: {type: DataTypes.FLOAT}
});

const ProductIngredient = db.define('productIngredient', {
    id: {type: DataTypes.UUID, primaryKey: true},
    count: {type: DataTypes.FLOAT}
});

const Subscription = db.define('subscription', {
    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const ShiftWorker = db.define('shiftWorker', {
    id: {type: DataTypes.UUID, primaryKey: true}
});

Subscription.hasOne(CafeType);
CafeType.belongsTo(Subscription);

Subscription.hasOne(User);
User.belongsTo(Subscription);

CafeType.hasOne(Point);
Point.belongsTo(CafeType);

Ingredient.hasOne(DeliveryDetail);
DeliveryDetail.belongsTo(Ingredient);

Ingredient.hasOne(StorageItem);
StorageItem.belongsTo(Ingredient);

Ingredient.hasMany(ProductIngredient);
ProductIngredient.belongsTo(Ingredient);

Unit.hasOne(Ingredient);
Ingredient.belongsTo(Unit);

Unit.hasOne(Product);
Product.belongsTo(Unit);

AuthType.hasOne(User);
User.belongsTo(AuthType);

Role.hasOne(Worker);
Worker.belongsTo(Role);

Delivery.hasMany(DeliveryDetail);
DeliveryDetail.belongsTo(Delivery);

Point.hasMany(Storage);
Storage.belongsTo(Point);

Point.hasMany(Ingredient);
Ingredient.belongsTo(Point);

Point.hasMany(Delivery);
Delivery.belongsTo(Point);

User.hasMany(Session);
Session.belongsTo(User);

User.hasMany(Worker);
Worker.belongsTo(User);

User.hasMany(Point);
Point.belongsTo(User);

User.hasMany(Network);
Network.belongsTo(User);

User.hasMany(Storage);
Storage.belongsTo(User);

User.hasMany(Ingredient);
Ingredient.belongsTo(User);

User.hasMany(Product);
Product.belongsTo(User);

Network.hasMany(Storage);
Storage.belongsTo(Network);

Network.hasMany(Ingredient);
Ingredient.belongsTo(Network);

Network.hasOne(StorageItem);
StorageItem.belongsTo(Network);

Network.hasMany(Delivery);
Delivery.belongsTo(Network);

Network.hasMany(Point);
Point.belongsTo(Network);

Network.hasMany(Product);
Product.belongsTo(Network);

User.hasOne(StorageItem);
StorageItem.belongsTo(User);

Point.hasOne(StorageItem);
StorageItem.belongsTo(Point);

Storage.hasMany(StorageItem);
StorageItem.belongsTo(Storage);

User.hasMany(Delivery);
Delivery.belongsTo(User);

Storage.hasMany(Delivery);
Delivery.belongsTo(Storage);

Product.hasMany(ProductIngredient);
ProductIngredient.belongsTo(Product);

Point.hasMany(Product);
Product.belongsTo(Point);

Point.hasMany(Worker);
Worker.belongsTo(Point);

Network.hasMany(Worker);
Worker.belongsTo(Network);

User.hasMany(Shift);
Shift.belongsTo(User);

Point.hasMany(Shift);
Shift.belongsTo(Point);

Network.hasMany(Shift);
Shift.belongsTo(Network);

Worker.hasMany(ShiftWorker);
ShiftWorker.belongsTo(Worker);

Shift.hasMany(ShiftWorker);
ShiftWorker.belongsTo(Shift);

module.exports = {
    User,
    Session,
    Worker,
    Shift,
    Point,
    Network,
    Storage,
    Ingredient,
    StorageItem,
    Delivery,
    DeliveryDetail,
    CafeType,
    Product,
    Role,
    Unit,
    AuthType,
    ProductIngredient,
    Subscription,
    ShiftWorker
};