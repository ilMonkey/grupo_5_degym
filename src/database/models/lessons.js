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
            Lesson.belongsTo(models.Activity, {
                 as: 'activity',
                 foreignKey: 'id_activity'
            })
            Lesson.belongsTo(models.Branch, {
                as: 'branch',
                foreignKey: 'id_branch'
            })    
        }
    
        return lesson
}