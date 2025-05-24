(function() {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(form) {
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      const loading = form.querySelector('.loading');
      const errorMsg = form.querySelector('.error-message');
      const sentMsg = form.querySelector('.sent-message');
      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.disabled = true;
      if (loading) loading.classList.add('d-block');
      if (errorMsg) errorMsg.classList.remove('d-block');
      if (sentMsg) sentMsg.classList.remove('d-block');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (loading) loading.classList.remove('d-block');
        if (submitBtn) submitBtn.disabled = false;
        if (response.ok) {
          alert('Successfully Send Message');
          form.reset();
        } else {
          const data = await response.json();
          if (errorMsg) {
            errorMsg.innerHTML = data.errors ? data.errors.map(e => e.message).join('<br>') : 'Form submission failed.';
            errorMsg.classList.add('d-block');
          }
        }
      } catch (error) {
        if (loading) loading.classList.remove('d-block');
        if (submitBtn) submitBtn.disabled = false;
        if (errorMsg) {
          errorMsg.innerHTML = 'An error occurred. Please try again later.';
          errorMsg.classList.add('d-block');
        }
      }
    });
  });

})();