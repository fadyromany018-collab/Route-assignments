
import { postModel } from './post.model.js';
import  Comment  from './comments.model.js';
import { usersModel } from './user.model.js';


usersModel.hasMany(postModel, { foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
postModel.belongsTo(usersModel, { foreignKey: 'userId' });

postModel.hasMany(Comment, { foreignKey: 'postId', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Comment.belongsTo(postModel, { foreignKey: 'postId' });

