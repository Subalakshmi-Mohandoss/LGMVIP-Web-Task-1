document
  .getElementById("enrollmentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Form fields
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const address = document.getElementById("address").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const website = document.getElementById("website").value.trim();
    const image = document.getElementById("image").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const course = document.getElementById("course").value.trim();
    const declaration = document.getElementById("declaration").checked;

    // Skills
    const skills = Array.from(
      document.querySelectorAll('input[name="skills"]:checked')
    ).map((skill) => skill.value);

    // Validation
    let errors = [];

    // Check at least 2 skills
    if (skills.length < 2) {
      errors.push("Please select at least 2 skills.");
    }

    // Check phone number does not begin with 0
    if (contact.startsWith("0")) {
      errors.push("Contact number should not begin with 0.");
    }

    // Check address contains house number
    const addressRegex = /\d+/;
    if (!addressRegex.test(address)) {
      errors.push("Address must contain a house number.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // Create student object
    const student = {
      name,
      email,
      contact,
      address,
      dob,
      website,
      image,
      gender,
      course,
      skills,
      declaration,
    };

    // Display student details
    displayStudent(student);

    // Clear form
    document.getElementById("enrollmentForm").reset();
  });

function displayStudent(student) {
  const studentDiv = document.createElement("div");
  studentDiv.classList.add("student");

  const studentImage = document.createElement("img");
  studentImage.src = student.image || "https://via.placeholder.com/50";
  studentImage.alt = `${student.name}'s image`;

  const studentInfo = document.createElement("div");
  studentInfo.innerHTML = `
        <strong>${student.name}</strong><br>
        DOB: ${student.dob}<br>
        ${student.gender}<br>
        ${student.email}<br>
        ${student.contact}<br>
        ${student.address}<br>
       
        <a href="${student.website}" target="_blank">${student.website}</a><br>
        ${student.course}<br>
        ${student.skills.join(", ")}
    `;

  studentDiv.appendChild(studentImage);
  studentDiv.appendChild(studentInfo);
  document.getElementById("studentsList").appendChild(studentDiv);
}
