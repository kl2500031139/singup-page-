const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const toggleBtn = document.getElementById("toggle-btn");
const message = document.getElementById("message");

let isSignup = true;

// Switch between Signup and Login modes
toggleBtn.addEventListener("click", () => {
  isSignup = !isSignup;
  formTitle.textContent = isSignup ? "Sign Up" : "Login";
  submitBtn.textContent = isSignup ? "Create Account" : "Login";
  toggleBtn.textContent = isSignup 
    ? "Already have an account? Login" 
    : "Need an account? Sign Up";
  message.textContent = "";
});

// Handle Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Basic password length check
  if (password.length < 6) {
    showMessage("Password must be at least 6 characters.", "red");
    return;
  }

  if (isSignup) {
    // Save user to browser localStorage (for practice/testing)
    if (localStorage.getItem(email)) {
      showMessage("Account already exists. Please login.", "red");
    } else {
      localStorage.setItem(email, password);
      showMessage("Signup successful! You can now log in.", "green");
      form.reset();
    }
  } else {
    // Check login credentials
    const storedPassword = localStorage.getItem(email);
    if (storedPassword && storedPassword === password) {
      showMessage("Login successful! Welcome back.", "green");
    } else {
      showMessage("Invalid email or password.", "red");
    }
  }
});

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
}
