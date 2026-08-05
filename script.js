const passwordDisplay = document.getElementById('password-display');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length');
const lengthVal = document.getElementById('length-val');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const strengthText = document.getElementById('strength-text');

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// Update length display on slider change
lengthSlider.addEventListener('input', () => {
    lengthVal.textContent = lengthSlider.value;
});

// Generate Password Function
function generatePassword() {
    let chars = "";
    if (uppercaseEl.checked) chars += upperChars;
    if (lowercaseEl.checked) chars += lowerChars;
    if (numbersEl.checked) chars += numberChars;
    if (symbolsEl.checked) chars += symbolChars;

    if (chars === "") {
        alert("Please select at least one character type!");
        return;
    }

    let password = "";
    const length = lengthSlider.value;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    passwordDisplay.textContent = password;
    evaluateStrength(length, uppercaseEl.checked, lowercaseEl.checked, numbersEl.checked, symbolsEl.checked);
}

// Password Strength Evaluator
function evaluateStrength(length, hasUpper, hasLower, hasNum, hasSym) {
    let score = 0;
    if (length >= 10) score++;
    if (length >= 16) score++;
    if (hasUpper && hasLower) score++;
    if (hasNum) score++;
    if (hasSym) score++;

    if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthText.style.color = "#ef4444";
    } else if (score <= 4) {
        strengthText.textContent = "Medium";
        strengthText.style.color = "#facc15";
    } else {
        strengthText.textContent = "Strong";
        strengthText.style.color = "#22c55e";
    }
}

// Copy Password to Clipboard
copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.textContent;
    if (!password) return;

    navigator.clipboard.writeText(password);
    
    // Change icon temporarily to checkmark
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
    }, 1500);
});

// Event Listeners
generateBtn.addEventListener('click', generatePassword);

// Generate password on page load
generatePassword();