document.querySelector('.php-email-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submit');
    const spinner = submitBtn.querySelector('.spinner');
    const btnText = submitBtn.querySelector('.btn-text');

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      submitBtn.disabled = true;
      btnText.classList.add('hidden');
      spinner.classList.remove('hidden');

      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Failed to send');

      document.querySelector('.sent-message').style.display = 'block';
      document.querySelector('.error-message').style.display = 'none';
    } catch (err) {
      document.querySelector('.error-message').textContent = err.message;
      document.querySelector('.error-message').style.display = 'block';
      document.querySelector('.sent-message').style.display = 'none';
    } finally {
      submitBtn.disabled = false;
      spinner.classList.add('hidden');
      btnText.classList.remove('hidden');
    }
  });
