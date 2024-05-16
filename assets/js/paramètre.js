const toggleDaltonism = document.getElementById('toggleDaltonism');

const isDaltonismEnabled = localStorage.getItem('isDaltonismEnabled');

if (isDaltonismEnabled === 'true') {
    toggleDaltonism.checked = true;
    document.body.classList.add('daltonism');
} else {
    toggleDaltonism.checked = false;
    document.body.classList.remove('daltonism');
}

toggleDaltonism.addEventListener('change', function() {
    localStorage.setItem('isDaltonismEnabled', toggleDaltonism.checked);

    if (toggleDaltonism.checked) {
        document.body.classList.add('daltonism');
    } else {
        document.body.classList.remove('daltonism');
    }
});
