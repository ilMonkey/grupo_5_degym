module.exports = (sequelize,DataTypes)=> {
    const activity = sequelize.define(
        'Activity',
        {
            name:DataTypes.STRING,
            description:DataTypes.STRING,
            monthly_price:DataTypes.INTEGER,
            img: DataTypes.STRING
        },
        {
            timestamps: false
        }
    );
     activity.associate = (models) => {
        activity.hasMany(models.Lesson, {
            as: 'lessons',
            foreignKey: 'id_activity'
        })
         }
        return activity
    }
