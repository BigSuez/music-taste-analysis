var url = "https://raw.githubusercontent.com/BigSuez/project-3/main/Extraction/Outputs/genre_stats.json"
d3.json(url).then(function(data){
    console.log(data);
})

// Extract dates and genre counts from the data
var dates = data.map(obj => obj.date);
var genres = Object.keys(data[0].genres);
var genreCounts = genres.map(genre => data.map(obj => obj.genres[genre]));

// Create the plotly line chart
var traces = genres.map((genre, index) => ({
    x: dates,
    y: genreCounts[index],
    name: genre,
    type: 'scatter'
}));

var layout = {
    title: 'Genre Counts Over Time',
    xaxis: {
        title: 'Date'
    },
    yaxis: {
        title: 'Genre Count'
    }
};

Plotly.newPlot('chart', traces, layout);
  