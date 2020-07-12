module.exports = (sequelize,DataTypes) => {
    const user_lesson = sequelize.define(
        'User_lesson',
            {expire_date: DataTypes.DATE},
            {
                timestamps: false,
                tableName: 'user_lesson'},
       )
       return user_lesson
       
   }