/**
 * PAULA'S GARDEN - VOUCHER GENERATOR
 * Complete JavaScript for creating digital vouchers
 *
 * REQUIRED HTML ELEMENTS (must have these exact IDs):
 * =====================================================
 * - motivSelect: <select> dropdown for voucher design
 * - recipientName: <input> text field for recipient name
 * - amountRadio: <input type="radio"> buttons for amount selection
 * - betragCostume: <input type="radio"> custom amount option
 * - wunschbetrag: <input> field for custom amount value
 * - voucherCanvas: <canvas> element to display voucher preview
 * - successModal: <div> Bootstrap modal for success message
 * - form: <form> element containing all inputs
 *
 * REQUIRED FILE STRUCTURE:
 * ========================
 * - assets/images/gutschein/gutschein-[design].png (background images)
 * - Bootstrap 5 CSS and JS for modal functionality
 */

// =============================================================================
// PAGE ANIMATION - Simple fade-in effect
// =============================================================================

/**
 * Creates smooth fade-in animation when page loads
 * Just add this CSS to your stylesheet for it to work:
 *
 * <body style="opacity: 0">
 */
function startPageAnimation() {
  // Define the transition: smooth opacity change over 0.5 seconds
  document.body.style.transition = 'opacity 0.5s ease-in-out';

  // Small delay to ensure DOM is ready, then start fade-in
  setTimeout(() => {
    // Set final state: fully visible
    document.body.style.opacity = '1';
  }, 100);
}

// =============================================================================
// VOUCHER PREVIEW FUNCTIONS - Draw voucher on canvas
// =============================================================================

/**
 * Updates the voucher preview whenever something changes
 * Gets all form values and redraws the canvas
 */
function updateVoucherPreview() {
  // Get design choice from dropdown (REQUIRED: motivSelect)
  const design = document.getElementById('motivSelect').value;

  // Get recipient name (REQUIRED: recipientName)
  const name =
    document.getElementById('recipientName').value || 'Max Mustermann';

  // Get selected amount from radio buttons
  const amount = getSelectedAmount();

  // Draw everything on the canvas
  drawVoucherOnCanvas(design, name, amount);
}

/**
 * Gets the currently selected amount from radio buttons
 * Handles both fixed amounts (10€, 25€, etc.) and custom amounts
 */
function getSelectedAmount() {
  // Find which radio button is selected (REQUIRED: name="amountRadio")
  const selectedRadio = document.querySelector(
    'input[name="amountRadio"]:checked'
  );

  // If nothing selected, return default
  if (!selectedRadio) {
    return 'Betrag';
  }

  // Check if custom amount is selected (REQUIRED: value="costume")
  if (selectedRadio.value === 'costume') {
    // Get custom amount value (REQUIRED: wunschbetrag)
    const customAmount = document.getElementById('wunschbetrag').value;
    return customAmount || 'Betrag';
  }

  // Return the fixed amount (10, 25, 50, 100)
  return selectedRadio.value;
}

/**
 * Draws the voucher on the canvas element
 * Loads background image and adds text on top
 */
function drawVoucherOnCanvas(design, recipientName, amount) {
  // Get canvas element (REQUIRED: voucherCanvas)
  const canvas = document.getElementById('voucherCanvas');
  if (!canvas) return; // Exit if canvas doesn't exist

  // Get drawing context
  const ctx = canvas.getContext('2d');

  // Create image object for background
  const backgroundImage = new Image();

  // When image loads, draw everything
  backgroundImage.onload = function () {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Set text style
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Inter, Arial, sans-serif';
    ctx.textAlign = 'start';

    // Draw recipient name
    ctx.fillText(recipientName, canvas.width - 2800 / 2, canvas.height - 280);

    // Draw amount with € symbol
    ctx.fillText(amount + ' €', canvas.width - 2650 / 2, canvas.height - 185);
  };

  // Start loading background image (REQUIRED: correct file path)
  backgroundImage.src = `assets/images/gutschein/gutschein-${design}.png`;
}

// =============================================================================
// FORM VALIDATION - Handle custom amount requirements
// =============================================================================

/**
 * Makes custom amount field required only when custom option is selected
 * Clears field when other options are chosen
 */
function updateCustomAmountRequirement() {
  // Get custom amount elements (REQUIRED: these exact IDs)
  const customRadio = document.getElementById('betragCostume');
  const customInput = document.getElementById('wunschbetrag');

  if (customRadio.checked) {
    // Make field required when custom option selected
    customInput.setAttribute('required', 'required');
  } else {
    // Remove requirement and clear field for other options
    customInput.removeAttribute('required');
    customInput.value = '';
  }
}

// =============================================================================
// SUCCESS MODAL - Show success message after form submission
// =============================================================================

/**
 * Shows success modal using Bootstrap
 * Falls back to alert if Bootstrap isn't available
 */
function showSuccessMessage() {
  // Try to use Bootstrap modal (REQUIRED: successModal)
  if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
  } else {
    // Fallback if Bootstrap not loaded
    alert('Gutschein wurde erfolgreich erstellt!');
  }
}

/**
 * Sets up automatic redirect when modal is closed
 * Goes back to main voucher page
 */
function setupModalRedirect() {
  const modal = document.getElementById('successModal');
  if (modal) {
    // Listen for modal close event
    modal.addEventListener('hidden.bs.modal', function () {
      window.location.href = 'freude-schenken.html';
    });
  }
}

// =============================================================================
// MAIN SETUP - Everything starts here when page loads
// =============================================================================

/**
 * Main function that runs when page is ready
 * Sets up all event listeners and initializes the voucher system
 */
document.addEventListener('DOMContentLoaded', function () {
  // Start page animation immediately
  startPageAnimation();

  // Get all form elements (REQUIRED: these exact IDs/selectors)
  const form = document.querySelector('form');
  const designSelect = document.getElementById('motivSelect');
  const nameInput = document.getElementById('recipientName');
  const customRadio = document.getElementById('betragCostume');
  const customInput = document.getElementById('wunschbetrag');
  const allAmountRadios = document.querySelectorAll(
    'input[name="amountRadio"]'
  );

  // Setup modal redirect behavior
  setupModalRedirect();

  // === FORM SUBMISSION ===
  if (form) {
    form.addEventListener('submit', function (event) {
      // Prevent normal form submission
      event.preventDefault();
      event.stopPropagation();

      // Add Bootstrap validation styling
      form.classList.add('was-validated');

      // Check if form is valid
      if (form.checkValidity()) {
        // Form is valid - show success
        showSuccessMessage();
        console.log('Form submitted successfully!');
      } else {
        // Form has errors - let Bootstrap show them
        console.log('Form validation failed');
      }
    });
  }

  // === REAL-TIME PREVIEW UPDATES ===

  // Update preview when design changes
  if (designSelect) {
    designSelect.addEventListener('change', updateVoucherPreview);
  }

  // Update preview when name changes
  if (nameInput) {
    nameInput.addEventListener('input', updateVoucherPreview);
  }

  // Update preview when amount selection changes
  allAmountRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      updateCustomAmountRequirement();
      updateVoucherPreview();
    });
  });

  // Update preview when custom amount value changes
  if (customInput) {
    customInput.addEventListener('input', function () {
      if (customRadio && customRadio.checked) {
        updateVoucherPreview();
      }
    });
  }

  // === INITIAL SETUP ===

  // Set initial state for custom amount field
  updateCustomAmountRequirement();

  // Create initial voucher preview
  updateVoucherPreview();

  // Log success for debugging
  console.log("Paula's Garden Voucher System ready!");
});

/**
 * ============================================================================
 * SETUP CHECKLIST FOR IMPLEMENTATION:
 * ============================================================================
 *
 * ✅ HTML ELEMENTS NEEDED:
 * - <select id="motivSelect"> for design selection
 * - <input id="recipientName"> for recipient name
 * - <input type="radio" name="amountRadio"> for amount options
 * - <input type="radio" id="betragCostume" value="costume"> for custom amount
 * - <input id="wunschbetrag"> for custom amount value
 * - <canvas id="voucherCanvas"> for voucher preview
 * - <div id="successModal"> Bootstrap modal for success message
 * - <form> element wrapping all inputs
 *
 * ✅ FILES NEEDED:
 * - assets/images/gutschein/gutschein-roses.png
 * - assets/images/gutschein/gutschein-flower-power.png
 * - assets/images/gutschein/gutschein-bees.png
 * - assets/images/gutschein/gutschein-halloween.png
 *
 * ✅ INLINE STYLE FOR FADE-IN ANIMATION:
 * - <body style="opacity: 0">
 *
 * ✅ EXTERNAL LIBRARIES:
 * - Bootstrap 5 CSS and JS for modal functionality
 */
