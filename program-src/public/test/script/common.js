function checkAllowHospital(hospital) {
    return true;
}

function setPatient(patient_hkid, cms_user_spec, cms_default_Ward) {
    if ( patient_hkid === "I5555552" ) {
        document.getElementById("patientKey").value = "92613112";
        document.getElementById("patientHKID").value = "I5555552";
        document.getElementById("chineseName").value = "陳民";
        document.getElementById("englishName").value = "CHAN, MAN";
        document.getElementById("sex").value = "M";
        document.getElementById("age").value = calculateAge("2009-01-01") + "y";
        document.getElementById("birthday").value = "2009-01-01";
        document.getElementById("caseNo").value = "HN17000088Y";
        document.getElementById("caseSpec").value = cms_user_spec;
        document.getElementById("caseNsCode").value = cms_default_Ward;
        document.getElementById("caseAdmDatetime").value = "2022-10-26 12:07:00.000";
    }
}

function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function submit(loginMethod) {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const env = urlParams.get('env')
    console.log(env);

    if (loginMethod === "ews") {

        switch (env) {
            case "local":
                document.forms[0].action = "http://localhost:8080/has-dass-api/auth/ews";
                break;
            case "dev":
                document.forms[0].action = "https://has-dass-api-has-corp-dass-dev.tstcld61.server.ha.org.hk/has-dass-api/auth/ews";
                break;
            case "sit":
                document.forms[0].action = "https://has-dass-api-has-corp-dass-sit.tstcld1.ha.org.hk/has-dass-api/auth/ews";
                break;
            case "aat":
                document.forms[0].action = "https://has-dass-api-has-corp-dass-aat.tstcld1.ha.org.hk/has-dass-api/auth/ews";
                break;
            default:
                document.forms[0].action = "https://has-dass-api-has-corp-dass-sit.tstcld1.ha.org.hk/has-dass-api/auth/ews";
        }

    } else {

        switch (env) {
            case "local":
                document.forms[0].action = "http://localhost:8080/has-dass-api/auth/cms";
                break;
            case "dev":
                document.forms[0].action = "https://has-dass-api-has-corp-dass-dev.tstcld61.server.ha.org.hk/has-dass-api/auth/cms";
                break;
            case "sit":
                document.forms[0].action = "https://has-dass-api-has-corp-dass-sit.tstcld1.ha.org.hk/has-dass-api/auth/cms";
                break;
            case "aat":
                document.forms[0].action = "https://has-dass-api-has-corp-dass-aat.tstcld1.ha.org.hk/has-dass-api/auth/cms";
                break;
            default:
                document.forms[0].action = "https://has-dass-api-has-corp-dass-sit.tstcld1.ha.org.hk/has-dass-api/auth/cms";
        }
    }

    document.forms[0].submit();
}