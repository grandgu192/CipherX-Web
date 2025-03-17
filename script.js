
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

function copyResult() {
  const result = document.getElementById('result').textContent;
  navigator.clipboard.writeText(result)
    .then(() => alert('Copied to clipboard!'))
    .catch(err => alert('Failed to copy: ' + err));
}

function clearAll() {
  document.getElementById('message').value = '';
  document.getElementById('key').value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('strengthIndicator').textContent = 'No key';
}

function checkKeyStrength(key) {
  if (!key) return 'No key';
  if (key.length < 8) return 'Weak';
  if (key.length < 12) return 'Medium';
  return 'Strong';
}

function handleFileUpload() {
  const file = document.getElementById('fileInput').files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('message').value = e.target.result;
    };
    reader.readAsText(file);
  }
}

function downloadResult() {
  const result = document.getElementById('result').textContent;
  if (!result) {
    alert('No result to download');
    return;
  }
  const blob = new Blob([result], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'encrypted-result.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function generateKey() {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode.apply(null, randomBytes));
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
  document.getElementById('strengthIndicator').textContent = checkKeyStrength(key);

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
