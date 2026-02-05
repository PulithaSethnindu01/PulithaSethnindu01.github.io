  // ===== CONFIG =====
  const ADMIN_USER = "admin"; 
  const ADMIN_PASS = "1234";  
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dpwzcrxlr/image/upload"; 
  const UPLOAD_PRESET = "Pr4Yn8gbsxPbzO7Uy25Xjb7kZjE"; 
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyn7b1U_W_BdnbkxvXSOychIrxbrZidnUi_XXs6KEn27GqO_c7IjcktmsIJf-MDy3BD/exec"; 

  // ===== LOGIN =====
  function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if(user === ADMIN_USER && pass === ADMIN_PASS){
      alert("Login Successful!");
      document.getElementById("login-section").style.display="none";
      document.getElementById("form-section").style.display="block";
    } else {
      alert("Invalid username or password!");
    }
  }

  // ===== IMAGE COMPRESSION =====
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
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => resolve(blob), "image/jpeg", quality);
      };
      reader.readAsDataURL(file);
    });
  }

  // ===== ADD ACHIEVEMENT =====
  async function addAchievement() {
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const desc = document.getElementById("desc").value;
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];

    if(!title || !date || !desc || !file){
      alert("Fill all fields!");
      return;
    }
    if(!file.type.startsWith("image/")){
  alert("Please select a valid image file!");
  return;
}


    document.getElementById("progress").style.display = "block";

    try {
      // Compress image before upload
      const compressedBlob = await compressImage(file);

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", compressedBlob);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudRes = await fetch(CLOUDINARY_URL, { method:"POST", body:formData });
      const cloudData = await cloudRes.json();

      if(!cloudData.secure_url){
        alert("Cloudinary upload failed!");
        document.getElementById("progress").style.display = "none";
        return;
      }

      const imageUrl = cloudData.secure_url;

      // Send to Google Sheet via Web App
      const sheetData = new FormData();
      sheetData.append("title", title);
      sheetData.append("date", date);
      sheetData.append("description", desc);
      sheetData.append("image", imageUrl);

      const sheetRes = await fetch(WEB_APP_URL, { method:"POST", body: sheetData });
      const sheetJson = await sheetRes.json();

      if(sheetJson.status === "success"){
        alert("Achievement added successfully!");
        document.getElementById("title").value = "";
        document.getElementById("date").value = "";
        document.getElementById("desc").value = "";
        fileInput.value = "";
      } else {
        alert("Error saving to Sheet: " + sheetJson.message);
      }

    } catch(err){
      alert("Error: " + err.message);
      console.error(err);
    } finally {
      document.getElementById("progress").style.display = "none";
    }
  }