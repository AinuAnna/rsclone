export function getUserObject(dataObject) {
  const USER = {
    description: dataObject.description,
    fullName: dataObject.fullName,
    mail: dataObject.mail,
    type: dataObject.type,
    password: dataObject.password,
  };
  return USER;
}

export function getGroupObject(dataObject) {
  const GROUP = {
    course: dataObject.course,
    department: dataObject.department,
    description: dataObject.description,
    number: dataObject.number,
    participants: dataObject.participants,
  };
  return GROUP;
}

export function getTestResultObject(dataObject) {
  const TESTRESULT = {
    them: dataObject.them,
    testName: dataObject.testName,
    userId: dataObject.userId,
    assessment: dataObject.assessment,
  };
  return TESTRESULT;
}
