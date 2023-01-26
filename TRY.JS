const axios = require('axios')

let startDate = new Date()
let JSmonthFuckedUsAll = startDate.getMonth()+1

let fetchDate;
if(JSmonthFuckedUsAll<10){
    fetchDate = (startDate.getFullYear() + '-' + '0'+(startDate.getMonth() + 1) + '-' + (startDate.getDate()))
}else{
    fetchDate = (startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + (startDate.getDate()))
}
console.log(fetchDate);

axios.post('http://localhost:9001/daily-forecast',
    {
        wave_height: "23.3",
        wind_direction: "23.3",
        wind_speed: "23.3",
        water_temperature: "23.3",
        last_updated: fetchDate,
        beach_id: 2,
        beach_name: "23.3"
    }
).catch((err) => {
    console.log(err);
})
    .then((res) => {
        console.log('edasfsdfasdfasdf');
    })