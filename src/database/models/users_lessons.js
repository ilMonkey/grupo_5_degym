const { sequelize } = require(".");
const { DataTypes } = require("sequelize/types");

module.exports = (sequelize,DataTypes) => {
 const user_lesson = sequelize.define(
     'User_lesson',
         {expire_date: DataTypes.DATE}
         {tableName: 'user_lesson'}
    )
    return user_lesson
    
}