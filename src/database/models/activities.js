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
<<<<<<< HEAD
        },
=======
        }
>>>>>>> df7a285474f2d43c24f3b6d6a51993db440d84f9
    );
     activity.associate = (models) => {
        activity.hasMany(models.Lesson, {
            as: 'lessons',
            foreignKey: 'id_activity'
        })
         }
        return activity
    }
