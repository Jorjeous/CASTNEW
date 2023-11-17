function copyText(event) {
  if (event.target.classList.contains('copy-button')) {
    event.preventDefault();

    var groundTruth = document.querySelector('textarea[name="ground truth"]');
    var transcription = document.querySelector('textarea[name="your transcription"]');
    if (groundTruth && transcription) {
        transcription.value = groundTruth.value;
        
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
        if (!groundTruth) console.error('Ground truth textarea not found');
        if (!transcription) console.error('Your transcription textarea not found');
    }
  }
}


function replaceAddButtonWithCopy() {
  var groundTruthContainer = document.querySelector('textarea[name="ground truth"]')?.closest('.ant-form-item-control-input');
  var addButton = groundTruthContainer?.querySelector('.ant-btn-primary');

  if (addButton && !addButton.classList.contains('copy-button-added')) {
    addButton.classList.add('copy-button-added'); // Mark the button to avoid repeated processing
    addButton.style.display = 'none'; // Hide the original Add button

    // Create and append a new copy button
    var copyButton = document.createElement('button');
    copyButton.innerText = 'Copy Ground Truth';
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



// function copyText() {
//   var groundTruth = document.querySelector('textarea[name="ground truth"]');
//   var transcription = document.querySelector('textarea[name="your transcription"]');
//   console.log("copyText function called");
//   if (groundTruth && transcription) {
//       transcription.value = groundTruth.value;
//       var event = new Event('input', { bubbles: true });
//       transcription.dispatchEvent(event);
//   } else {
//       if (!groundTruth) console.error('Ground truth textarea not found');
//       if (!transcription) console.error('Your transcription textarea not found');
//   }
// }
// function copyText(event) {
//   // Prevent the default action (like form submission) from occurring
//   event.preventDefault();

//   var groundTruth = document.querySelector('textarea[name="ground truth"]');
//   var transcription = document.querySelector('textarea[name="your transcription"]');
//   console.log("copyText function called");
//   if (groundTruth && transcription) {
//       transcription.value = groundTruth.value;
//       var inputEvent = new Event('input', { bubbles: true });
//       transcription.dispatchEvent(inputEvent);
//   } else {
//       if (!groundTruth) console.error('Ground truth textarea not found');
//       if (!transcription) console.error('Your transcription textarea not found');
//   }
// }




// function copyText(event) {
//   // Check if the event target has the 'copy-button' class
//   if (event.target.classList.contains('copy-button')) {
//     // Prevent the default action (like form submission) from occurring
//     event.preventDefault();

//     var groundTruth = document.querySelector('textarea[name="ground truth"]');
//     var transcription = document.querySelector('textarea[name="your transcription"]');
//     console.log("copyText function called");
//     if (groundTruth && transcription) {
//         transcription.value = groundTruth.value;
//         var inputEvent = new Event('input', { bubbles: true });
//         transcription.dispatchEvent(inputEvent);
//     } else {
//         if (!groundTruth) console.error('Ground truth textarea not found');
//         if (!transcription) console.error('Your transcription textarea not found');
//     }
//   }
// }

// function replaceAddButtonWithCopy() {
//   var groundTruthContainer = document.querySelector('textarea[name="ground truth"]')?.closest('.ant-form-item-control-input');
//   var addButton = groundTruthContainer?.querySelector('.ant-btn-primary');
//   console.log("in replace")

//   if (addButton && !addButton.classList.contains('copy-button-added')) {
//     addButton.classList.add('copy-button-added'); // Mark the button to avoid repeated processing
//     addButton.style.display = 'none'; // Hide the original Add button

//     // Create and append a new copy button
//     var copyButton = document.createElement('button');
//     copyButton.innerText = 'Copy Ground Truth';
//     copyButton.className = 'copy-button ant-btn';
//     copyButton.addEventListener('click', copyText);

//     addButton.parentNode.insertBefore(copyButton, addButton.nextSibling);
//   }
// }

// const observer = new MutationObserver(mutations => {
//   for (let mutation of mutations) {
//     if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
//       replaceAddButtonWithCopy();
//     }
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// document.addEventListener('DOMContentLoaded', replaceAddButtonWithCopy);
// console.log("Script initialized");

//worked well, almost
// function copyText() {
//   var groundTruth = document.querySelector('textarea[name="ground truth"]');
//   var transcription = document.querySelector('textarea[name="your transcription"]');
//   console.log("copyText function called");
//   if (groundTruth && transcription) {
//       transcription.value = groundTruth.value;
//       var event = new Event('input', { bubbles: true });
//       transcription.dispatchEvent(event);
//   } else {
//       if (!groundTruth) console.error('Ground truth textarea not found');
//       if (!transcription) console.error('Your transcription textarea not found');
//   }
// }

// function replaceAddButtonWithCopy() {
//   var groundTruthContainer = document.querySelector('textarea[name="ground truth"]')?.closest('.lsf-text-area');
//   var addButton = groundTruthContainer?.querySelector('.ant-btn-primary');

//   if (addButton && !addButton.classList.contains('copy-button-added')) {
//     addButton.classList.add('copy-button-added'); // Mark the button to avoid repeated processing

//     // Create and append a new copy button
//     var copyButton = document.createElement('button');
//     copyButton.innerText = 'Copy Ground Truth';
//     copyButton.className = 'copy-button ant-btn';
//     copyButton.addEventListener('click', copyText);

//     addButton.parentNode.insertBefore(copyButton, addButton.nextSibling);
//   }
// }

// const observer = new MutationObserver(mutations => {
//   for (let mutation of mutations) {
//     if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
//       replaceAddButtonWithCopy();
//     }
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// document.addEventListener('DOMContentLoaded', replaceAddButtonWithCopy);
// console.log("Script initialized");



//work fine
// function copyText() {
//   var groundTruth = document.querySelector('textarea[name="ground truth"]');
//   var transcription = document.querySelector('textarea[name="your transcription"]');
//   console.log("Here 143");
//   console.log("Here 1430001");
//   if (groundTruth && transcription) {
//       transcription.value = groundTruth.value;
//       var event = new Event('input', { bubbles: true });
//       transcription.dispatchEvent(event);
//   } else {
//       if (!groundTruth) console.error('Ground truth textarea not found');
//       if (!transcription) console.error('Your transcription textarea not found');
//   }
// }

// function replaceAddButtonWithCopy() {
//   var groundTruthContainer = document.querySelector('textarea[name="ground truth"]').closest('.lsf-text-area');
//   var addButton = groundTruthContainer.querySelector('.ant-btn-primary');

//   if (addButton) {
//     addButton.remove(); // Remove the original Add button

//     // Create and append a new copy button
//     var copyButton = document.createElement('button');
//     copyButton.innerText = 'Copy Ground Truth';
//     copyButton.className = 'copy-button ant-btn';
//     copyButton.addEventListener('click', copyText);

//     var controlInputContent = groundTruthContainer.querySelector('.ant-form-item-control-input-content');
//     controlInputContent.appendChild(copyButton);
//   } else {
//     console.error("Add button not found in ground truth container.");
//   }
// }

// const observer = new MutationObserver(replaceAddButtonWithCopy);
// observer.observe(document.body, { childList: true, subtree: true });
// console.log("Here 234")

// document.addEventListener('DOMContentLoaded', replaceAddButtonWithCopy);


// function copyText() {
//   var groundTruth = document.querySelector('textarea[name="ground truth"]');
//   var transcription = document.querySelector('textarea[name="your transcription"]');
//   console.log("Here 839");
//   if (groundTruth && transcription) {
//       transcription.value = groundTruth.value;
//       var event = new Event('input', { bubbles: true });
//       transcription.dispatchEvent(event);
//   } else {
//       if (!groundTruth) console.error('Ground truth textarea not found');
//       if (!transcription) console.error('Your transcription textarea not found');
//   }
// }
// console.log("Here 551");
// function replaceAddButtonWithCopyButton() {
//   var groundTruth = document.querySelector('textarea[name="ground truth"]');
//   var isGroundTruthPresent = groundTruth !== null && groundTruth.value.trim() !== '';

//   // Update selector to match the button more accurately
//   var firstAddButton = document.querySelector('.ant-form-item-control-input-content .ant-btn-primary');
  
//   if (firstAddButton && isGroundTruthPresent) {
//       console.log("First Add button found, replacing it with copy button.");

//       // Create copy button
//       var copyButton = document.createElement('button');
//       copyButton.innerText = 'Copy Ground Truth';
//       copyButton.className = 'copy-button ant-btn';
//       copyButton.type = 'button';
//       copyButton.addEventListener('click', copyText);

//       // Replace the Add button with the Copy button
//       firstAddButton.parentElement.replaceChild(copyButton, firstAddButton);
//   } else {
//       if (!firstAddButton) console.log("First Add button not found.");
//       if (!isGroundTruthPresent) console.log("Ground truth not present.");
//   }
// }

// const observer = new MutationObserver(replaceAddButtonWithCopyButton);
// console.log("Here 142");
// observer.observe(document.body, { childList: true, subtree: true });

// document.addEventListener('DOMContentLoaded', replaceAddButtonWithCopyButton);


// function copyText() {
//   var groundTruth = document.querySelector('textarea[name="ground truth"]');
//   var transcription = document.querySelector('textarea[name="your transcription"]');
  
//   if (groundTruth && transcription) {
//       transcription.value = groundTruth.value;
//       var event = new Event('input', { bubbles: true });
//       transcription.dispatchEvent(event);
//   } else {
//       if (!groundTruth) console.error('Ground truth textarea not found');
//       if (!transcription) console.error('Your transcription textarea not found');
//   }
// }

// function appendCopyButtonIfNeeded() {
//   var groundTruth = document.querySelector('textarea[name="ground truth"]');
//   var isGroundTruthPresent = groundTruth !== null && groundTruth.value.trim() !== '';

//   var firstAddButton = document.querySelector('textarea[name="ground truth"] + div .ant-btn');
//   if (firstAddButton) {
//       console.log("First Add button found, hiding it.");
//       firstAddButton.style.display = 'none';
//   } else {
//       console.log("First Add button not found.");
//   }

//   var lastTranscriptionContainer = document.querySelector('.lsf-text-area:last-child');
//   if (lastTranscriptionContainer && isGroundTruthPresent) {
//       var controlInputContent = lastTranscriptionContainer.querySelector('.ant-form-item-control-input-content');
//       if (!controlInputContent.querySelector('button.copy-button')) {
//           console.log("Appending copy button.");
//           var copyButton = document.createElement('button');
//           copyButton.innerText = 'Copy Ground Truth';
//           copyButton.className = 'copy-button ant-btn';
//           copyButton.addEventListener('click', copyText);

//           if (firstAddButton) {
//               firstAddButton.parentElement.appendChild(copyButton);
//           } else {
//               controlInputContent.appendChild(copyButton);
//           }
//       } else {
//           console.log("Copy button already present.");
//       }
//   } else {
//       console.log("Last transcription container not found or ground truth not present.");
//   }
// }

// const observer = new MutationObserver(appendCopyButtonIfNeeded);
// observer.observe(document.body, { childList: true, subtree: true });

// document.addEventListener('DOMContentLoaded', appendCopyButtonIfNeeded);




//almost workin
// // Function to copy text from ground truth to transcription
// function copyText() {
//     var groundTruth = document.querySelector('textarea[name="ground truth"]');
//     var transcription = document.querySelector('textarea[name="your transcription"]');
    
//     if (groundTruth && transcription) {
//       transcription.value = groundTruth.value;
//       // Trigger a change event to ensure any handlers attached to the transcription field are notified
//       var event = new Event('input', { bubbles: true });
//       transcription.dispatchEvent(event);
//     } else {
//       // Log errors
//       if (!groundTruth) console.error('Ground truth textarea not found');
//       if (!transcription) console.error('Transcription textarea not found');
//     }
//   }
  
//   // Function to check for the container and append the button if ground truth is present
//   // function appendCopyButtonIfNeeded() {
//   //   // Check if the ground truth textarea is present and not empty
//   //   var groundTruth = document.querySelector('textarea[name="ground truth"]');
//   //   var isGroundTruthPresent = groundTruth !== null && groundTruth.value.trim() !== '';
    
//   //   // Find the last .lsf-text-area which should be "Your Transcription"
//   //   var transcriptionContainers = document.querySelectorAll('.lsf-text-area');
//   //   var lastTranscriptionContainer = transcriptionContainers[transcriptionContainers.length - 1];
  
//   //   if (lastTranscriptionContainer && isGroundTruthPresent) {
//   //     var controlInputContent = lastTranscriptionContainer.querySelector('.ant-form-item-control-input-content');
//   //     if (controlInputContent && !controlInputContent.querySelector('button.copy-button')) {
//   //       var copyButton = document.createElement('button');
//   //       copyButton.innerText = 'Copy Ground Truth';
//   //       copyButton.className = 'copy-button ant-btn'; // Add 'ant-btn' to apply Ant Design styles
//   //       copyButton.addEventListener('click', copyText);
//   //       controlInputContent.appendChild(copyButton); // Append the copy button after the "Add" button
//   //     }
//   //   }
//   // }
//   function appendCopyButtonIfNeeded() {
//     var groundTruth = document.querySelector('text[name="ground truth"]');
//     var isGroundTruthPresent = groundTruth !== null && groundTruth.value.trim() !== '';
//     var transcriptionContainers = document.querySelectorAll('.lsf-text-area');
//     var lastTranscriptionContainer = transcriptionContainers[transcriptionContainers.length - 1];

//     // Find the first "Add" button and hide it
//     var firstAddButton = document.querySelector('textarea[name="ground truth"] + div .ant-btn');
//     if (firstAddButton) {
//         firstAddButton.style.display = 'none';
//     }

//     if (lastTranscriptionContainer && isGroundTruthPresent) {
//         var controlInputContent = lastTranscriptionContainer.querySelector('.ant-form-item-control-input-content');
//         if (controlInputContent && !controlInputContent.querySelector('button.copy-button')) {
//             var copyButton = document.createElement('button');
//             copyButton.innerText = 'Copy Ground Truth';
//             copyButton.className = 'copy-button ant-btn';
//             copyButton.addEventListener('click', copyText);

//             // Move the copy button to the location of the first "Add" button
//             if (firstAddButton) {
//                 firstAddButton.parentElement.appendChild(copyButton);
//             } else {
//                 controlInputContent.appendChild(copyButton); // Append at the end if first button not found
//             }
//         }
//     }
// }

  

//   const config = { attributes: false, childList: true, subtree: true };
  

//   const callback = function(mutationsList, observer) {
//     for (let mutation of mutationsList) {
//       if (mutation.type === 'childList') {
//         appendCopyButtonIfNeeded();
//       }
//     }
//   };
  
//   const observer = new MutationObserver(callback);
  
//   observer.observe(document.body, config);
  
//   document.addEventListener('DOMContentLoaded', appendCopyButtonIfNeeded);
  


// function copyText() {
//     var groundTruth = document.querySelector('textarea[name="ground_truth"]');
//     var transcription = document.querySelector('textarea[name="transcription"]');
    
//     if (groundTruth && transcription) {
//       transcription.value = groundTruth.value;

//       var event = new Event('input', { bubbles: true });
//       transcription.dispatchEvent(event);
//     } else {
     
//       if (!groundTruth) console.error('Ground truth textarea not found');
//       if (!transcription) console.error('Transcription textarea not found');
//     }
//   }

//   function appendCopyButtonIfNeeded() {
   
//     var transcriptionContainers = document.querySelectorAll('.lsf-text-area');
//     var lastTranscriptionContainer = transcriptionContainers[transcriptionContainers.length - 1];
  
//     if (lastTranscriptionContainer) {
//       var controlInputContent = lastTranscriptionContainer.querySelector('.ant-form-item-control-input-content');
//       if (controlInputContent && !controlInputContent.querySelector('button.copy-button')) {
//         var copyButton = document.createElement('button');
//         copyButton.innerText = 'Copy Ground Truth';
//         copyButton.className = 'copy-button ant-btn'; // Add 'ant-btn' to apply Ant Design styles
//         copyButton.addEventListener('click', copyText);
//         controlInputContent.appendChild(copyButton); // Append the copy button after the "Add" button
//       }
//     } else {
//       console.error('Transcription container not found');
//     }
//   }
  

//   const config = { attributes: false, childList: true, subtree: true };
  

//   const callback = function(mutationsList, observer) {
//     for (let mutation of mutationsList) {
//       if (mutation.type === 'childList') {
//         appendCopyButtonIfNeeded();
//       }
//     }
//   };

//   const observer = new MutationObserver(callback);

//   observer.observe(document.body, config);

//   document.addEventListener('DOMContentLoaded', function() {
//     appendCopyButtonIfNeeded();
//   });