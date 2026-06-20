city="Karachi";
apiKey="zpka_6c83dd046bf348edae38a1a4a97bf701_f2581cca";

const btn=document.querySelector("#btn");
const searchCity=document.querySelector("#input");

let cityName=document.querySelector("#cityName");
let date=document.querySelector("#Date");

let T=document.querySelector("#temp");
let low_high=document.querySelector("#h_l");

let RainType=document.querySelector("#rainType");
let timeIndicator=document.querySelector("#img");

let H=document.querySelector("#hv");
let W=document.querySelector("#wv");
let Rain_perc=document.querySelector("#rv");
let V=document.querySelector("#vv");

btn.addEventListener("click",()=>{
    if(searchCity.value.trim()!==""){
        city=searchCity.value.trim();
        cityName.innerText=searchCity.value;
        weather();
    }
});

async function weather(){
    try{
        const locationResponse=await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${encodeURIComponent(city)}`);
        const locationData=await locationResponse.json();

        const locationKey=locationData[0].Key;

        const WeatherResponse=await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`);
        const WeatherData=await WeatherResponse.json();
        const weather=WeatherData[0];

        if (date) {
            date.innerText = new Date().toLocaleDateString();
        }

        const temp=weather.Temperature.Metric.Value;
        T.innerText=temp +"°C";

        const highTemp24h = weather.TemperatureSummary.Past24HourRange.Maximum.Metric.Value;
        const lowTemp24h = weather.TemperatureSummary.Past24HourRange.Minimum.Metric.Value;
        const unit = weather.Temperature.Metric.Unit;
        low_high.innerText=highTemp24h+" / "+lowTemp24h;
        
        const Humidity=weather.RelativeHumidity;
        H.innerText=Humidity+" %";

        const WindSpeed=weather.Wind.Speed.Metric.Value;
        const WindSpeedUnit=weather.Wind.Speed.Metric.Unit;
        W.innerText=WindSpeed+WindSpeedUnit;

        const rainType = weather.PrecipitationType || "Clear";
        const isRaining = weather.HasPrecipitation;
        RainType.innerText=rainType;
        if(isRaining){
            Rain_perc.innerText="It is Raining outside";
        }
        else{
            Rain_perc.innerText="No Rain today";
        }

         if (weather.Visibility) {
            V.innerText = weather.Visibility.Metric.Value + " " + weather.Visibility.Metric.Unit;
        } else {
            V.innerText = "N/A";
        }

    }catch(error){
        T.innerText=error;
    }
};
weather();
