import Sequelize from 'sequelize';
import sequelize from '../config/database';
import ClassModel from './class';
import StudentModel from './student';
import SubjectModel from './subject';
import TeacherModel from './teacher';

const ClassInfo = ClassModel(sequelize, Sequelize);
const Student = StudentModel(sequelize, Sequelize);
const Subject = SubjectModel(sequelize, Sequelize);
const Teacher = TeacherModel(sequelize, Sequelize);

const StudentClass = sequelize.define('studentClasses', { id: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true
},});

const TeacherSubjects = sequelize.define('teacherSubjects', {  id: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true
},});

const TeacherStudents = sequelize.define('teacherStudents', {  id: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement: true
},});

Student.belongsToMany(ClassInfo, {
  through: StudentClass,
  as: 'classes',
  foreignKey: 'student_id',
});

ClassInfo.belongsToMany(Student, {
  through: StudentClass,
  as: 'students',
  foreignKey: 'class_id',
});

Teacher.belongsToMany(Subject, {
  through: TeacherSubjects,
  as: 'subjects',
  foreignKey: 'teacher_id',
});

Subject.belongsToMany(Teacher, {
  through: TeacherSubjects,
  as: 'teachers',
  foreignKey: 'subject_id',
});

Teacher.hasMany(TeacherSubjects, {as: 'tsubjects', foreignKey: 'teacher_id'});
TeacherSubjects.belongsTo(Teacher, {foreignKey: 'teacher_id'});
Subject.hasMany(TeacherSubjects, {as: 'subteachers', foreignKey: 'subject_id'});
TeacherSubjects.belongsTo(Subject, { foreignKey: 'subject_id'});

StudentClass.belongsToMany(TeacherSubjects, {
  through: TeacherStudents,
  as: 'teacherSubjects',
  foreignKey: 'student_class_id',
});

TeacherSubjects.belongsToMany(StudentClass, {
  through: TeacherStudents,
  as: 'studentClasses',
  foreignKey: 'teacher_subject_id',
});


module.exports = {
  ClassInfo,
  Student,
  Subject,
  Teacher,
  StudentClass,
  TeacherSubjects,
  TeacherStudents
};
