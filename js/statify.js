window.addEventListener("load", function() {
    const popup = document.getElementById("cookie-popup");
    const closeBtn = document.getElementById("close-cookie-popup");
    const cookieKey = "cookie-popup-dismissed";
    const nav = document.querySelector(".navigation");
    const menuIcon = document.querySelector(".menu-icon");
    const slides = document.querySelectorAll(".slider img");
    const slider = document.querySelector(".slider");
    const install = document.querySelector(".install");
    
    if(!localStorage.getItem(cookieKey)) {
        popup.style.display = "flex";
    }

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        localStorage.setItem(cookieKey, "true");
    });

    this.window.addEventListener("resize", () => {
        if(window.innerWidth <= 600) {
            nav.classList.add("hidden");
            menuIcon.style.display = "flex";
        } else {
            nav.classList.remove("hidden");
            menuIcon.style.display = "none";
        }

        if(window.innerWidth > 600) {
            nav.classList.remove("open");
        }

    });

    if(window.innerWidth <= 600) {
        nav.classList.add("hidden");
        menuIcon.style.display = "flex";
    } else {
        nav.classList.remove("hidden");
        menuIcon.style.display = "none";
    }

    menuIcon.addEventListener("click", () => {
        if(nav.classList.contains("hidden") ) {
            nav.classList.remove("hidden");
            nav.classList.add("open");
        } else if(!nav.classList.contains("hidden")) {
            nav.classList.add("hidden");
            nav.classList.remove("open");
        }
    });

    document.addEventListener("click", (e) => {
        if(!nav.contains(e.target) && !menuIcon.contains(e.target) && nav.classList.contains("open")) {
            nav.classList.remove("open");
            nav.classList.add("hidden");
        }
    });

    /* Auto-scroll*/

    let i = 0;

    const autoScroll = () => {
        i = (i + 1) % slides.length;
    
        const scrollLeft = i * slider.clientWidth;
    
        slider.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    };
    
    setInterval(autoScroll, 3000);

    const codeElements = [
        ["fabric", "https://fabricmc.net/"],
        ["fabric-download", "https://www.curseforge.com/minecraft/mc-mods/fabric-api/files/5848117"],
        ["fabric-loader-download", "https://github.com/FabricMC/fabric-loader/releases/tag/0.16.9"],
        ["luckey", "https://twitch.tv/luckeY"],
        ["statify", "https://soviaat.dev/mods?id=statify"],
        ["gitrepo", "https://github.com/Soviaat/Statify"]
    ]

    codeElements.forEach(([id, link]) => {
        const target = this.document.getElementById(id);
        if (target) {
            addTooltip(target, "tooltip", link);
        } else {
            log(`Element with the id of \`${id}\` could not be found.`);
        }
    });

    install.addEventListener("click", () => {
        window.open("https://soviaat.dev/mods?id=Statify");
    });

});

function addTooltip(target, CSSelement, link) {
    const tooltip = this.document.createElement("div");
    tooltip.className = CSSelement;
    tooltip.innerText = link;
    this.document.body.appendChild(tooltip);

    const tipStyle = tooltip.style;

    target.addEventListener("mouseover", (e) => {
        tipStyle.display = "block";
        tipStyle.left = `${e.pageX + 13}px`;
        tipStyle.top = `${e.pageY + 13}px`;
    });

    target.addEventListener("mousemove", (e) => {
            tipStyle.left = `${e.pageX + 13}px`;
            tipStyle.top = `${e.pageY + 13}px`;
    });

    target.addEventListener("mouseout", (e) => {
            tipStyle.display = "none";
        });

    target.addEventListener("click", () => {
        window.open(link, "_blank");
    });

}

function log(string) {
    console.log(
        `%c[Statify]%c ${string}`, 
        "color: #2690ec; font-weight: bold;", // Style for "[Statify]"
        "color: inherit;"
    )
}