async function search(a) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`);
    if (t.ok && 400 != t.status) {
        let a = await t.json();
        displayCurrent(a.location, a.current), displayAnother(a.forecast.forecastday)
    }
}
document.getElementById("search").addEventListener("keyup", a => {
    search(a.target.value)
});
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(a, t) {
    if (null != t) {
        var e = new Date(t.last_updated.replace(" ", "T"));
        let n = `
        <div class="cd col-md-4 mb-3 h-100">
                        <div class="container-fluid">
                            <div class="today">
                                <div class="head container">
                                    <div class="row justify-content-between align-items-center">
                                        <div class="col-6">
                                            <p>${days[e.getDay()]}</p>
                                        </div>
                                        <div class="col-6">
                                            <p>${e.getDate()+monthNames[e.getMonth()]}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="body text-start p-4">
                                    <h3 class="h4">${a.name}</h3>
                                    <div class="container">
                                        <div class="row justify-content-center align-items-center g-2">
                                            <div class="col-lg-9 col-md-12 col-9">
                                                <p class="display-1 fw-bold">${t.temp_c}°C</p>
                                            </div>
                                            <div class="col-lg-3 col-md-12 col-3">
                                                <img src="https:${t.condition.icon}" alt="Weather">
                                            </div>
                                        </div>
                                    </div>
                                    <p class="mb-3">${t.condition.text}</p>
                                    <div class="container ">
                                        <div class="row align-items-center g-2">
                                            <div class="col-3">
                                                <img src="assets/img/icon-umberella.png" alt="rain">
                                                <span>20%</span>
                                            </div>
                                            <div class="col-3">
                                                <img src="assets/img/icon-wind.png" alt="wind speed">
                                                <span>18km/h</span>
                                            </div>
                                            <div class="col-3">
                                                <img src="assets/img/icon-compass.png" alt="wind direction">
                                                <span>East</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        document.getElementById("showDataRow").innerHTML = n
    }
}

function displayAnother(a) {
    let t = "";
    for (let e = 1; e < a.length; e++) t += `
    
    <div class=" cd col-md-4 mb-3 h-100">
    <div class="container-fluid">
        <div class="tomorrow">
            <div class="head container">
                <div class="row justify-content-between align-items-center">
                    <div class="col-12">
                        <p>${days[new Date(a[e].date.replace(" ","T")).getDay()]}</p>
                    </div>
                </div>
            </div>
            <div class="body  p-2">
                <div class="container">
                    <div class="row justify-content-center align-items-center g-2">
                        <div class="col-12">
                            <img src="https:${a[e].day.condition.icon}" alt="Weather">
                        </div>
                        <div class="col-12">
                            <p class="display-5 fw-bold">${a[e].day.maxtemp_c}°C</p>
                        </div>
                        <div class="col-12">
                            <p class="">${a[e].day.mintemp_c}°</p>
                        </div>
                        <div class="col-12">
                            <p class="">${a[e].day.condition.text}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
    `;
    document.getElementById("showDataRow").innerHTML += t
}
search("cairo");