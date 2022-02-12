const heroBar = document.querySelector(".hero-bar");
const navs = document.querySelector(".navs");
const container = document.querySelector(".container");
const colAudio = document.querySelector(".col-audio");

heroBar.style.height = `${container.clientHeight - navs.clientHeight}px`;
heroBar.style.overflow = "scroll";

ajax({
    url: "hero.json",
    success: data => {
        let el = "";
        data.forEach(item => {
            el += showHero(item);
        });
        heroBar.innerHTML = el;
        detailHero();
    },
    error: error => {
        console.log(error);
    }
})


const tipeHero = Array.from(document.querySelectorAll(".navs li"));

tipeHero.map((item, index) => {
    if(index == 0) {
        item.addEventListener("click", function() {
            moveActive(tipeHero, this);
            ajax({
                url: "hero.json",
                success: data => {
                    let el = "";
                    data.forEach(item => {
                        el += showHero(item);
                    });
                    heroBar.innerHTML = el;
                    detailHero()
                },
                error: error => {
                    console.log(error);
                }
            })
        })
    }else {
        item.addEventListener("click", function() {
            moveActive(tipeHero, this);
            ajax({
                url: "hero.json",
                success: data => {
                    let el = "";
                    filterHeroType(data, this.innerHTML.toLowerCase())
                        .map(item => {
                            el += showHero(item);
                        });
                    heroBar.innerHTML = el;
                    detailHero();
                },
                error: error => {
                    console.log(error);
                }
            })
        })
    }
})






function detailHero() {
    const liHero = Array.from(document.querySelectorAll(".hero"));
    const elDetailHero = document.querySelector(".detail-hero");
    liHero.map(item => {
        item.addEventListener("click", function() {
            ajax({
                url: "hero.json",
                success: data => {
                    elDetailHero.innerHTML = showDetailHero(filterHeroId(data, this.dataset.id)[0]);
                    elDetailHero.classList.toggle("show");
                    colAudio.innerHTML = setAudio(filterHeroId(data, this.dataset.id)[0]);
                    playAudio()
                    const close = document.querySelector(".close");
                    close.addEventListener("click", function() {
                        elDetailHero.classList.toggle("show");
                        pauseAudio();
                    })
                }
            })
        })
    })
}

function setAudio(data) {
    return `
        <audio src="bahan/${data.voice}"></audio>
    `
}

function playAudio() {
    const audio = document.querySelector("audio");
    setTimeout(() => {
        audio.play();
    }, 2000);
}

function pauseAudio() {
    const audio = document.querySelector("audio");
    audio.pause();
}

function moveActive(removes, adds) {
    removes.map(item => {item.classList.remove("active")});
    adds.classList.add("active");
}

function filterHeroType(data, value) {
    return data.filter(item => item.type == value);
}

function filterHeroId(data, value) {
    return data.filter(item => item.id == value);
}

function showHero(data) {
    return `
        <figure class="hero" data-id=${data.id}>
            <div class="hero-img">
                <img src="bahan/ninym.png" alt="">
            </div>
            <figcaption>${data.name}</figcaption>
        </figure>
    `
}

function showDetailHero(data) {
    return `
    <div class="col">
        <div class="close">
            <p>&lt=</p>
        </div>
        <div class="header">
            <h3>${data.name}</h3>
            <p>${data.type}</p>
        </div>
        <div class="image">
            <img src="bahan/ninym.png" alt="">
        </div>
        <div class="col-speech">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit facilis at distinctio deserunt consequatur debitis, rerum quo explicabo? Repudiandae, necessitatibus?</p>
        </div>
        <div class="col-info">
            <ul>
                <li>Attack</li>
                <li>${data.attack}</li>
                <li>Defense</li>
                <li>${data.defense}</li>
                <li>Hp</li>
                <li>${data.hp}</li>
                <li>Mp</li>
                <li>${data.mp}</li>
            </ul>
        </div>
    </div>
    `
}

function ajax(obj) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                obj.success(JSON.parse(xhr.response));
            }else {
                obj.error(xhr.response);
            }
        }
    }
    xhr.open("get", obj.url);
    xhr.send();
}