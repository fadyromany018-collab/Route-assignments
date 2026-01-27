import { DataTypes, Model } from 'sequelize';
import {sequelize} from "../connectionDB.js";


class Comment extends Model {}

Comment.init({

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Requirement: TEXT
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Requirement: Foreign Key to Posts
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Posts', // Ensure this matches your Post table name
      key: 'id'
    }
  },
  // Requirement: Foreign Key to Users
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Ensure this matches your User table name
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Comment',
  // Requirement: createdAt and updatedAt are enabled by default in Sequelize
  timestamps: true 
});

export default Comment;