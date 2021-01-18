'use strict'

function showGPA() {
  console.log('=== start ==='); 

  const courses = parseCourses();
  const sumOfCredits = courses.reduce((accumulator, course) => accumulator + course.credit, 0);
  const sumOfGrades = courses.reduce((accumulator, course) => accumulator + course.grade * course.credit, 0);
  const GPA = sumOfGrades / sumOfCredits;

  console.log(`sumOfGrades: ${sumOfGrades} sumOfCredits: ${sumOfCredits} GPA: ${GPA.toFixed(5)}`);

  writeToDocument(GPA)
}

function isCourseRow(elem) {
  const keywords = ["-春", "-夏", "-秋", "-冬", "-Spring", "-Summer", "-Autumn", "-Winter"];
  for (let keyword of keywords) {
    if (elem.innerText.includes(keyword))
      return true;
  }
  return false;
}

function isNeedCount(gradeStr) {
  const keywords = ["A", "B", "C", "D"];
  for (let keyword of keywords) {
    if (gradeStr.includes(keyword))
      return true;
  }
  return false
}

function courseRow2couse(courseRow) {
  const course = {
    "name": courseRow.children[1].innerText,
    "credit": +courseRow.children[2].innerText,
    "grade": +courseRow.children[4].innerText,
  };
  console.log(JSON.stringify(course));
  return course
}

function parseCourses() {
  console.log('=== parseCourses ===');

  const rows = Array.from(document.getElementsByTagName('tr'));
  console.log(`parse ${rows.length} rows`);

  const courseRows = rows.filter(isCourseRow);
  console.log(`parse ${courseRows.length} course rows`);

  const courses = [];

  for (let courseRow of courseRows) {
    console.log(`course: ${courseRow.innerText}`);

    if (isNeedCount(courseRow.children[3].innerText)) {
      courses.push(courseRow2couse(courseRow));
    }
  }

  return courses;
}

function writeToDocument(GPA) {
  console.log('=== writeToDocument ===');
  const tds = Array.from(document.getElementsByTagName('td'));
  const grad_title_e = tds.find(td => td.innerText.includes('毕业年月') || td.innerText.includes("Graduation"));
  const gpa_title_e = grad_title_e.cloneNode();
  gpa_title_e.innerHTML = "<b>GPA：</b>";
  gpa_title_e.style.textAlign = "right";
  const gpa_e = gpa_title_e.cloneNode();
  gpa_e.innerText = GPA.toFixed(5);
  gpa_e.style.textAlign = "left";
  const fa = grad_title_e.parentElement;
  fa.insertBefore(gpa_title_e, grad_title_e);
  fa.insertBefore(gpa_e, grad_title_e);
}

window.addEventListener("load", function load(event){
  window.removeEventListener("load", load, false); //remove listener, no longer needed
  showGPA();
},false);
