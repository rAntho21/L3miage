const isDaltonisme = localStorage.getItem('daltonisme') ? localStorage.getItem('daltonisme') : 'false';

if (isDaltonisme === 'true') {
    document.body.classList.add('daltonisme');
} else {
    if (document.body.classList.contains('daltonisme')) document.body.classList.remove('daltonisme');
}