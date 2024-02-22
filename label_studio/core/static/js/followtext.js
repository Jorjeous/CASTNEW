document.addEventListener('DOMContentLoaded', function() {
  const checkInterval = 500; // Interval in milliseconds to check the current time
  let activationCheckInterval;
  let lastCheckedTime = null; // Initialize lastCheckedTime outside of activateScript to retain its value

  var activation = document.querySelector('textarea[aria-label="TextArea Input"][name="asr transcript following"]');
  if (!activation) {
    // Set an interval to check for the activation block periodically.
    activationCheckInterval = setInterval(() => {
      var retryActivation = document.querySelector('textarea[aria-label="TextArea Input"][name="asr transcript following"]');
      if (retryActivation) {
        clearInterval(activationCheckInterval); // Clear the interval once the activation block is found
        activateScript(lastCheckedTime); // Pass lastCheckedTime to the function
      }
    }, 1000); // Check every second
  } else {
    activateScript(lastCheckedTime); // Pass lastCheckedTime to the function
  }
});

function activateScript(lastCheckedTime) {
  const checkInterval = 500; // Use the same interval as before for consistency

  setInterval(() => {
    const timeInput = document.querySelector('.lsf-time-box__input-time');
    if (!timeInput) return;
    
    const currentTime = timeInput.value.split(':').slice(0, 3).join(':');
    const currentTimeInSeconds = timeToSeconds(currentTime);

    // Use lastCheckedTime to determine if the audio has paused
    if (currentTime === lastCheckedTime) {
      console.log("Audio paused or stopped.");
      return; // Exit the function to stop further execution until the next interval
    }

    // Update lastCheckedTime with the current time
    lastCheckedTime = currentTime;


    let foundMatch = false;
    const phrases = document.querySelectorAll('.phrase--aebVH');

    phrases.forEach(phrase => {
      if (foundMatch) return; // Skip further checks once a match is found

      const timeRangeText = phrase.querySelector('.time--sVFWW').textContent;
      const [startTime, endTime] = timeRangeText.split(' - ').map(timeToSeconds);

      if (currentTimeInSeconds >= startTime && currentTimeInSeconds <= endTime) {
        const dialogueText = phrase.querySelector('.dialoguetext--PGM5N').textContent.trim();
        foundMatch = moveToTextInTextarea(dialogueText);
      }
    });

    if (!foundMatch) {
      console.log("No matching text found for current time:", currentTime);
    }
  }, checkInterval);
}

function timeToSeconds(time) {
  const parts = time.split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);
  return hours * 3600 + minutes * 60 + seconds;
}

function moveToTextInTextarea(text) {
  const textarea = document.querySelector('textarea[aria-label="TextArea Input"][name="asr transcript following"]');
  if (!textarea) {
      console.error("Textarea for ASR transcript not found");
      return false;
  }

  const index = textarea.value.indexOf(text);
  if (index === -1) {
      console.warn("Text not found in textarea:", text);
      return false;
  }

  textarea.focus();
  textarea.setSelectionRange(index, index + text.length);

  setTimeout(() => {
      // Only adjust scroll if the audio is not paused (checked by the interval function)
      adjustScrollToSelection(textarea);
  }, 100); // Delay to allow for UI update

  return true;
}

function adjustScrollToSelection(textarea) {
  const selectionHeight = textarea.scrollHeight * (textarea.selectionEnd - textarea.selectionStart) / textarea.value.length;
  const selectionMiddle = textarea.scrollHeight * textarea.selectionStart / textarea.value.length + selectionHeight / 2;
  const visibleTop = textarea.scrollTop;
  const visibleBottom = visibleTop + textarea.clientHeight;

  if (selectionMiddle < visibleTop || selectionMiddle > visibleBottom) {
      textarea.scrollTop = selectionMiddle - textarea.clientHeight / 2;
  }

  const currentRow = textarea.value.substring(0, textarea.selectionStart).split("\n").length;
  console.log("Current Row (approx.):", currentRow);
}
