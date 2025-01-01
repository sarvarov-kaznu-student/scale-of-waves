const c = 3e8; // Speed of light in m/s

const spectrumRanges = [
    { label: "Radio", min: Infinity, max: 1 },
    { label: "Microwave", min: 1, max: 1e-3 },
    { label: "Infrared", min: 1e-3, max: 7e-7 },
    { label: "Visible", min: 7e-7, max: 4e-7 },
    { label: "Ultraviolet", min: 4e-7, max: 1e-8 },
    { label: "X-Ray", min: 1e-8, max: 1e-12 },
    { label: "Gamma Ray", min: 1e-12, max: 0 },
];

const rangeDetails = {
    Radio: "Used in broadcasting, communications, and radar.",
    Microwave: "Used in cooking, satellite communications, and radar.",
    Infrared: "Used in remote controls, thermal imaging, and astronomy.",
    Visible: "The only spectrum visible to the human eye.",
    Ultraviolet: "Used in sterilization, black lights, and astronomy.",
    "X-Ray": "Used in medical imaging and security scanning.",
    "Gamma Ray": "Used in cancer treatment and nuclear physics.",
};

function classifyWave(wavelength) {
    for (const range of spectrumRanges) {
        if (wavelength <= range.min && wavelength > range.max) {
            return range;
        }
    }
    return null;
}

function formatScientificNotation(value) {
    const exponent = Math.floor(Math.log10(value));
    const base = value / Math.pow(10, exponent);
    return `${base.toFixed(2)} × 10<sup>${exponent}</sup>`;
}

function visualizeWave() {
    const inputType = document.getElementById("inputType").value;
    const baseValue = parseFloat(document.getElementById("valueInput").value);
    const exponentValue = parseInt(document.getElementById("exponentInput").value);

    let wavelength, frequency, waveNumberRad, waveNumberM;

    if (isNaN(baseValue) || isNaN(exponentValue)) {
        document.getElementById("result").innerText =
            translations[currentLanguage].resultBox.error || "Invalid input!";
        return;
    }

    const value = baseValue * Math.pow(10, exponentValue);

    if (inputType === "wavelength") {
        wavelength = value;
        frequency = c / wavelength;
        waveNumberRad = 2 * Math.PI / wavelength;
        waveNumberM = 1 / wavelength;
    } else if (inputType === "frequency") {
        frequency = value;
        wavelength = c / frequency;
        waveNumberRad = 2 * Math.PI / wavelength;
        waveNumberM = 1 / wavelength;
    } else if (inputType === "waveNumberRad") {
        waveNumberRad = value;
        wavelength = 2 * Math.PI / waveNumberRad;
        frequency = c / wavelength;
        waveNumberM = 1 / wavelength;
    } else if (inputType === "waveNumberInverse") {
        waveNumberM = value;
        wavelength = 1 / waveNumberM;
        frequency = c / wavelength;
        waveNumberRad = 2 * Math.PI / wavelength;
    } else {
        document.getElementById("result").innerText =
            translations[currentLanguage].resultBox.error || "Invalid input!";
        return;
    }

    const waveRange = classifyWave(wavelength);
    const formattedWavelength = formatScientificNotation(wavelength);
    const formattedFrequency = formatScientificNotation(frequency);
    const formattedWaveNumberRad = formatScientificNotation(waveNumberRad);
    const formattedWaveNumberM = formatScientificNotation(waveNumberM);

    if (waveRange) {
        document.getElementById(
            "result"
        ).innerHTML = `
            ${translations[currentLanguage].resultBox.belongsTo} '${translations[currentLanguage].bands[spectrumRanges.indexOf(waveRange)]}' ${translations[currentLanguage].resultBox.range} ${translations[currentLanguage].resultBox.usedIn} ${translations[currentLanguage].bands[spectrumRanges.indexOf(waveRange)]}.<br>
            ${translations[currentLanguage].resultBox.wavelength} ${formattedWavelength} ${translations[currentLanguage].units.meters}.<br>
            ${translations[currentLanguage].resultBox.frequency} ${formattedFrequency} ${translations[currentLanguage].units.hertz}.<br>
            ${translations[currentLanguage].resultBox.waveNumberRad} ${formattedWaveNumberRad}.<br>
            ${translations[currentLanguage].resultBox.waveNumberM} ${formattedWaveNumberM}.
        `;
        drawSpectrum(waveRange, wavelength);
    } else {
        document.getElementById("result").innerText =
            translations[currentLanguage].resultBox.error || "Invalid input!";
    }
}

function drawSpectrum(selectedRange, wavelength) {
    const canvas = document.getElementById("spectrumCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const totalWidth = canvas.width;
    const centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.moveTo(0, centerY);

    let x = 0;
    const totalPoints = 1000;
    const totalRanges = spectrumRanges.length;

    for (let i = 0; i < totalPoints; i++) {
        const rangeIndex = Math.floor((i / totalPoints) * totalRanges);
        const wavelengthAdjust = 10 + (totalRanges - rangeIndex) * 5;

        const y = centerY + Math.sin((x / wavelengthAdjust) * Math.PI * 2) * 20;
        ctx.lineTo(x, y);
        x += totalWidth / totalPoints;
    }

    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;
    ctx.stroke();

    const selectedIndex = spectrumRanges.indexOf(selectedRange);
    const xStart = selectedIndex * (totalWidth / spectrumRanges.length);

    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 4;
    ctx.strokeRect(
        xStart,
        centerY - 50,
        totalWidth / spectrumRanges.length,
        100
    );

    const rangeStart = spectrumRanges
        .slice(0, selectedIndex)
        .reduce((sum, r) => sum + totalWidth / spectrumRanges.length, 0);
    const rangeWidth = totalWidth / spectrumRanges.length;

    const relativePosition =
        (selectedRange.min - wavelength) /
        (selectedRange.min - selectedRange.max);
    const wavelengthPosition =
        rangeStart + relativePosition * rangeWidth;

    ctx.beginPath();
    ctx.moveTo(wavelengthPosition, 0);
    ctx.lineTo(wavelengthPosition, canvas.height);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add labels for each diapason range
    spectrumRanges.forEach((range, index) => {
        const xStart =
            index * (canvas.width / spectrumRanges.length) + 5;
        ctx.font = "bold 14px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.fillText(
            translations[currentLanguage].bands[index],
            xStart + (canvas.width / spectrumRanges.length) / 2,
            canvas.height - 10
        );
    });
}
