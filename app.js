// query selectors
const tempNum = document.querySelector(".temp-num");
const weatherDisc = document.querySelector(".weather-disc");
const locationTimeZone = document.querySelector(".location-timezone");
const iconFile = document.querySelector(".location-icon");
const tempUnit = document.querySelector(".temp-unit")

// event linsteners
// instruction on loading

document.addEventListener('DOMContentLoaded', ()=> {
    let long;
    let latt;
    

    if(navigator.geolocation){  
        // console.log("we have access!")
        navigator.geolocation.getCurrentPosition(position =>{
            // console.log("Data available")
            long = position.coords.longitude;
            latt = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=8f2120df1f5e9aa217be3c9d2b415992`;
            const locationAPI = `${proxy}us1.locationiq.com/v1/reverse.php?key=pk.7d388da22b2ecbd03fb478710f5a95fd&lat=${latt}&lon=${long}&format=json`
            

            fetch(locationAPI).then(data =>{
                return data.json();
            })
            .then(data => {
                // console.log(data);
                const {county, state, country} = data.address;
                // console.log(county + " / "+ state +" / "+ country);
                locationTimeZone.textContent = county + " / "+ state +" / "+ country;
            })

            fetch(api).then(data =>{
                return data.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const temp1 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2});
                const {description,icon} = data.weather[0];
                // console.log(temp1.format(temp-273));
                //Set dom elements
                tempNum.textContent = temp1.format(temp-273);
                weatherDisc.textContent = description;
                setIcons(icon);
            })
        });
        
        function setIcons(icon){
            const urlString = `http://openweathermap.org/img/wn/${icon}@2x.png`
            const fig = document.createElement("IMG");
            fig.setAttribute("src", urlString);
            fig.setAttribute("alt", "icon");
            iconFile.appendChild(fig);
        }

        // changing to F and C
        tempNum.addEventListener('click', ()=>{
            const temp1 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1});
            if(tempUnit.textContent === "F"){
                let val = parseFloat(tempNum.textContent);
                console.log(val);
                val = ((val-32)*9 / 5);
                console.log(temp1.format(val));
                tempNum.textContent = temp1.format(val);
                tempUnit.textContent = "C";
            }
            else{
                let val = parseFloat(tempNum.textContent);
                console.log(val);
                val = ((val*5 / 9) + 32);
                console.log(temp1.format(val));
                tempNum.textContent = temp1.format(val);
                tempUnit.textContent = "F";
            }
        });


        tempUnit.addEventListener('click', ()=> {
            const temp1 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1});
            if(tempUnit.textContent === "F"){
                let val = parseFloat(tempNum.textContent);
                console.log(val);
                val = ((val-32)*9 / 5);
                console.log(temp1.format(val));
                tempNum.textContent = temp1.format(val);
                tempUnit.textContent = "C";
            }
            else{
                let val = parseFloat(tempNum.textContent);
                console.log(val);
                val = ((val*5 / 9) + 32);
                console.log(temp1.format(val));
                tempNum.textContent = temp1.format(val);
                tempUnit.textContent = "F";
            }
        });
    }
    else{
        console.log("data not found");
        h1.textContent="Location data not recorded";
        alert("no browser support for location.");
    }
    
});


