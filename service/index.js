
const API_BASE_URL = "https://tunga-diary-api.onrender.com/api/fullstack";

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();   

        if (!response.ok) {
          console.error('Error from API:', data);
          throw new Error(data.message || 'Invalid email or password');
        }

        // Save token to localStorage
        localStorage.setItem('token', data.token);

        // alert('Login successful!');
        window.location.href = 'view-entry.html'; 
      } catch (error) {
        console.error('Login failed:', error.message);
        alert('Login failed. Please check your email and password.');
      }
    });
  }
});
