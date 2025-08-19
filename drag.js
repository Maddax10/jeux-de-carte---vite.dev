const $drags = document.querySelectorAll('[draggable]');
const dropZone = document.querySelector('.drop');

let dragged = null

$drags.forEach(drag => {
    drag.addEventListener('dragstart', e => {
        dragged = drag
        e.target.classList.add('active');
        e.dataTransfer.effectAllowed = "move";
    });
})

dropZone.addEventListener('dragover', e => {
    e.preventDefault(); // autorise le drop
    e.target.classList.add('active');
});

dropZone.addEventListener('dragleave', e => {
    e.preventDefault(); // autorise le drop
    e.target.classList.remove('active');
});

dropZone.addEventListener('drop', e => {
    e.preventDefault();
    e.target.appendChild(dragged); // déplace l'élément
    dragged.classList.remove('active');
    e.target.classList.remove('active');
    alert("C'est la carte n° " + dragged.innerText)
    setTimeout(() =>{
        dragged.remove()
    }, 1000)
});