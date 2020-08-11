import { ClassInfo,
  Student,
  Subject,
  Teacher,
  TeacherSubjects, StudentClass } from '../models';

class CommonController {

  /**
   * Function to add/update class info
   * @function addClassInfo
   * @param {Object} data - Class data to insert
   * @param {boolean} addIfNotExist - Flag to determine whether to add/return if the class doesn't exist
   */
  static async addClassInfo(data, addIfNotExist = true) {
    const { classCode, className } = data;
    let classInfo = await ClassInfo.findOne({ where: { classCode } });
    if (!classInfo) {
      if (!addIfNotExist) {
        return false;
      }
      classInfo = await ClassInfo.create(data);
    } else {
      classInfo.className = className.trim();
      await classInfo.save();
    }
    return classInfo;
  }

  /**
   * Function to add/update teacher info
   * @function addTeacher
   * @param {Object} data - Teacher data to insert
   */
  static async addTeacher(data) {
    const { teacherEmail, teacherName } = data;
    let teacher = await Teacher.findOne({ where: { teacherEmail } });
    if (!teacher) {
      teacher = await Teacher.create(data);
    } else {
      teacher.teacherName = teacherName;
      await teacher.save();
    }
    return teacher;
  }

  /**
   * Function to add/update student info
   * @function addStudent
   * @param {Object} data - Student data to insert
   */
  static async addStudent(data) {
    const { studentEmail, studentName } = data;
    let student = await Student.findOne({ where: { studentEmail } });
    if (!student) {
      student = await Student.create(data);
    } else {
      student.studentName = studentName;
      await student.save();
    }
    return student;
  }

  /**
   * Function to add/update subject info
   * @function addSubject
   * @param {Object} data - Subject data to insert
   */
  static async addSubject(data) {
    const { subjectCode, subjectName } = data;
    let subject = await Subject.findOne({ where: { subjectCode } });
    if (!subject) {
      subject = await Subject.create(data);
    } else {
      subject.subjectName = subjectName;
      await subject.save();
    }
    return subject;
  }

  /**
   * Function to add student-class relationship
   * @function addStudentClass
   * @param {Object} data - student - class info to insert
   */
  static async addStudentClass(data) {
    const { student, classInfo } = data;
    let result;
    if(!await student.hasClass(classInfo)) {
      result = await student.addClass(classInfo);
      result = result[0];
    } else {
      result = await StudentClass.findOne({ where: { student_id: student.id, class_id: classInfo.id  } });
    }
    return result;
  }

  /**
   * Function to add teacher-subject relationship
   * @function addTeacherSubject
   * @param {Object} data - teacher - subject info to insert
   */
  static async addTeacherSubject (data) {
    const { teacher, subject } = data;
    let result;
    if(!await teacher.hasSubject(subject)) {
      result = await teacher.addSubject(subject);
      result = result[0];
    } else {
      result = await TeacherSubjects.findOne({ where: { teacher_id: teacher.id, subject_id: subject.id  } });
    }
    return result;
  }

  /**
   * Function to fetch all students by class code
   * @function getClassStudents
   * @param {string} classCode - Class Code to fetch students
   */
  static async getClassStudents (classCode) {
    const students = await  Student.findAll({attributes: ['id', ['studentName', 'name'], ['studentEmail', 'email']], include: [
      { model: ClassInfo, as: 'classes', attributes: [], through: { attributes: []}, where: { classCode } }], order: [
      ['studentName', 'ASC']],  raw: true});
    return students;
  }

  /**
   * Function to fetch all teachers' subject & class info
   * @function getTeacherClasses
   */
  static async getTeacherClasses () {
    const teachers = await Teacher.findAll({ as: 'teacher',attributes: [ 'teacherName'],
      include: [{ model: TeacherSubjects, as: 'tsubjects', attributes:[['id', 'teacherSubid']],
        include: [{ model: Subject,  attributes: ['subjectCode', 'subjectName']} ,{ model: StudentClass, as: 'studentClasses', attributes: ['class_id'], through: { attributes: []}}]
      }],
    });
    return teachers;
  }
}

export default CommonController;
