document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.dropdown-selected').addEventListener('click', function () {
        const dropdown = this.parentElement;
        dropdown.classList.toggle('show');
    });
    
    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', function () {
            const selectedText = this.textContent;
            const selectedValue = this.getAttribute("value");
            const dropdown = this.closest('.dropdown');
            dropdown.querySelector('.dropdown-selected').innerText = selectedText;
            dropdown.querySelector('.dropdown-selected').setAttribute("value", selectedValue);
            dropdown.classList.remove('show');
        });
    });
    
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.classList.remove('show'));
        }
    });


    const loadingBar = document.querySelector(".loading-bar");
    const percent = document.getElementById("percent");

    loadingBar.style.width = "100%";
    
    function getCurrentWidthPercentage(element) {
        const elementWidth = element.getBoundingClientRect().width;
        const parentWidth = element.parentElement.getBoundingClientRect().width;
        
        return (elementWidth / parentWidth) * 100;
    }
    
    function trackWidthDuringTransition(element, target) {
        let animationFrameId;
        
        const updateWidth = () => {
            const currentWidth = getCurrentWidthPercentage(element);
            target.innerText = Math.floor(currentWidth) + "%";
            
            if(Math.floor(currentWidth) === 100 ) {
                cancelAnimationFrame(animationFrameId);
                log("ended");
            } else {
                animationFrameId = requestAnimationFrame(updateWidth);
            }
        };
        
        animationFrameId = requestAnimationFrame(updateWidth);
    }
    
    
    trackWidthDuringTransition(loadingBar, percent);
    
    setTimeout(() => {
        const loadingContainer = document.querySelector(".loading-container");
        loadingContainer.style.opacity = '0';

        setTimeout(() => {
            loadingContainer.style.display = "none";
        }, 1000);
    }, 4350);
        

        
    const popup = document.getElementById("cookie-popup");
    const closeBtn = document.getElementById("close-cookie-popup");
    const cookieKey = "cookie-popup-dismissed";
    const nav = document.querySelector(".navigation");
    const menuIcon = document.querySelector(".menu-icon");
    const slides = document.querySelectorAll(".slider img");
    const slider = document.querySelector(".slider");
    const install = document.querySelector(".install");

    const help = document.querySelector(".help-link");
    const helpContainer = document.querySelector(".help-container");
    const downloadLink = document.querySelector(".download-link");
    const downloadContainer = document.querySelector(".download-container");
    const home = document.querySelector(".home-link");
    const top = document.querySelector(".top");
    
    
    if(!localStorage.getItem(cookieKey)) {
        popup.style.display = "flex";
    }
    
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        localStorage.setItem(cookieKey, "true");
    });

    linkList = [
        [help, helpContainer],
        [downloadLink, downloadContainer],
        [home, top]
    ]

    linkList.forEach(([link, container]) => {
        link.addEventListener("click", () => {
            container.scrollIntoView({
                behavior: "smooth"
            });
        });
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

    install.addEventListener("click", () => {
        window.open("https://soviaat.dev/mods?id=Statify");
    });
});

function scrollToElement(list, targetList) {
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener("click", () => {
            for (let i = 0; i < targetList.length; i++) {
                targetList[i].scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    }
}

function log(string) {
    console.log(
        `%c[Statify]%c ${string}`, 
        "color: #2690ec; font-weight: bold;", // Style for "[Statify]"
        "color: inherit;"
    )
}