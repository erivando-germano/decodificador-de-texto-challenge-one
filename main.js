const input = document.querySelector('textarea#text-input-field');
const output = document.querySelector('div.text-output-field');
const btnEncrypt = document.querySelector('button.btn-encrypt');
const btnDecrypt = document.querySelector('button.btn-decrypt');
const btnCopy = document.createElement('button');
const invalidTextAlertBox = document.createElement('div');

// Configurações iniciais para o botão de cópia
btnCopy.innerText = 'Copiar';
btnCopy.classList.add('btn');

// Configurações iniciais para o alerta de texto inválido
invalidTextAlertBox.innerHTML = '<p>Texto inválido! Por favor, insira um texto com letras minúsculas e sem acentos.</p><button onclick="removeBoxAlert()">X</button>';
invalidTextAlertBox.classList.add('box-alert');

let removeBoxAlertIn10Seconds = undefined;

const encrypt = (text) => {
  const encryptionMap = {
    'e': 'enter',
    'o': 'ober',
    'i': 'imes',
    'a': 'ai',
    'u': 'ufat'
  };

  return text.replaceAll(/[eoiau]/g, match => encryptionMap[match]);
};

const decrypt = (text) => {
  const decryptionMap = {
    'enter': 'e',
    'ober': 'o',
    'imes': 'i',
    'ai': 'a',
    'ufat': 'u'
  };

  return text.replaceAll(/(enter|ober|imes|ai|ufat)/g, match => decryptionMap[match]);
};

const validateText = (text) => {
  return !/[A-ZÀ-ü]/.test(text);
}; 

const removeBoxAlert = () => {
  const box = document.querySelector('body div.container div.box-alert');
  if (box) {
    document.querySelector('body div.container').removeChild(invalidTextAlertBox);
    clearTimeout(removeBoxAlertIn10Seconds);
  }
};

const updateCopyButtonState = (isDisabled) => {
  btnCopy.innerText = isDisabled ? 'Copiado!' : 'Copiar';
  btnCopy.disabled = isDisabled;
};

const displayOutput = (text) => {
  output.innerHTML = `<div class="text-output">${text}</div>`;
  output.append(btnCopy);
};

const handleButtonClick = (action) => {
  const isValidText = validateText(input.value);
  if (input.value && isValidText) {
    const result = action(input.value);
    displayOutput(result);
    updateCopyButtonState(false);
  } else {
    removeBoxAlert();

    if (removeBoxAlertIn10Seconds) {
      clearTimeout(removeBoxAlertIn10Seconds);
    }

    const body = document.querySelector('body div.container');
    body.append(invalidTextAlertBox);

    removeBoxAlertIn10Seconds = setTimeout(() => {
      body.removeChild(invalidTextAlertBox);
    }, 10 * 1000);
  }
};

// Adicionando ouvintes de eventos aos botões
btnEncrypt.addEventListener('click', () => handleButtonClick(encrypt));
btnDecrypt.addEventListener('click', () => handleButtonClick(decrypt));
btnCopy.addEventListener('click', () => {
  const text = document.querySelector('div.text-output').innerText;
  navigator.clipboard.writeText(text);
  updateCopyButtonState(true);
});
