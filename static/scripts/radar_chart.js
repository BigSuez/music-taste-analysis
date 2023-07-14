console.log("test");
const ctx = document.getElementById('chart');
const url = 'https://raw.githubusercontent.com/BigSuez/project-3/main/Extraction/Outputs/period_stats.json'

d3.json(url).then(function(data){
  console.log("test");
    var seventies = getStats(data.slice(0, 20));
    var eighties = getStats(data.slice(20, 40));
    var nineties = getStats(data.slice(40, 60));
    var twenties = getStats(data.slice(60, 80));
    var tens = getStats(data.slice(80, 100));
    makeChart(seventies, eighties, nineties, twenties, tens)
});

function makeChart(seventies, eighties, nineties, twenties, tens){
    console.log(seventies)
    const data = {
        labels: ['Danceability', 'Energy', 'Speechiness', 'Acousticness', 'Instrumentalness', 'Liveness', 'Valence'],
        datasets: [{
          label: '1970s',
          data: seventies,
          fill: true,
          backgroundColor: 'rgba(255, 231, 76, .2)',
          borderColor: 'rgb(255, 231, 76)',
          pointBackgroundColor: 'rgb(255, 231, 76)',
          pointBorderColor: '#FFE74C',
          pointHoverBackgroundColor: '#FFE74C',
          pointHoverBorderColor: '#FFE74C'
        }, {
          label: '1980s',
          data: eighties,
          fill: true,
          backgroundColor: 'rgba(255, 89, 100, .2)',
          borderColor: '#FF5964',
          pointBackgroundColor: '#FF5964',
          pointBorderColor: '#FF5964',
          pointHoverBackgroundColor: '#FF5964',
          pointHoverBorderColor: '#FF5964'
        }, {
            label: '1990s',
            data: nineties,
            fill: true,
            backgroundColor: 'rgba(121, 0, 0, .2)',
            borderColor: '#790000',
            pointBackgroundColor: '#790000',
            pointBorderColor: '#790000',
            pointHoverBackgroundColor: '#790000',
            pointHoverBorderColor: '#790000'
        }, {
            label: '2000s',
            data: twenties,
            fill: true,
            backgroundColor: 'rgba(107, 241, 120, .2)',
            borderColor: 'rgb(107, 241, 120)',
            pointBackgroundColor: 'rgb(107, 241, 120)',
            pointBorderColor: 'rgb(107, 241, 120)',
            pointHoverBackgroundColor: 'rgb(107, 241, 120)',
            pointHoverBorderColor: 'rgb(107, 241, 120)'
        }, {
            label: '2010s',
            data: tens,
            fill: true,
            backgroundColor: 'rgba(53, 167, 255, .2)',
            borderColor: 'rgb(53, 167, 255)',
            pointBackgroundColor: 'rgb(53, 167, 255)',
            pointBorderColor: 'rgb(53, 167, 255)',
            pointHoverBackgroundColor: 'rgb(53, 167, 255)',
            pointHoverBorderColor: 'rgb(53, 167, 255)'
          }]
      };

    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}
function getStats(period){
    let dance = [];
    let energy = [];
    let speech = [];
    let acoustic = [];
    let instrument = [];
    let live = [];
    let valence = [];

    for (i=0;i<period.length;i++){
        dance.push(period[i].stats.avg_danceability);
        energy.push(period[i].stats.avg_energy);
        speech.push(period[i].stats.avg_speechiness);
        acoustic.push(period[i].stats.avg_acousticness);
        instrument.push(period[i].stats.avg_instrumentalness);
        live.push(period[i].stats.avg_liveness);
        valence.push(period[i].stats.avg_valence);
    }
    return [getAvg(dance), getAvg(energy), getAvg(speech), getAvg(acoustic), getAvg(instrument), getAvg(live), getAvg(valence)];
};

function getAvg(list){
    let sum = 0;
    for (i=0;i<list.length;i++){
        sum += list[i];
    };
    return (sum/list.length);
};

