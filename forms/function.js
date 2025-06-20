const form = document.querySelector('form');
const submitBtn = document.getElementById('submit');
const spinner = submitBtn.querySelector('.spinner');
const btnText = submitBtn.querySelector('.btn-text');

form.addEventListener('submit', async (e) => {
e.preventDefault();

submitBtn.disabled = true;
spinner.classList.remove('hidden');
btnText.classList.add('hidden');

try {
    const res = await fetch('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ /* your form data */ }),
    });
    const result = await res.json();
    // handle success
} catch (err) {
    console.error('Submit error:', err);
} finally {
    submitBtn.disabled = false;
    spinner.classList.add('hidden');
    btnText.classList.remove('hidden');
}
});