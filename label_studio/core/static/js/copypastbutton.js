function copyText(event) {
  if (event.target.classList.contains('copy-button')) {
    event.preventDefault();

    var AsrTranscript = document.querySelector('textarea[name="copyarea"]');
    var transcription = document.querySelector('textarea[name="your transcription"]');
    if (AsrTranscript && transcription) {
        transcription.value = AsrTranscript.value;
        
        // Dispatch input and change events
        var inputEvent = new Event('input', { bubbles: true });
        var changeEvent = new Event('change', { bubbles: true });
        transcription.dispatchEvent(inputEvent);
        transcription.dispatchEvent(changeEvent);

        // Find and enable the Add button related to "your transcription"
        var addButton = transcription.closest('.ant-form-item-control-input').querySelector('.ant-btn-primary');
        if (addButton) {
          addButton.disabled = false;
        }
    } else {
        if (!AsrTranscript) console.error('copyarea textarea not found');
        if (!transcription) console.error('Your transcription textarea not found');
    }
  }
}


function replaceAddButtonWithCopy() {
  var AsrTranscriptContainer = document.querySelector('textarea[name="copyarea"]')?.closest('.ant-form-item-control-input');
  var addButton = AsrTranscriptContainer?.querySelector('.ant-btn-primary');

  if (addButton && !addButton.classList.contains('copy-button-added')) {
    addButton.classList.add('copy-button-added'); // Mark the button to avoid repeated processing
    addButton.style.display = 'none'; // Hide the original Add button

    // Create and append a new copy button
    var copyButton = document.createElement('button');
    copyButton.innerText = 'Copy Text Above';
    copyButton.className = 'copy-button ant-btn';
    copyButton.addEventListener('click', copyText);

    addButton.parentNode.insertBefore(copyButton, addButton.nextSibling);
  }
}

const observer = new MutationObserver(mutations => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      replaceAddButtonWithCopy();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

document.addEventListener('DOMContentLoaded', replaceAddButtonWithCopy);
console.log("Script initialized");
