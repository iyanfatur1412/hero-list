const loading = document.querySelector(".loading");
const loadingNumber = document.querySelector(".loading-number");
let loadingValue = 0;

let info = `
    <div class="alert">
        <h2>Ubah ke mode Landscape dan refresh kembali!</h2>
    </div>
`

if(window.innerWidth >= 768) {

    let loadingInterval = setInterval(() => {
        if(loadingValue >= 100) {
            clearInterval(loadingInterval);
            window.location.replace("hero.html");
        }else{
            loadingValue++;
            loading.value = loadingValue;
            loadingNumber.innerHTML = `${loadingValue}%`;
        }
    }, 200)

    

}else {
    const body = document.querySelector("body");
    body.innerHTML = info;
}
