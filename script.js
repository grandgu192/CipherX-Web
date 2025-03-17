
function encrypt() {
  const message = document.getElementById('message').value;
  const key = document.getElementById('key').value;
  
  if (!message || !key) {
    alert('Please enter both message and key');
    return;
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
