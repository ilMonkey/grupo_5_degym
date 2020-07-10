module.exports = (sequelize,DataTypes )=>{
    const lesson = sequelize.define(
        'Lesson',
        {
            days: DataTypes.STRING,
            time: DataTypes.TIME,
            max_capacity: DataTypes.INTEGER,
            },
            {
                timestamps: false
            },   
    );
        lesson.associate = (models)=>{
            // lesson.belongsTo(models.Activity, {
            //     as: 'activity',
            //     foreignKey: 'id_activity',
            // })
            lesson.belongsTo(models.Branch, {
                as: 'branch',
                foreignKey: 'id_branch',
            })    
        }
    
        return lesson
}