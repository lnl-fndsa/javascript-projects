const page = document.querySelector('.page-content');
const btns = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.content');

page.addEventListener('click', (ev) => {
    const id = ev.target.dataset.id;
    if (id) {
        btns.forEach((btn) => {
            btn.classList.remove('active');
            btn.removeAttribute("aria-current");
            ev.target.classList.add('active');
            ev.target.ariaCurrent = "page";
        });

        contents.forEach((article) => {
            article.classList.remove('active');
            article.removeAttribute('aria-current');
        });

        const activeTab = document.getElementById(id);
        activeTab.classList.add('active');
        activeTab.ariaCurrent = "page";
    }
})