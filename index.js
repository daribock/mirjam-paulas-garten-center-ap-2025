function showSuccessModal() {
  // Check multiple ways Bootstrap might be available
  if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    // Bootstrap 5 way
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
  } else if (typeof $ !== 'undefined' && $.fn.modal) {
    // Bootstrap 4 with jQuery way (fallback)
    $('#successModal').modal('show');
  } else if (window.bootstrap && window.bootstrap.Modal) {
    // Another way to check
    const modal = new window.bootstrap.Modal(
      document.getElementById('successModal')
    );
    modal.show();
  } else {
    // Bootstrap not available - use fallback
    console.warn('Bootstrap not available, using fallback');
    alert('Gutschein wurde erfolgreich erstellt!');
  }
}

function updatePreview() {
  const motiv = document.getElementById('motivSelect').value;
  const recipient =
    document.getElementById('recipientName').value || 'Max Mustermann';

  const selectedAmount = document.querySelector(
    'input[name="amountRadio"]:checked'
  );

  let amount;
  if (selectedAmount) {
    if (selectedAmount.value === 'costume') {
      // Use custom amount value
      const customAmount = document.getElementById('wunschbetrag').value;
      amount = customAmount || 'Betrag';
    } else {
      // Use predefined amount
      amount = selectedAmount.value;
    }
  } else {
    amount = 'Betrag';
  }

  const canvas = document.getElementById('voucherCanvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Inter, Arial, sans-serif';
    ctx.textAlign = 'start';

    ctx.fillText(recipient, canvas.width - 2800 / 2, canvas.height - 280);
    ctx.fillText(amount + ' €', canvas.width - 2650 / 2, canvas.height - 185);
  };
  img.src = `assets/images/gutschein/gutschein-${motiv}.png`;
}

// Add event listeners for dynamic validation
document.addEventListener('DOMContentLoaded', function () {
  const motivSelect = document.getElementById('motivSelect');
  const recipientInput = document.getElementById('recipientName');
  const customRadio = document.getElementById('betragCostume');
  const customAmountInput = document.getElementById('wunschbetrag');
  const allRadios = document.querySelectorAll('input[name="amountRadio"]');
  const form = document.querySelector('form');

  form.addEventListener(
    'submit',
    (event) => {
      form.classList.add('was-validated');
      event.preventDefault(); // Always prevent default form submission
      event.stopPropagation();

      if (form.checkValidity()) {
        showSuccessModal();
        console.log('Form submitted successfully!');
      } else {
        console.log('Form validation failed');
      }
    },
    false
  );

  // Function to toggle required attribute
  function toggleCustomAmountRequired() {
    if (customRadio.checked) {
      customAmountInput.setAttribute('required', 'required');
    } else {
      customAmountInput.removeAttribute('required');
      customAmountInput.value = ''; // Clear value when not selected
    }
  }

  motivSelect.addEventListener('change', function () {
    updatePreview();
  });

  recipientInput.addEventListener('input', function () {
    updatePreview();
  });

  // Add event listeners to all radio buttons
  allRadios.forEach((radio) => {
    radio.addEventListener('change', function () {
      toggleCustomAmountRequired();
      updatePreview();
    });
  });

  // Add event listener to custom amount input
  customAmountInput.addEventListener('input', function () {
    if (customRadio.checked) {
      updatePreview();
    }
  });

  // Initial setup
  toggleCustomAmountRequired();

  // Initiale Vorschau
  updatePreview();
});

function downloadVoucher() {
  const canvas = document.getElementById('voucherCanvas');
  canvas.toBlob(function (blob) {
    const link = document.createElement('a');
    link.download = 'paulas_garden_gutschein.png';
    link.href = URL.createObjectURL(blob);
    link.click();
  });
}

/* ANIMATIONEN STYLING */

/* BODY ANIMATION */
// window.addEventListener('load', function () {
//   document.body.style.opacity = '1';
// });

/* ANIMATION KACHELN STARTSEITE + WEITERLEITUNG */
// document.addEventListener('DOMContentLoaded', function () {
//   const kacheln = document.querySelectorAll('.kachel');

//   kacheln.forEach(function (kachel) {
//     const link = kachel.dataset.link; // z. B. <div class="kachel" data-link="lovestory.html">

//     const handleClick = (e) => {
//       e.preventDefault(); // wichtig für touch

//       kachel.classList.add('rotate');

//       setTimeout(() => {
//         kachel.classList.remove('rotate');

//         if (link) {
//           window.location.href = link;
//         }
//       }, 600); // Dauer der Animation + Rückdrehung
//     };

//     kachel.addEventListener('click', handleClick);
//     kachel.addEventListener('touchstart', handleClick, { passive: false });
//   });
// });

/*ANIMATION NAVIGATION */
// document.querySelectorAll('a[href]').forEach(function (link) {
//   const href = link.getAttribute('href');

//   // Nur interne Links
//   if (href && !href.startsWith('#') && !href.startsWith('http')) {
//     link.addEventListener('click', function (e) {
//       e.preventDefault();
//       document.body.classList.remove('loaded'); // Fade-Out
//       setTimeout(() => {
//         window.location.href = href;
//       }, 150); // entspricht CSS-Transition-Zeit
//     });
//   }
// });
