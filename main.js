const modeDark = document.getElementById("btn-mode-dark");
const iconMenu = document.querySelector(".icon-menu");
const iconClose = document.querySelector(".icon-close");
const nav = document.querySelector(".nav");
const fullName = document.getElementById("full-name");
const mail = document.getElementById("mail");
const errorNotification = document.querySelector(".error-notification");
const textarea = document.querySelector(".form__textarea");
const phone = document.querySelector(".form__phone");
const form = document.getElementById("contact-form");

iconMenu.addEventListener("click", () => {
  iconMenu.classList.add("off");
  iconClose.classList.add("on");
  nav.classList.add("open-menu");
});

iconClose.addEventListener("click", () => {
  iconMenu.classList.remove("off");
  iconClose.classList.remove("on");
  nav.classList.remove("open-menu");
});

// Activación del modo Dark

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  if (root.getAttribute("data-theme") === "dark") {
    modeDark.checked = true;
  }

  modeDark.addEventListener("change", () => {
    toggleModoDark();
  });

  function toggleModoDark() {
    const setTheme = modeDark.checked ? "dark" : "light";

    root.setAttribute("data-theme", setTheme);
    localStorage.setItem("theme", setTheme);
  }
});
// Funcion encargada de validar los Input

fullName.addEventListener("change", (e) => {
  validationInput(e);
});

mail.addEventListener("change", (e) => {
  validationInput(e);
});
phone.addEventListener("change", (e) => {
  validationInput(e);
});
textarea.addEventListener("change", (e) => {
  validationInput(e);
});

function toogleError(nameInput) {
  let containerFather = nameInput.parentNode;

  if (nameInput.checkValidity()) {
    containerFather.classList.remove("error");
  } else {
    containerFather.classList.add("error");
  }
}

function validationInput(e) {
  let typeInput = e.target;

  if (typeInput.type === "text") {
    toogleError(typeInput);
  } else if (typeInput.type === "email") {
    toogleError(typeInput);
  } else if (typeInput.type === "tel") {
    toogleError(typeInput);
  } else {
    toogleError(textarea);
  }
}

// Mostrando los Projectos en la sección de projects

fetch("./projects.json")
  .then((response) => response.json())
  .then((data) => {
    const contenedor = document.querySelector(".projects__container");
    data.forEach((project) => {
      const div = document.createElement("div");
      const img = document.querySelector(".project__item__previous__link");
      div.innerHTML = `
            <div class="projects__item">
            <div class="project__item__previous">
              <a
                href="${project.url}"
                target="_blank"
                class="project__item__previous__link"
                style= "background-image: url('${project.image}');"
              >               
              </a>
            </div>
            <div class="projects__info">
              <h3 class="projects__info__title">${project.nameProject}</h3>

              <p class="projects__info__description">
                ${project.description}
              </p>

              <ul class="projects__info__list">
                Build with:
                ${project.tecnology
                  .map(
                    (item) => `
                  <li class="projects__info__list">- ${item}</li>
                `
                  )
                  .join("")}        
              </ul>
            </div>
          </div>
               
            `;
      contenedor.appendChild(div);
    });
  })
  .catch((error) => console.error("Error al cargar los proyectos:", error));




