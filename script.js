
function changeTheme() {
  const theme = document.getElementById('themeSelect').value;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.getElementById('themeSelect').value = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
});

function generateKey(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
}

function encrypt() {
  const message = document.getElementById('message').value;
  let key = document.getElementById('key').value;
  
  if (!message) {
    alert('Please enter a message to encrypt');
    return;
  }
  
  if (!key) {
    key = generateKey();
    document.getElementById('key').value = key;
  }

  try {
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    document.getElementById('result').textContent = encrypted;
  } catch (error) {
    alert('Encryption failed: ' + error.message);
  }
}

function decrypt() {
  const encrypted = document.getElementById('message').value;
  const key = document.getElementById('key').value;
  
  if (!encrypted || !key) {
    alert('Please enter both encrypted message and key');
    return;
  }

  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, key);
    const originalText = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!originalText) {
      throw new Error('Invalid key or message');
    }
    
    document.getElementById('result').textContent = originalText;
  } catch (error) {
    alert('Decryption failed: ' + error.message);
  }
}
