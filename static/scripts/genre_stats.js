// Git JSON URL for Testing
const url = "https://raw.githubusercontent.com/BigSuez/project-3/main/Extraction/Outputs/genre_stats.json";

 // Flask URL for Prod
//const url = 'http://127.0.0.1:5000/genres';

 fetch(url)
     .then(response => response.json())
     .then(data => {
         var dates = [];
         var genres = [];
         var genreCounts = [];

         // Process the initial data
         dates = data.map(obj => obj.date);
         genres = Object.keys(data[0].genres);
         genreCounts = genres.map(genre => data.map(obj => obj.genres[genre]));

         var colors = [
             'rgb(31, 119, 180)', // blue
             'rgb(255, 127, 14)', // orange
             'rgb(44, 160, 44)',  // green
             'rgb(214, 39, 40)',  // red
             'rgb(148, 103, 189)', // purple
             'rgb(140, 86, 75)',  // brown
             'rgb(227, 119, 194)', // pink
             'rgb(127, 127, 127)'  // gray
         ];

         var traces = genres.map((genre, index) => ({
             x: dates,
             y: genreCounts[index],
             name: genre,
             type: 'scatter',
             mode: 'markers',
             marker: {
                 size: 8,
                 symbol: 'circle',
                 opacity: 0.8,
                 color: colors[index % colors.length],
                 line: {
                     color: 'rgb(8, 48, 107)',
                     width: 1
                 }
             }
         }));

         var layout = {
             title: 'Genre Changes Over Time',
             xaxis: {
                 title: 'Date'
             },
             yaxis: {
                 title: 'Genre Count'
             }
         };

         // Create the initial chart
         Plotly.newPlot('chart', traces, layout);

         // Handle changes to the year slider
         var yearSlider = document.getElementById('year-slider');
         yearSlider.addEventListener('input', function () {
             var selectedYear = Number(this.value);
             updateChart(selectedYear);
         });

         // Function to update the chart based on the selected year
         function updateChart(selectedYear) {
            console.log('charting')
             var filteredData = data.filter(obj => {
                 var year = Number(obj.date.substring(0, 4));
                 return year <= selectedYear;
             });

             var filteredDates = filteredData.map(obj => obj.date);
             var filteredGenreCounts = genres.map(genre => filteredData.map(obj => obj.genres[genre]));

             // Update the chart data
             for (var i = 0; i < traces.length; i++) {
                 traces[i].x = filteredDates;
                 traces[i].y = filteredGenreCounts[i];
             }

             // Replot the chart with the updated data
             Plotly.react('chart', traces, layout);
         }
     })
     .catch(error => {
         console.error('Failed to fetch JSON data', error);
     });