module.exports = (sequelize,DataTypes)=> {
    const activity = sequelize.define(
        'Activity',
        {
            name:DataTypes.STRING,
            description:DataTypes.STRING,
            monthly_price:DataTypes.INTEGER,
        },
    );
    // activity.associate = (models) => {
    //     activity.hasMany(models.Lessons)
    //     }
        return activity
    }
