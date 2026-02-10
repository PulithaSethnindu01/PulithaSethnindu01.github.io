const ADMIN_USER = "pzzz";
const ADMIN_PASS = "111";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dpwzcrxlr/image/upload";
const UPLOAD_PRESET = "Pr4Yn8gbsxPbzO7Uy25Xjb7kZjE";
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxDvIXhBFEMzj2WVX0pCIbk2wzMWr0RIbopJggl7iWD6g4itpUKIsw6XVq-xAIWjtZo/exec"; // Replace with your web app URL

// Login
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    alert("Login Successful!");
    document.getElementById("login-section").style.display = "none";
    document.getElementById("form-section").style.display = "block";
    loadAchievements();
  } else {
    alert("Invalid username or password!");
  }
}

// Image compression
function compressImage(file, maxWidth = 800, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = e => img.src = e.target.result;
    reader.onerror = err => reject(err);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => resolve(blob), "image/jpeg", quality);
    };
    reader.readAsDataURL(file);
  });
}

// Add new achievement
async function addAchievement() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const desc = document.getElementById("desc").value;
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];

  if (!title || !date || !desc || !file) {
    alert("Fill all fields!");
    return;
  }
  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file!");
    return;
  }

  document.getElementById("progress").style.display = "block";

  try {
    const compressedBlob = await compressImage(file);

    // Upload to Cloudinary
    const cloudForm = new FormData();
    cloudForm.append("file", compressedBlob);
    cloudForm.append("upload_preset", UPLOAD_PRESET);
    const cloudRes = await fetch(CLOUDINARY_URL, { method: "POST", body: cloudForm });
    const cloudData = await cloudRes.json();
    const imageUrl = cloudData.secure_url;

    // Send to backend
    const sheetForm = new FormData();
    sheetForm.append("title", title);
    sheetForm.append("date", date);
    sheetForm.append("description", desc);
    sheetForm.append("image", imageUrl);

    const sheetRes = await fetch(WEB_APP_URL, { method: "POST", body: sheetForm });
    const sheetJson = await sheetRes.json();

    if (sheetJson.status === "success") {
  const newId = sheetJson.id; // unique achievement ID
  alert("Achievement added successfully!");

  // Reset form fields
  fileInput.value = "";
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("desc").value = "";

  // Load updated achievements
  loadAchievements();

  // Remove previous copy link if exists
  const oldCopyDiv = document.getElementById("copy-link-div");
  if (oldCopyDiv) oldCopyDiv.remove();

  // Create copy link section
  const copyDiv = document.createElement("div");
  copyDiv.id = "copy-link-div";
  copyDiv.style.marginTop = "10px";

  const link = `${window.location.origin}/achievements.html?ach=${newId}`;
  copyDiv.innerHTML = `
    <input type="text" value="${link}" id="copy-link-input" readonly style="width:70%; padding:5px;">
    <button id="copy-link-btn" style="padding:5px 10px; margin-left:5px;">Copy Link</button>
  `;

  // Insert below submit button
  const submitBtn = document.querySelector("#form-section button");
  submitBtn.insertAdjacentElement("afterend", copyDiv);

  // Copy functionality
  document.getElementById("copy-link-btn").onclick = () => {
    const input = document.getElementById("copy-link-input");
    input.select();
    input.setSelectionRange(0, 99999); // for mobile
    document.execCommand("copy");
    alert("Link copied to clipboard!");
  };
}
 else {
      alert("Error: " + sheetJson.message);
    }

  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  } finally {
    document.getElementById("progress").style.display = "none";
  }
}

// Load all achievements
// Load all achievements (updated with Delete button)
async function loadAchievements() {
  const res = await fetch(WEB_APP_URL);
  const achievements = await res.json();
  const container = document.getElementById("achievements-container");
  container.innerHTML = "";

  achievements.forEach(ach => {
    const dateVal = ach.date ? new Date(ach.date).toISOString().split("T")[0] : "";
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${ach.image}" style="width:80px;height:60px;object-fit:cover;">
      <input type="text" id="title-${ach.id}" value="${ach.title}">
      <input type="date" id="date-${ach.id}" value="${dateVal}">
      <textarea id="desc-${ach.id}">${ach.description}</textarea>
      <button onclick="updateAchievement('${ach.id}','${ach.image}')">Update</button>
      <button onclick="deleteAchievement('${ach.id}')">Delete</button>
    `;
    container.appendChild(div);
  });
}

// Delete achievement
async function deleteAchievement(id) {
  if (!confirm("Are you sure you want to delete this achievement?")) return;

  try {
    // Send POST instead of DELETE
    const formData = new FormData();
    formData.append("id", id);
    formData.append("action", "delete"); // signal delete

    const res = await fetch(WEB_APP_URL, { method: "POST", body: formData });
    const json = await res.json();

    if (json.status === "success") {
      alert("Achievement deleted!");
      loadAchievements(); // refresh list
    } else {
      alert("Error: " + json.message);
    }
  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  }
}


// Update achievement
async function updateAchievement(id, imageUrl) {
  const title = document.getElementById(`title-${id}`).value;
  const date = document.getElementById(`date-${id}`).value;
  const desc = document.getElementById(`desc-${id}`).value;

  const formData = new FormData();
  formData.append("id", id); // critical!
  formData.append("title", title);
  formData.append("date", date);
  formData.append("description", desc);
  formData.append("image", imageUrl);

  const res = await fetch(WEB_APP_URL, { method: "POST", body: formData });
  const json = await res.json();

  if (json.status === "success") {
    alert("Updated!");
    loadAchievements();
  } else {
    alert("Error: " + json.message);
  }
}
