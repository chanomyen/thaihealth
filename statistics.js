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
    return await fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            return data;
        });
}

//// Executions state
window.onload = async () => {
    // access to the html elements
    const severityPortionChart = document.getElementById('severityPortionChart');

    // fetch data from server
    let statisticsData = {};
    await getStatisticsData()
        .then( data => {
            statisticsData = data.statisticsData;
        });

    const severityPortionData = {
        labels: sererityObject.levels,
        datasets: [{
            label: chartTitle.severityPortion,
            data: statisticsData.severitySummation,
            backgroundColor: sererityObject.colors,
            hoverOffset: 4
        }]
    };
    // const userStatisticsData = statisticsData.userStatistics;

    // render data to the html elements
    new Chart(severityPortionChart, {
        type: 'pie',
        data: severityPortionData
    });
}
