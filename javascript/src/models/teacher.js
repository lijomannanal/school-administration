const TeacherModel = (sequelize, type) => {
  return sequelize.define('teacher', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    teacherEmail: {
      type:type.STRING,
      unique: true,
      allowNull: false,
    },
    teacherName: {
      type:type.STRING,
    }
  });
}
export default TeacherModel;
