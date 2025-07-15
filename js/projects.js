// js/projects.js

/**
 * Load projects from a JSON file and render them inside a container element.
 * @param {string} jsonPath - Path to the JSON data file.
 * @param {string} containerSelector - CSS selector for the container element where projects will be added.
 */
export async function loadProjects(jsonPath, containerSelector) {
    try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`Failed to load ${jsonPath}: ${res.status}`);

        const data = await res.json();

        // Detect if the JSON wraps projects inside an object with keys (like { personalProjects: [...], universityProjects: [...] })
        // If so, take the first array it finds, otherwise assume data is an array itself
        const projects = Array.isArray(data)
            ? data
            : (Object.values(data).find(v => Array.isArray(v)) || []);

        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.innerHTML = ''; // clear container

        projects.forEach(project => {
            // Create project wrapper
            const projectRow = document.createElement('div');
            projectRow.classList.add('project-row');

            // Media div
            const mediaDiv = document.createElement('div');
            mediaDiv.classList.add('project-media');

            switch (project.mediaType) {
                case 'singleImage':
                    if (project.image) {
                        const img = document.createElement('img');
                        img.src = project.image;
                        img.alt = project.title;
                        mediaDiv.appendChild(img);
                    }
                    break;

                case 'gif':
                    if (project.image) {
                        const img = document.createElement('img');
                        img.src = project.image;
                        img.alt = project.title;
                        img.classList.add('gif-media');
                        mediaDiv.appendChild(img);
                    }
                    break;

                case 'embeddedVideo':
                    if (project.videoEmbed) {
                        mediaDiv.innerHTML = project.videoEmbed;
                    }
                    break;

                case 'imageCarousel':
                    if (project.carouselImages && project.carouselImages.length > 0) {
                        const carouselContainer = document.createElement('div');
                        carouselContainer.classList.add('carousel-container');

                        const slidesDiv = document.createElement('div');
                        slidesDiv.classList.add('carousel-slides');

                        project.carouselImages.forEach((imgSrc, index) => {
                            const slide = document.createElement('div');
                            slide.classList.add('carousel-slide');
                            if (index === 0) slide.classList.add('active');

                            const img = document.createElement('img');
                            img.src = imgSrc;
                            img.alt = `${project.title} slide ${index + 1}`;

                            slide.appendChild(img);
                            slidesDiv.appendChild(slide);
                        });

                        carouselContainer.appendChild(slidesDiv);

                        // TODO: Add prev/next buttons & dots if you want

                        mediaDiv.appendChild(carouselContainer);
                    }
                    break;

                default:
                    if (project.image) {
                        const img = document.createElement('img');
                        img.src = project.image;
                        img.alt = project.title;
                        mediaDiv.appendChild(img);
                    }
                    break;
            }

            // Info div
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('project-info');

            const titleEl = document.createElement('h2');
            titleEl.classList.add('project-title');
            titleEl.textContent = project.title;
            infoDiv.appendChild(titleEl);

            const descEl = document.createElement('p');
            descEl.classList.add('project-description');
            descEl.textContent = project.description;
            infoDiv.appendChild(descEl);

            if (project.features && project.features.length) {
                const featureDiv = document.createElement('div');
                featureDiv.classList.add('project-features');

                const ul = document.createElement('ul');
                ul.classList.add('feature-list');

                project.features.forEach(f => {
                    const li = document.createElement('li');
                    li.classList.add('feature-item');
                    li.textContent = f;
                    ul.appendChild(li);
                });

                featureDiv.appendChild(ul);
                infoDiv.appendChild(featureDiv);
            }

            if (project.technologies && project.technologies.length) {
                const techDiv = document.createElement('div');
                techDiv.classList.add('project-technologies');

                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.classList.add('tech-tag');
                    span.textContent = tech;
                    techDiv.appendChild(span);
                });

                infoDiv.appendChild(techDiv);
            }

            if (project.link) {
                const a = document.createElement('a');
                a.classList.add('project-link');
                a.href = project.link;
                a.textContent = 'View Project';
                infoDiv.appendChild(a);
            }

            projectRow.appendChild(mediaDiv);
            projectRow.appendChild(infoDiv);
            container.appendChild(projectRow);
        });
    } catch (err) {
        console.error(err);
    }
}
