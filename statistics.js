//// Declarations states

// Variables
const severityObject = {
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
const chartInitial = async () => {
    // data setup
    
    const severityPortionChart = document.getElementById('severityPortionChart');
    const genderChart = document.getElementById('genderChart');

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
            backgroundColor: severityObject.colors,
            hoverOffset: 4
        }]
    };
    const ageData = {
        labels: ["18-30 ปี", "31-40 ปี", "41-50 ปี", "51-60 ปี"],
        datasets: [{
            label: "จำนวน",
            data: [4, 1, 0, 0],
            backgroundColor: severityObject.colors,
            hoverOffset: 4
        }]
    };
    const workTypeData = {
        labels: ["ลงบ่อหิน", "ตัดหิน", "ต๊อกหิน", "ผ่าหิน", "แกะสลักหิน"],
        datasets: [{
            label: "จำนวน",
            data: [2, 3, 3, 2, 1],
            backgroundColor: severityObject.colors,
            hoverOffset: 4
        }]
    };
    const severityPortionData = {
        labels: severityObject.levels,
        datasets: [{
            label: chartTitle.severityPortion,
            data: statisticsData.severitySummation,
            backgroundColor: severityObject.colors,
            hoverOffset: 4
        }]
    };
    // const userStatisticsData = statisticsData.userStatistics;

    // render data to the html elements

    new Chart(genderChart, {
        type: 'pie',
        data: genderData
    });

    new Chart(ageChart, {
        type: 'pie',
        data: ageData
    });

    new Chart(workTypeChart, {
        type: 'pie',
        data: workTypeData
    });

    new Chart(severityPortionChart, {
        type: 'pie',
        data: severityPortionData
    });
}

//// Executions state
window.onload = async () => {
    // access to the html elements
    chartInitial()

}
