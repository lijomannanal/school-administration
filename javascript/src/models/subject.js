const SubjectModel = (sequelize, type) => {
  return sequelize.define('subject', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subjectCode: {
      type:type.STRING,
      unique: true,
      allowNull: false,
    },
    subjectName: {
      type:type.STRING,
    }
  });
}
export default SubjectModel;
