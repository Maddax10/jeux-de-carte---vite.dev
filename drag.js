const $drags = document.querySelectorAll('[draggable]');
const $drop = document.querySelector('.drop');

let dragged = null

$drags.forEach(drag => {
    drag.addEventListener('dragstart', e => {
        dragged = drag
        e.target.classList.add('active');
        e.dataTransfer.effectAllowed = "move";
    });
})

$drop.addEventListener('dragover', e => {
    e.preventDefault(); // autorise le drop
    e.target.classList.add('active');
});

$drop.addEventListener('dragleave', e => {
    e.preventDefault(); // autorise le drop
    e.target.classList.remove('active');
});

$drop.addEventListener('drop', e => {
    e.preventDefault();
    e.target.appendChild(dragged); // déplace l'élément
    dragged.classList.remove('active');
    e.target.classList.remove('active');
    alert("C'est la carte n° " + dragged.innerText)
    setTimeout(() =>{
        dragged.remove()
    }, 1000)
});