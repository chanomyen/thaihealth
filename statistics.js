//// Declarations states

// Variables
const sererityObject = {
    levels: ["ไม่มีนัยสำคัญ", "ต่ำ", "ปานกลาง", "สูง!", "สูงมาก!"],
    colors: ['#0d6efd', '#198754', '#ffc107', '#fd7e14', '#dc3545']
}

const chartTitle = {
    severityPortion: "จำนวน"
}

// Functions
const getStatisticsData = async () => {
    const baseUrl = 'https://asia-southeast1-thai-health-x.cloudfunctions.net/api/silicosis/statistics';
    // const baseUrl = 'http://localhost:5001/thai-health-x/asia-southeast1/api/silicosis/statistics';
    return await fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            return data;
        });
}

// Chart initial
function chartSetup() {

}

//// Executions state
window.onload = async () => {
    // access to the html elements
    const severityPortionChart = document.getElementById('severityPortionChart');
    const genderChart = document.getElementById('genderChart');
    const cummulativeLineChart = document.getElementById('cummulativeLineChart');

    // fetch data from server
    let statisticsData = {};
    await getStatisticsData()
        .then(data => {
            statisticsData = data.statisticsData;
        });
    const genderData = {
            labels: ["ชาย", "หญิง"],
            datasets: [{
                label: "จำนวน",
                data: [35, 45],
                backgroundColor: ["blue", "pink"],
                hoverOffset: 4
            }]
        };
    const severityPortionData = {
        labels: sererityObject.levels,
        datasets: [{
            label: chartTitle.severityPortion,
            data: statisticsData.severitySummation,
            backgroundColor: sererityObject.colors,
            hoverOffset: 4
        }]
    };
    const cummulativeLineData = {
        labels: ['February', 'March', 'April'],
        datasets: [
            {
                type: 'line',
                label: sererityObject.levels[0],
                data: [0, 2, 3],
                borderColor: sererityObject.colors[0],
                fill: false,
                tension: 0.1
            },
            {
                type: 'line',
                label: sererityObject.levels[1],
                data: [0, 1, 2],
                borderColor: sererityObject.colors[1],
                fill: false,
                tension: 0.1
            },
            {
                type: 'line',
                label: sererityObject.levels[2],
                data: [0, 2, 3],
                borderColor: sererityObject.colors[2],
                fill: false,
                tension: 0.1
            },
            {
                type: 'line',
                label: sererityObject.levels[3],
                data: [7, 2, 3],
                borderColor: sererityObject.colors[3],
                fill: false,
                tension: 0.1
            },
            {
                type: 'line',
                label: sererityObject.levels[4],
                data: [5, 4, 15],
                borderColor: sererityObject.colors[4],
                fill: false,
                tension: 0.1
            }
        ]
    }
    // const userStatisticsData = statisticsData.userStatistics;

    // render data to the html elements
    new Chart(severityPortionChart, {
        type: 'pie',
        data: severityPortionData
    });

    new Chart(genderChart, {
        type: 'pie',
        data: genderData
    });

    new Chart(cummulativeLineChart, {
        // type: 'line',
        data: cummulativeLineData
    });
}
