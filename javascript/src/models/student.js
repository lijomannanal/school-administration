const StudentModel = (sequelize, type) => {
  return sequelize.define('student', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentEmail: {
      type:type.STRING,
      unique: true,
      allowNull: false,
    },
    studentName: {
      type:type.STRING,
    }
  });
}
export default StudentModel;
