document.addEventListener('DOMContentLoaded', () => {
    const navList = document.getElementById('nav-list');
    const content = document.getElementById('content');
    const homeButton = document.getElementById('home-button');
    const yearSpan = document.getElementById('year');

    // Set current year in footer
    yearSpan.textContent = new Date().getFullYear();

    const sections = [
        'Preamble',
        ...Array.from({ length: 22 }, (_, i) => `PART${String(i + 1).padStart(2, '0')}`),
        ...Array.from({ length: 12 }, (_, i) => `SCHEDULE${String(i + 1).padStart(2, '0')}`)
    ];

    sections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "#";
        a.textContent = section;
        a.addEventListener('click', async (event) => {
            event.preventDefault();
            await loadSection(section);
        });
        li.appendChild(a);
        navList.appendChild(li);
    });

    async function loadSection(section) {
        try {
            const response = await fetch(`texts/${section}.txt`);
            const text = await response.text();
            content.innerHTML = `<h2>${section}</h2><div class="section-content">${text.replace(/\n/g, '<br>')}</div>`;
            homeButton.classList.remove('hidden');
        } catch (error) {
            content.innerHTML = `<h2>Error</h2><p>Could not load section: ${section}</p>`;
            homeButton.classList.remove('hidden');
        }
    }

    homeButton.addEventListener('click', () => {
        content.innerHTML = `<h2>Welcome to the Constitution of India</h2>`;
        homeButton.classList.add('hidden');
    });
});
