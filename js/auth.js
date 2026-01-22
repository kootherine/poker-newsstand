// Password protection logic for Poker Night Newsstand
// Default password: "pokernight" (can be changed by updating the hash)

const AUTH_KEY = 'poker_newsstand_auth';

// SHA-256 hash of the password "pokernight"
const PASSWORD_HASH = 'ba5453b4c0c8f4418502386d2cea118462ea4d3de85578c53e2ad9506160c88d';

// Hash function using Web Crypto API
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'true';
}

// Set authentication status
function setAuthenticated(status) {
    if (status) {
        localStorage.setItem(AUTH_KEY, 'true');
    } else {
        localStorage.removeItem(AUTH_KEY);
    }
}

// Logout function
function logout() {
    setAuthenticated(false);
    window.location.href = 'index.html';
}

// Redirect to newsstand if already authenticated (for login page)
function checkAuthRedirect() {
    if (isAuthenticated()) {
        window.location.href = 'newsstand.html';
    }
}

// Protect page - redirect to login if not authenticated
function protectPage() {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        // Check if already logged in
        checkAuthRedirect();

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const passwordInput = document.getElementById('password');
            const errorMessage = document.getElementById('error-message');
            const password = passwordInput.value;

            // Hash the entered password and compare
            const enteredHash = await hashPassword(password);

            if (enteredHash === PASSWORD_HASH) {
                setAuthenticated(true);
                window.location.href = 'newsstand.html';
            } else {
                errorMessage.textContent = 'Wrong password! Try again.';
                passwordInput.value = '';
                passwordInput.focus();

                // Shake animation
                const loginCard = document.querySelector('.login-card');
                loginCard.classList.add('shake');
                setTimeout(() => loginCard.classList.remove('shake'), 500);
            }
        });
    }
});
