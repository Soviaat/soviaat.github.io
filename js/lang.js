document.addEventListener("DOMContentLoaded", () => {
    const langSelector = document.querySelector(".dropdown-selected");
    const toTranslate = document.querySelectorAll("[data-translate-key]");

    function getCookie(name) {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? match[2] : null;
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days + 24 * 60 * 60 * 1000));
        const exp = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${exp};path=/`;
    }

    function loadLang(lang) {
        fetch(`/lang/${lang}.json`)
            .then(resp => resp.json())
            .then(translations => {
                toTranslate.forEach(el => {
                    const key = el.getAttribute('data-translate-key');
                    if(translations[key]) {
                        const translation = translations[key];
                        if (translation.type === "html") {
                            el.innerHTML = translation.content;
                        } else {
                            el.textContent = translation.content;
                        }
                    }
                });

                setupTooltips();
            });
    }
    
    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', function () {
            const selectedValue = this.getAttribute('value');
            langSelector.setAttribute('value', selectedValue);
            langSelector.textContent = this.textContent;

            setCookie("selectedLang", selectedValue, 7);

            loadLang(selectedValue);
        });
    });

    const savedLang = getCookie("selectedLang") || "en";
    langSelector.setAttribute("value", savedLang);
    langSelector.innerHTML = savedLang === "en" ? "<span>English</span>&nbsp;🇬🇧" : "<span>Magyar</span>&nbsp;🇭🇺";
    
    loadLang(savedLang);

    function setupTooltips() {
        const codeElements = [
                ["fabric", "https://fabricmc.net/"],
                ["fabric-download", "https://www.curseforge.com/minecraft/mc-mods/fabric-api/files/6036511"],
                ["fabric-loader-download", "https://github.com/FabricMC/fabric-loader/releases/tag/0.16.9"],
                ["luckey", "https://twitch.tv/luckeY"],
                ["statify", "https://soviaat.dev/mods?id=statify"],
                ["gitrepo", "https://github.com/Soviaat/Statify"],
                ["readme", "https://github.com/Soviaat/Statify/blob/master/README.md"],
                ["git-issue", "https://github.com/Soviaat/Statify/issues/new"]
            ]
            
            codeElements.forEach(([id, link]) => {
                const target = this.document.getElementById(id);
                if (target) {
                    addTooltip(target, "tooltip", link);
                } else {
                    log(`Element with the id of \`${id}\` could not be found.`);
                }
        });
    }

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
});

