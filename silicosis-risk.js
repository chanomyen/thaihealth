function calculateRisk(dustDensity, workHours, hasDisease, workLocation) {
    return 9.481 + (317.267 * dustDensity) + (0.712 * workHours) - (2.863 * hasDisease) + (1.374 * workLocation);
};

function calculateLevel(riskScore) {
    if ((riskScore >= 1) && (riskScore <= 3)) {
        return 0;
    } else if (riskScore >= (4) && (riskScore < 10)) {
        return 1;
    } else if ((riskScore >= 10) && (riskScore < 17)) {
        return 2;
    } else if ((riskScore >= 17) && (riskScore < 21)) {
        return 3;
    } else if ((riskScore >= 21) && (riskScore < 26)) {
        return 4;
    } else {
        return 4;
    }
};

const severities = ['ไม่มีนัยสำคัญ', 'ต่ำ', 'ปานกลาง', 'สูง', 'สูงมาก'];

function goToResultPage(level) {
    let baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    if (baseUrl.includes("github")) {
        baseUrl = `${baseUrl}/thaihealth`;
    }
    const nextPage = `${baseUrl}/result.html?level=${level}`;
    console.log(nextPage);
    window.location.replace(nextPage);
}

const silicosisRiskForm = document.querySelector('form');
silicosisRiskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const dustDensity = document.getElementById('dust_density').value;
    const workHours = document.getElementById('work_hours').value;
    const hasDisease = document.getElementById('has_disease').value;
    const workLocation = document.getElementById('work_location').value;

    const riskScore = calculateRisk(dustDensity, workHours, hasDisease, workLocation);
    const riskLevel = calculateLevel(riskScore);
    const alertMessage = `score: ${riskScore}\nlevel: ${riskLevel}\ndisplay: ${severities[riskLevel]}`
    // alert(alertMessage);
    goToResultPage(riskLevel);
});