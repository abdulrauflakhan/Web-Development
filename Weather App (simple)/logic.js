city="Karachi";
apiKey=import.meta.env.VITE_WEATHER_KEY;

const btn=document.querySelector("#btn");
const searchCity=document.querySelector("#input");
let cityName=document.querySelector("#cityName");
let T=document.querySelector("#temp");

btn.addEventListener("click",()=>{
    if(searchCity.value.trim()!==""){
        city=searchCity.value.trim();
        cityName.innerText=searchCity.value;
        temperature();
    }
});

async function temperature(){
    try{
        const locationResponse=await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`);
        const locationData=await locationResponse.json();

        const locationKey=locationData[0].Key;

        const WeatherResponse=await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`);
        const WeatherData=await WeatherResponse.json();

        const temp=WeatherData[0].Temperature.Metric.Value;
        T.innerText=temp +"°C";
    }catch(error){
        T.innerText=error;
    }
};
temperature();
