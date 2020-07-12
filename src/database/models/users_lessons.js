module.exports = (sequelize,DataTypes) => {
    const user_lesson = sequelize.define(
        'Users_lesson',
            {
                expire_date: DataTypes.DATE,
                tableName: 'users_lessons'
            },
            {
                timestamps: false
            },   
       )
       return user_lesson
       
   }