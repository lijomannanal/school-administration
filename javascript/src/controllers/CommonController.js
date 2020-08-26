import { ClassInfo,
  Student,
  Subject,
  Teacher,
  TeacherSubjects, StudentClass } from '../models';
  import Logger from '../config/logger';
  const LOG = new Logger('CommonController.js');

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
      LOG.info(`class ${classCode} does not exist`);
      classInfo = await ClassInfo.create(data);
      LOG.info(`class ${classCode} created succesfully`);
    } else {
      LOG.info(`class ${classCode}  exists`);
      classInfo.className = className.trim();
      await classInfo.save();
      LOG.info(`class ${classCode} updated succesfully`);
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
      LOG.info(`teacher ${teacherEmail} does not exist`);
      teacher = await Teacher.create(data);
      LOG.info(`teacher ${teacherEmail} created succesfully`);
    } else {
      LOG.info(`teacher ${teacherEmail}  exists`);
      teacher.teacherName = teacherName;
      await teacher.save();
      LOG.info(`teacher ${teacherEmail} updated succesfully`);
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
      LOG.info(`student ${studentEmail} does not exist`);
      student = await Student.create(data);
      LOG.info(`student ${studentEmail} created succesfully`);
    } else {
      LOG.info(`student ${studentEmail} exists`);
      student.studentName = studentName;
      await student.save();
      LOG.info(`student ${studentEmail} updated succesfully`);
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
      LOG.info(`subject ${subjectCode} does not exist`);
      subject = await Subject.create(data);
      LOG.info(`subject ${subjectCode} created succesfully`);
    } else {
      LOG.info(`subject ${subjectCode} exists`);
      subject.subjectName = subjectName;
      await subject.save();
      LOG.info(`subject ${subjectCode} updated succesfully`);
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
      LOG.info(`student ${student.studentEmail} hasn't added to ${classInfo.classCode}`);
      result = await student.addClass(classInfo);
      LOG.info(`student ${student.studentEmail} added to ${classInfo.classCode} successfully`);
      result = result[0];
    } else {
      LOG.info(`student ${student.studentEmail} already added to ${classInfo.classCode}`);
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
      LOG.info(`subject ${subject.subjectCode} hasn't added to ${teacher.teacherEmail}`);
      result = await teacher.addSubject(subject);
      LOG.info(`subject ${subject.subjectCode}  added to ${teacher.teacherEmail} successfully`);
      result = result[0];
    } else {
      LOG.info(`subject ${subject.subjectCode}  already added to ${teacher.teacherEmail}`);
      result = await TeacherSubjects.findOne({ where: { teacher_id: teacher.id, subject_id: subject.id  } });
    }
    return result;
  }

  /**
   * Function to fetch all students by class code
   * @function getClassStudents
   * @param {string} classCode - Class Code to fetch students
   */
  static async getClassStudents (classCode, limit) {
    LOG.info(`fetching all students from ${classCode}`);
    const students = await  Student.findAndCountAll({attributes: ['id', ['studentName', 'name'], ['studentEmail', 'email']], include: [
      { model: ClassInfo, as: 'classes', attributes: [], through: { attributes: []}, where: { classCode } }], order: [
      ['studentName', 'ASC']], offset: 0, limit, raw: true});
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
