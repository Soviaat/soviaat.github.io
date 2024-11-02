window.onload = function() {
    const subFolders = [
        "mods",
        "statify"
    ];
    
    const linkList = document.getElementById("linkList");

    function createLinks() {
        subFolders.forEach(f => {
            const linkContainer = document.createElement("div");
            linkContainer.className = "link-container";
            linkContainer.id = `${f}`;

            if(linkContainer.id == "mods") {
                const plusButton = document.createElement("div")
                plusButton.classList.add("plus");
                plusButton.id = "plus-btn";
                plusButton.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M480-344 240-584l47.33-47.33L480-438.67l192.67-192.66L720-584 480-344Z"/></svg>';
                linkContainer.appendChild(plusButton)
            }

            const link = document.createElement("a");
            link.href = `./${f}`
            link.textContent = `${f.charAt(0).toUpperCase() + f.slice(1)}`
            link.style.display = "block";

            linkContainer.appendChild(link);
            linkList.appendChild(linkContainer);
        });
    }

    createLinks();

    const repositories = [
        { name: 'Statify' },
        { name: 'VexSoundPause' }
    ];

    function createList() {
        const listContainer = document.createElement("div");
        listContainer.id = "repo-dropdown";
        listContainer.className = "hidden";
        const list = document.createElement("ul");
        repositories.forEach(r => {        
            list.innerHTML += 
            `<a href="/mods?id=${r.name}" target="_blank">
                <li>${r.name}</li>
            </a>`;
        });

        listContainer.appendChild(list);

        document.getElementById("main").appendChild(listContainer);
    }

    createList();

    
    const plus = document.getElementById("plus-btn");
    const listContainer = document.getElementById("repo-dropdown");
    plus.addEventListener("click", () => {
        if(listContainer.classList.contains("hidden")) {
            plus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M480-545.33 287.33-352.67 240-400l240-240 240 240-47.33 47.33L480-545.33Z"/></svg>';
            listContainer.classList.remove("hidden");
            listContainer.classList.toggle("shown");
        } else {
            plus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M480-344 240-584l47.33-47.33L480-438.67l192.67-192.66L720-584 480-344Z"/></svg>';
            listContainer.classList.remove("shown");
            listContainer.classList.toggle("hidden");
        }
    });

    function loadWelcome() {
        const welcomeElement = document.getElementById("welcome");
        const savedName = localStorage.getItem("username");

        if (savedName) {
            writeOn(welcomeElement, savedName);
        } else {
            const input = document.createElement("input");
            input.autocomplete = "off"
            input.type = "text";
            input.placeholder = "Your name";
            input.id = "nameInput";

            welcomeElement.textContent = "Welcome, ";
            welcomeElement.appendChild(input);

            input.addEventListener('keypress', (e) => {
                if (e.key === "Enter" && input.value.trim() !== '') {
                    const username = input.value.trim()
                    localStorage.setItem("username", username);

                    input.classList.add("shrink");

                    input.addEventListener("transitionend", () => {
                        welcomeElement.removeChild(input);
                        writeOn(welcomeElement, username);
                    });
                }
            });
        }
    }

    function writeOn(element, text) {
        element.textContent = `Welcome, `;
        const span = document.createElement("span");
        span.classList.add("typing");
        element.appendChild(span);

        let i = 0;
        const typingInterval = setInterval(() => {
            span.textContent += text[i];
            i++;
            if (i === text.length) {
                clearInterval(typingInterval);
            }
        }, 150);
    }

    loadWelcome();
};


