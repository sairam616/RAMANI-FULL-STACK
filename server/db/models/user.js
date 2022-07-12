const Sequelize = require("sequelize");
const db = require("../db");
const crypto = require("crypto");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    alloWNull: false,
    validate: {
      isEmail: true,
    },
  },
  photoUrl: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      min: 6,
    },
    allowNull: false,
    get() {
      return () => this.getDataValue("password");
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  lastName: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  },
  bio: {
    type: Sequelize.STRING,
  },
  receiveNotifications: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  receiveUpdates: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
  completedOnboarding: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.prototype.correctPassword = function (password) {
  return User.encryptPassword(password, this.salt()) === this.password();
};

User.createSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (plainPassword, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainPassword)
    .update(salt)
    .digest("hex");
};

const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.createSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});

module.exports = User;
