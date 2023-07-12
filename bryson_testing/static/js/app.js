//Set Target URL and read in Data
const url = "https://raw.githubusercontent.com/BigSuez/project-3/main/Extraction/Outputs/period_stats.json";


d3.json(url).then(function(data){
  console.log(data)
  let x = [];
  let dance = [];
  let valence = [];
  let energy = [];
  let speech = [];
  let acoustic = [];
  let instrument = [];
  let live = [];
  let tempo = [];
  let duration = []
  for (i = 0; i < data.length; i++){
    dance.push(data[i].stats.avg_danceability);
    valence.push(data[i].stats.avg_valence);
    energy.push(data[i].stats.avg_energy);
    speech.push(data[i].stats.avg_speechiness);
    acoustic.push(data[i].stats.avg_acousticness);
    instrument.push(data[i].stats.avg_instrumentalness);
    live.push(data[i].stats.avg_liveness);
    tempo.push(data[i].stats.avg_tempo);
    duration.push(data[i].stats.avg_duration/10000);
    x.push(data[i].date)
  };
  makeChart(x, dance, valence, energy, speech, acoustic, instrument, live, tempo, duration);
});

function makeChart(x, dance, valence, energy, speech, acoustic, instrument, live, tempo, duration){
    var trace1 = {
        x: x,
        y: dance,
        type: 'scatter',
        name: 'Danceability'
    };

    var trace2 = {
        x: x,
        y: valence,
        type: 'scatter',
        name: 'Valence'
    };

    var trace3 = {
        x: x,
        y: energy,
        type: 'scatter',
        name: 'Energy'
    };

    var trace4 = {
        x: x,
        y: speech,
        type: 'scatter',
        name: 'Speechiness'
    };

    var trace5 = {
        x: x,
        y: acoustic,
        type: 'scatter',
        name: 'Acousticness'
    };

    var trace6 = {
        x: x,
        y: instrument,
        type: 'scatter',
        name: 'Instrumentalness'
    };

    var trace7 = {
        x: x,
        y: live,
        type: 'scatter',
        name: 'Liveness'
    };

    var trace8 = {
        x: x,
        y: tempo,
        type: 'scatter'
    };

    var trace9 = {
        x: x,
        y: duration,
        type: 'scatter'
    };

    var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];

    Plotly.newPlot('bar', data);
}