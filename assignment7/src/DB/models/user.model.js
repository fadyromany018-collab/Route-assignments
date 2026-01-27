
import { Model, DataTypes } from 'sequelize';
import {sequelize} from "../connectionDB.js"

export const usersModel=sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING, 
    allowNull: false
  },
email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true 
    }
  },
password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
  
      checkPasswordLength(value) {
        if (value.length <= 6) {
          throw new Error('Password length must be greater than 6 characters');
        }
      }
    }
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (user) => {
      if (user.name.length <= 2) {
        throw new Error('Name must be greater than 2 characters');
      }
    }
  }
});