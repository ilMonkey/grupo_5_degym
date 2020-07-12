module.exports = (sequelize,DataTypes )=>{
    const branch = sequelize.define(
        'Branch',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            telephone: DataTypes.STRING,
        },
    );
    // branch.associate = (models) => {
    //     branch.hasMany(models.Lessons)
    // }
    // branch.associate = (models) => {
    //     branch.hasMany(models.Lesson, {
    //         as: 'lessons',
    //         foreignKey: 'id_branch'
    //     })
    // }
    return branch
};