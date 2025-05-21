document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector("button[type='submit']");
  const loading = form.querySelector(".loading");
  const errorMsg = form.querySelector(".error-message");
  const successMsg = form.querySelector(".success-message");

  // Show loading, hide messages
  submitBtn.disabled = true;
  loading.style.display = "block";
  errorMsg.style.display = "none";
  successMsg.style.display = "none";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    const result = await response.json();

    if (result.ok) {
      successMsg.style.display = "block";
      form.reset(); // Clear form
    } else {
      throw new Error(result.error || "Failed to send");
    }
  } catch (error) {
    errorMsg.textContent = error.message;
    errorMsg.style.display = "block";
  } finally {
    loading.style.display = "none";
    submitBtn.disabled = false;
  }
});