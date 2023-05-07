const isOtherWorkTypeCheckbox = document.getElementById("otherWorkType");
const otherWorkTypeInput = document.getElementById("otherWorkTypeValue");
isOtherWorkTypeCheckbox.addEventListener('change', () => {
    if (isOtherWorkTypeCheckbox.checked) {
        otherWorkTypeInput.disabled = false;
    } else {
        otherWorkTypeInput.disabled = true;
    }
});

const submitBtn = document.getElementById("submitBtn");

const userRegisterForm = document.querySelector('form');
userRegisterForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const isOtherWorkType = document.getElementById("otherWorkType").checked;
    
    let otherWorkTypeValue = "";
    if (isOtherWorkType) {
        otherWorkTypeValue = document.getElementById("otherWorkTypeValue").value;
    }

    const data = new FormData(userRegisterForm); // create a FormData object from the form inputs
    const formDataObject = Object.fromEntries(data);

    formDataObject.homeAddress = document.getElementById("homeAddress").value;

    formDataObject.isCutStone = document.getElementById("cutStone").checked;
    formDataObject.isStonePond = document.getElementById("stonePond").checked;
    formDataObject.isTockStone = document.getElementById("tockStone").checked;
    formDataObject.isRipStone = document.getElementById("ripStone").checked;
    formDataObject.isCarveStone = document.getElementById("carveStone").checked;
    formDataObject.otherWorkTypeValue = otherWorkTypeValue;

    formDataObject.lineId = "(unique ID)";
    formDataObject.lineName = "(demo name)";

    const json = JSON.stringify(formDataObject); // convert the FormData object to a JSON string
    console.log(json);
    console.log(formDataObject);

    submitBtn.innerHTML = "กำลังส่งข้อมูล...";
    submitBtn.disabled = true;
    submitBtn.className = "btn btn-info btn-lg";
    const baseUrl = window.location.origin.split(":")[0];
    const url = "http://localhost:5001/thai-health-x/asia-southeast1/api/user/"
    fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
    })
    .then(response => {
      console.log('Success:', response);
      submitBtn.innerHTML = "เสร็จสิ้น";
      submitBtn.className = "btn btn-success btn-lg";
      // handle the successful response from the server here
    })
    .catch(error => {
      console.error('Error:', error);
      submitBtn.innerHTML = "ล้มเหลว";
      submitBtn.className = "btn btn-danger btn-lg";
      // handle any errors that occur during the request here
    });
});

const burlBtn = document.getElementById("burl");
burlBtn.addEventListener("click", () => {
    // console.log(document.getElementById("homeAddress").value);
    
    submitBtn.innerHTML = "กำลังส่งข้อมูล...";
});