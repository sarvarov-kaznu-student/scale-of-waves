const translations = {
    en: {
        title: "Electromagnetic Spectrum Visualizer",
        description: "Enter the Wavelength (meters), Frequency (Hertz), or Wave Number (rad/m or m⁻¹):",
        chooseType: "Choose Type:",
        classifyWave: "Classify Wave",
        wavelength: "Wavelength (m)",
        frequency: "Frequency (Hz)",
        waveNumberRad: "Wave Number (rad/m)",
        waveNumberM: "Wave Number (m⁻¹)",
        resultBox: {
            belongsTo: "The wave belongs to the",
            range: "range.",
            usedIn: "Used in",
            wavelength: "Wavelength:",
            frequency: "Frequency:",
            waveNumberRad: "Wave Number (rad/m):",
            waveNumberM: "Wave Number (m⁻¹):",
            error: "Invalid input!",
        },
        units: {
            meters: "meters",
            hertz: "Hz",
        },
        bands: ["Radio", "Microwave", "Infrared", "Visible", "Ultraviolet", "X-Ray", "Gamma Ray"],
    },
    kk: {
        title: "Электромагниттік спектр визуализаторы",
        description: "Толқын ұзындығын (метр), жиілікті (Герц), немесе толқын санын (рад/м немесе м⁻¹) енгізіңіз:",
        chooseType: "Түрін таңдаңыз:",
        classifyWave: "Толқынды жіктеу",
        wavelength: "Толқын ұзындығы: (м)",
        frequency: "Жиілік: (Гц)",
        waveNumberRad: "Толқын саны: (рад/м)",
        waveNumberM: "Толқын саны: (м⁻¹)",
        resultBox: {
            belongsTo: "Толқын",
            range: "аралығына жатады.",
            usedIn: "Қолданылады:",
            wavelength: "Толқын ұзындығы:",
            frequency: "Жиілік:",
            waveNumberRad: "Толқын саны (рад/м):",
            waveNumberM: "Толқын саны (м⁻¹):",
            error: "Жарамсыз енгізу түрі!",
        },
        units: {
            meters: "метр",
            hertz: "Гц",
        },
        bands: ["Радио", "Микротолқын", "Инфрақызыл", "Көрінетін", "Ультракүлгін", "Рентген", "Гамма-сәуле"],
    },
    ru: {
        title: "Визуализатор электромагнитного спектра",
        description: "Введите длину волны (метры), частоту (Герцы) или волновое число (рад/м или м⁻¹):",
        chooseType: "Выберите тип:",
        classifyWave: "Классифицировать волну",
        wavelength: "Длина волны: (м)",
        frequency: "Частота: (Гц)",
        waveNumberRad: "Волновое число: (рад/м)",
        waveNumberM: "Волновое число: (м⁻¹)",
        resultBox: {
            belongsTo: "Волна принадлежит",
            range: "диапазону.",
            usedIn: "Используется в",
            wavelength: "Длина волны:",
            frequency: "Частота:",
            waveNumberRad: "Волновое число (рад/м):",
            waveNumberM: "Волновое число (м⁻¹):",
            error: "Недопустимый тип ввода!",
        },
        units: {
            meters: "метры",
            hertz: "Гц",
        },
        bands: ["Радио", "Микроволны", "Инфракрасное", "Видимый", "Ультрафиолет", "Рентген", "Гамма-лучи"],
    },
};

// Default language
let currentLanguage = "en";

// Function to update the text content based on the selected language
function setLanguage(language) {
    currentLanguage = language;

    // Update main text content
    document.getElementById("title").textContent = translations[language].title;
    document.getElementById("description").textContent = translations[language].description;
    document.querySelector("label[for='inputType']").textContent = translations[language].chooseType;
    document.getElementById("classifyWaveButton").textContent = translations[language].classifyWave;

    // Update dropdown menu
    const inputType = document.getElementById("inputType");
    inputType.options[0].text = translations[language].wavelength;
    inputType.options[1].text = translations[language].frequency;
    inputType.options[2].text = translations[language].waveNumberRad;
    inputType.options[3].text = translations[language].waveNumberM;

    // Update result box
    const resultBox = document.getElementById("result");
    if (resultBox.dataset.result) {
        visualizeWave();
    }
}

// Event listener for language selection
document.getElementById("languageSelect").addEventListener("change", (e) => {
    setLanguage(e.target.value);
});

// Initialize the default language
setLanguage(currentLanguage);
