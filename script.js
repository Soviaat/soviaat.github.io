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

    const repoOwner = 'soviaat';
    const repositories = [
        { name: 'Statify'},
        { name: 'VexSoundPause' }
    ];

    function createList() {
        const list = document.createElement("ul");
        list.className = "hidden";
        list.id = "repo-dropdown";
        repositories.forEach(r => {        
            list.innerHTML += 
            `<a href="/mods?id=${r.name}">
                <li>${r.name}</li>
            </a>`;
        });

        document.getElementById("main").appendChild(list);
    }

    createList();

    
    const plus = document.getElementById("plus-btn");
    const list = document.getElementById("repo-dropdown");
    plus.addEventListener("click", () => {
        if(list.classList.contains("hidden")) {
            plus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M480-545.33 287.33-352.67 240-400l240-240 240 240-47.33 47.33L480-545.33Z"/></svg>';
            list.classList.remove("hidden");
            list.classList.toggle("shown");
        } else {
            plus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M480-344 240-584l47.33-47.33L480-438.67l192.67-192.66L720-584 480-344Z"/></svg>';
            list.classList.remove("shown");
            list.classList.toggle("hidden");
        }
    });
};


