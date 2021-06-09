import axios from "axios";
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
} from "chart.js";

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);
import "chartjs-adapter-moment";

let type = "line";
const ctx = document.getElementById("chart").getContext("2d");
let currency = prompt("Which currency?");
let data = [];
let labels = [];

function main() {
    axios
        .get(`https://api.coincap.io/v2/assets/${currency}/history?interval=d1`)
        .then((r) => {
            r.data.data.forEach((i) => {
                labels.push(i.date);
                data.push(i.priceUsd);
            });

            let chart = new Chart(ctx, {
              type: type,
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: `${currency} Price (USD)`,
                          data: data,
                          backgroundColor: "rgba(86, 98, 70, 0.5)",
                          borderColor: "rgba(86, 98, 70, 1)",
                          borderWidth: 1,
                          fill: true,
                      },
                  ],
              },
              options: {
                  scales: {
                      x: {
                          type: "time",
                          ticks: {
                              autoSkip: true,
                              maxTicksLimit: 20,
                          },
                      },
                  },
              },
          });
        });
}

main();
