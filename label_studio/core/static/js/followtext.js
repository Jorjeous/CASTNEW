document.addEventListener('DOMContentLoaded', function() {
  const checkInterval = 500; // Interval in milliseconds to check the current time
  let lastCheckedTime = null; // Store the last checked time to determine if the audio is paused

  // Find the script tag with a src that includes 'copypastbutton'
  //const activation = Array.from(document.querySelectorAll('script')).find(script => script.src.includes('copypastbutton'));
    const activation = document.getElementById('asr transcript following')
  // If the script isn't found, don't run the rest of the script
  if (!activation) {
      console.log("copypastbutton script not found, script will not run.");
      return;
  }

  setInterval(() => {
      const timeInput = document.querySelector('.lsf-time-box__input-time');
      if (!timeInput) return;
      
      const currentTime = timeInput.value.split(':').slice(0, 3).join(':');
      const currentTimeInSeconds = timeToSeconds(currentTime);

      // Check if the current time has not changed (audio is paused)
      if (currentTime === lastCheckedTime) {
          // Do not adjust the scroll, but still continue to check for time changes
          return;
      }

      // Update the last checked time
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
});

function timeToSeconds(time) {
  const parts = time.split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);
  return hours * 3600 + minutes * 60 + seconds;
}

function moveToTextInTextarea(text) {
  const textarea = document.querySelector('textarea[aria-label="TextArea Input"][name="asr transcript"]');
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