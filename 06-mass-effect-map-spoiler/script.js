const cleanName = (name) => {
    return name.replaceAll(' ', '_').normalize('NFD').replace(/\p{Diacritic}/gu, "");
}

const createNav = () => {
    const menu = document.querySelector('#menu-container');
    let displayNav = clusters.map((cluster) => {
        return `
            <li class="nav-item">
                <a class="py-2 nav-link tab-link" data-id="${cleanName(cluster.name)}">
                ${cluster.name}
                </a>
            </li>
        `;
    });
    displayNav = displayNav.join("");
    menu.innerHTML = displayNav;
};

const createContent = () => {
    const content = document.querySelector('.content');
    let displayContent = clusters.map((cluster) => {
        // Systems
        let listSystems = cluster.systems.map(({ system }) => {
            return ` <p class="mx-1 my-0 p-2 rounded">${system}</p>`;
        });
        listSystems = listSystems.join("");

        // Images
        let listplanets = cluster.systems.map(({ planet, type }) => {
            image = type !== "land" ? type : planet;
            return `
                <div class="img-container">
                    <h4>${planet}</h4>
                    <img class="mt-2 img-fluid rounded" src="images/${image !== "" ? cleanName(image) : "nothing"}.jpg" alt="${planet}" title="${planet}">
                </div>
            `;
        });
        listplanets = listplanets.join("");

        return `
            <div class="tab-content" id="${cleanName(cluster.name)}">
                <section class="d-flex justify-content-center systems">
                    <div class="d-flex align-items-center text-center menu-system ">
                        ${listSystems}
                    </div>
                </section>
                <section class="container text-center planets">
                    ${listplanets}
                </section>
            </div>
        `;
    });
    displayContent = displayContent.join("");
    content.innerHTML = displayContent;
};

const menuListener = () => {
    const nav = document.querySelector('.nav');
    const links = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    nav.addEventListener('click', (ev) => {
        const id = ev.target.dataset.id;
        if (id) {
            links.forEach((link) => {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
                ev.target.classList.add("active");
                ev.target.ariaCurrent = "page";
            });

            tabContents.forEach((content) => {
                content.classList.remove('active');
                content.removeAttribute("aria-current");
            });

            const activeTab = document.getElementById(id);
            activeTab.classList.add('active');
            activeTab.ariaCurrent = "page";
        }
    });
};

const systemListener = () => {
    const systems = document.querySelectorAll('.systems p');
    const planets = document.querySelectorAll('.planets .img-container');
    systems.forEach((system, index) => {
        system.addEventListener('click', (ev) => {
            systems.forEach(system => {
                system.classList.remove('active');
            })
            ev.target.classList.add('active');
            const activePlanet = document.querySelector('.img-container.active');
            if (activePlanet) {
                activePlanet.classList.remove('active');
            }
            planets[index].classList.add('active');
        });
    });
};

window.addEventListener('DOMContentLoaded', () => {
    createNav();
    createContent();
    menuListener();
    systemListener();
});