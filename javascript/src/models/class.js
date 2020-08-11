const ClassModel = (sequelize, type) => {
  return sequelize.define('class', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    classCode: {
      type:type.STRING,
      unique: true,
      allowNull: false,
    },
    className: {
      type:type.STRING,
    }
  });
}
export default ClassModel;
