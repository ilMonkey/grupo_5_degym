module.exports = (sequelize,DataTypes )=>{
    const user = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            birth_day: DataTypes.DATE,
            genre: DataTypes.STRING,
            start_date: DataTypes.DATE,
            role: DataTypes.INTEGER,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            mobile_number: DataTypes.STRING,
            avatar_url: DataTypes.STRING
        },
        {
            timestamps: false
        },
    );
    user.associate = (models) => {
        user.belongsToMany(models.Lesson,{
            as: 'lessons',
            through: 'User_lesson',
            foreignKey: 'user_id',
            otherKey: 'lesson_id'
        })
    }
    return user
}