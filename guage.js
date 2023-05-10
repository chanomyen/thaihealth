const levels = ["ไม่มีนัยสำคัญ", "ต่ำ", "ปานกลาง", "สูง!", "สูงมาก!"]
const classLabels = ["info", "success", "warning", "warning", "danger"]
const recommendations = [
    "โปรดควบคุมปริมาณฝุ่นและลดเวลาในการทำงาน",
    "โปรดควบคุมปริมาณฝุ่นและลดเวลาในการทำงาน",
    "โปรดควบคุมปริมาณฝุ่นและลดเวลาในการทำงาน",
    "โปรดควบคุมปริมาณฝุ่นและลดเวลาในการทำงาน",
    "โปรดควบคุมปริมาณฝุ่นและลดเวลาในการทำงาน"
]

var barData = function () {
    return [
        0,
        1,
        2,
        3,
        4,
        // 5
    ];
};

var randomValue = function (data) {
    return Math.max.apply(null, data) * Math.random();
};

var data = barData();
var value = getLevel();

var config = {
    type: 'gauge',
    data: {
        //labels: ['Success', 'Warning', 'Warning', 'Error'],
        datasets: [{
            data: data,
            value: value,
            backgroundColor: ['blue', 'green', 'yellow', 'orange', 'red'],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        title: {
            display: false,
            text: ''
        },
        layout: {
            padding: {
                bottom: 30
            }
        },
        needle: {
            // Needle circle radius as the percentage of the chart area width
            radiusPercentage: 2,
            // Needle width as the percentage of the chart area width
            widthPercentage: 3.2,
            // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
            lengthPercentage: 80,
            // The color of the needle
            color: 'rgba(0, 0, 0, 1)'
        },
        valueLabel: {
            formatter: Math.round,
            display: false
        }
    }
};

const level = getLevel();

window.onload = function () {
    var ctx = document.getElementById('chart').getContext('2d');
    window.myGauge = new Chart(ctx, config);
    config.data.datasets.forEach(function (dataset) {
        dataset.data = barData();
        dataset.value = level;
    });
    document.getElementById("labelDisplay").innerHTML = `${levels[level]}`;
    document.getElementById("displayCard").classList.add(`text-bg-${classLabels[level]}`);
    document.getElementById("cardContent").innerHTML = recommendations[level];
    window.myGauge.update();
};

function getLevel() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const level = urlParams.get('level');
    return level;
}

const infographicButton = document.querySelector('button');
infographicButton.addEventListener('click', async (event) => {
    let baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    if (baseUrl.includes("github")) {
        baseUrl = `${baseUrl}/thaihealth`;
    }
    const nextPage = `${baseUrl}/infographic.html`;
    console.log(nextPage);
    window.location.replace(nextPage);
});