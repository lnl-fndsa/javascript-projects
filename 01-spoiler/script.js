const toggleSpoiler = (container, color) => {
    container.style.backgroundColor = color;
    const spoiler = container.querySelector('.spoiler-content');

    container.addEventListener('mouseover', () => {
        container.style.backgroundColor = "transparent";
        spoiler.classList.add('visible');
    })

    container.addEventListener('mouseout', () => {
        container.style.backgroundColor = color;
        spoiler.classList.remove('visible');
    })
}

const spoilerContainer = document.querySelectorAll('.spoiler-container');
spoilerContainer.forEach((container) => {
    toggleSpoiler(container, "#333");
})