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
                    typing(filterHeroId(data, this.dataset.id)[0].text);
                    elDetailHero.classList.toggle("show");
                    colAudio.innerHTML = setAudio(filterHeroId(data, this.dataset.id)[0]);
                    playAudio();
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
        <audio src="bahan/voice/${data.voice}"></audio>
    `
}

function playAudio() {
    const audio = document.querySelector("audio");
    audio.play();
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
                <img src="bahan/hero-image/${data.image.img_sm}" alt="">
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
            <img src="bahan/image_lg/${data.image.img_lg}" alt="">
        </div>
        <div class="col-speech">
            <p class="speech"></p>
        </div>
        <div class="col-info">
            <h4>Skill Character</h4>
            <ul>
                <li>Attack</li>
                <li>${data.attack}/100</li>
                <li>Defense</li>
                <li>${data.defense}/100</li>
                <li>Hp</li>
                <li>${data.hp}/1000</li>
                <li>Mp</li>
                <li>${data.mp}/1000</li>
                ${data.special_skill ? `
                    <li>Special Skill</li>
                    <li>${data.special_skill.skill_1}</li>
                ` : ``}
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

function typing(teks) {
    let index = 1;
   const speechs = document.querySelector(".speech");

    let typed = setInterval(() => {
        if(index > teks.length) {
            clearInterval(typed);
        }else {
            let subTeks = teks.substring(0, index);
            speechs.innerHTML = subTeks;
            index++;
        }
    }, 30)
}