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

            const link = document.createElement("a");
            link.href = `./${f}/`
            link.textContent = `${f.charAt(0).toUpperCase() + f.slice(1)}`
            link.style.display = "block";

            linkContainer.appendChild(link);
            linkList.appendChild(linkContainer);
        });
    }

    createLinks();
};


