
/* =====================================================
   THERMOQUEST
   INTERACTIVE WEBSITE FUNCTIONS
===================================================== */


/* 1. MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("show");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';

    });

}


/* 2. CLOSE MENU AFTER CLICKING A LINK */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks?.classList.remove("show");

        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Open navigation");

        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }

    });

});


/* 3. ACTIVE NAVIGATION HIGHLIGHT */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 130;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }

    });

    navigationLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );

    });

}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();


/* 4. REVEAL SECTIONS WHEN SCROLLING */

const revealElements = document.querySelectorAll(
    ".fact-card, .lesson-card, .law-card, .resource-item, .activity-card"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {

        element.classList.add("reveal");
        revealObserver.observe(element);

    });

}


/* 5. FOOTER CURRENT YEAR */

const currentYear = document.querySelector(".footer-bottom p");

if (currentYear) {

    currentYear.textContent =
        `© ${new Date().getFullYear()} THERMOQUEST. Educational Project.`;

}


/* 6. WEBSITE INITIALIZATION */

document.addEventListener("DOMContentLoaded", () => {

    console.log("THERMOQUEST successfully initialized.");

    console.log("Welcome to the Thermodynamics Learning Platform.");

});

/* =====================================================
   THERMOQUEST KNOWLEDGE CHALLENGE
===================================================== */

const quizQuestions = [
    {
        question: "What does thermodynamics primarily study?",
        answers: [
            "Living organisms",
            "Heat, energy, and work",
            "Sound waves",
            "Electric circuits"
        ],
        correct: 1,
        explanation: "Thermodynamics studies heat, energy, work, and their relationships."
    },
    {
        question: "What is the SI unit of temperature?",
        answers: [
            "Celsius",
            "Fahrenheit",
            "Kelvin",
            "Joule"
        ],
        correct: 2,
        explanation: "The kelvin (K) is the SI base unit of thermodynamic temperature."
    },
    {
        question: "Which method of heat transfer requires direct contact?",
        answers: [
            "Radiation",
            "Conduction",
            "Convection",
            "Reflection"
        ],
        correct: 1,
        explanation: "Conduction transfers thermal energy through direct contact."
    },
    {
        question: "Which method of heat transfer can occur through a vacuum?",
        answers: [
            "Conduction",
            "Convection",
            "Radiation",
            "Evaporation"
        ],
        correct: 2,
        explanation: "Radiation transfers energy through electromagnetic waves and does not require a material medium."
    },
    {
        question: "What does the First Law of Thermodynamics represent?",
        answers: [
            "Conservation of energy",
            "Conservation of mass",
            "Increase of pressure",
            "Decrease of temperature"
        ],
        correct: 0,
        explanation: "The First Law expresses the conservation of energy in thermodynamic systems."
    },
    {
        question: "What is the symbol commonly used for entropy?",
        answers: [
            "Q",
            "W",
            "S",
            "P"
        ],
        correct: 2,
        explanation: "Entropy is commonly represented by the symbol S."
    },
    {
        question: "What type of system exchanges both matter and energy?",
        answers: [
            "Open system",
            "Closed system",
            "Isolated system",
            "Perfect system"
        ],
        correct: 0,
        explanation: "An open system can exchange both matter and energy with its surroundings."
    },
    {
        question: "Which device uses thermodynamic principles to remove heat from a space?",
        answers: [
            "Electric lamp",
            "Refrigerator",
            "Simple mirror",
            "Compass"
        ],
        correct: 1,
        explanation: "A refrigerator uses work input to transfer heat from a colder region to a warmer surrounding."
    },
    {
        question: "What is the equation for heat energy when specific heat capacity is constant?",
        answers: [
            "Q = mcΔT",
            "Q = m/c",
            "Q = W/t",
            "Q = P/V"
        ],
        correct: 0,
        explanation: "Q = mcΔT relates heat transfer to mass, specific heat capacity, and temperature change."
    },
    {
        question: "What happens to the entropy of an isolated system during a spontaneous process?",
        answers: [
            "It always decreases",
            "It cannot decrease",
            "It becomes zero",
            "It disappears"
        ],
        correct: 1,
        explanation: "The Second Law states that the total entropy of an isolated system cannot decrease."
    }
];

const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("score");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progressBar");
const quizResult = document.getElementById("quizResult");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const restartButton = document.getElementById("restartButton");

let currentQuestion = 0;
let quizScore = 0;
let answerSelected = false;

function loadQuestion() {

    if (!questionText || !answerButtons) return;

    answerSelected = false;

    const current = quizQuestions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    questionText.textContent = current.question;

    answerButtons.innerHTML = "";

    feedback.textContent = "";

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === quizQuestions.length - 1
            ? "See Results"
            : "Next Question";

    progressBar.style.width =
        `${(currentQuestion / quizQuestions.length) * 100}%`;

    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answerButtons.appendChild(button);

    });

}

function checkAnswer(selectedIndex, selectedButton) {

    if (answerSelected) return;

    answerSelected = true;

    const current = quizQuestions[currentQuestion];

    const allButtons =
        answerButtons.querySelectorAll(".answer-button");

    allButtons.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === current.correct) {

        quizScore++;

        selectedButton.classList.add("correct");

        feedback.textContent =
            "Correct! " + current.explanation;

    } else {

        selectedButton.classList.add("incorrect");

        allButtons[current.correct].classList.add("correct");

        feedback.textContent =
            "Not quite. The correct answer is " +
            current.answers[current.correct] +
            ". " + current.explanation;

    }

    scoreDisplay.textContent = quizScore;

    nextButton.disabled = false;

    progressBar.style.width =
        `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

}

function showResults() {

    questionText.hidden = true;
    questionNumber.hidden = true;
    answerButtons.hidden = true;
    feedback.hidden = true;
    nextButton.hidden = true;

    quizResult.hidden = false;

    finalScore.textContent =
        `${quizScore} / ${quizQuestions.length}`;

    const percentage =
        (quizScore / quizQuestions.length) * 100;

    if (percentage >= 90) {
        resultMessage.textContent =
            "Excellent work! You have an outstanding understanding of thermodynamics.";
    } else if (percentage >= 70) {
        resultMessage.textContent =
            "Great job! Keep reviewing to strengthen your scientific knowledge.";
    } else if (percentage >= 50) {
        resultMessage.textContent =
            "Good effort! Review the lessons and try the challenge again.";
    } else {
        resultMessage.textContent =
            "Keep learning! Revisit the lessons and practice again.";
    }

}

if (nextButton) {

    nextButton.addEventListener("click", () => {

        if (!answerSelected) return;

        if (currentQuestion < quizQuestions.length - 1) {

            currentQuestion++;

            loadQuestion();

        } else {

            showResults();

        }

    });

}

if (restartButton) {

    restartButton.addEventListener("click", () => {
        console.log("THERMOQUEST START BUTTON CONNECTED");

        currentQuestion = 0;
        quizScore = 0;

        scoreDisplay.textContent = "0";

        quizResult.hidden = true;

        questionText.hidden = false;
        questionNumber.hidden = false;
        answerButtons.hidden = false;
        feedback.hidden = false;
        nextButton.hidden = false;

        loadQuestion();

    });

}

if (questionText && answerButtons && nextButton) {
    loadQuestion();
}

/* =====================================================
   THERMOQUEST HEAT TRANSFER SIMULATION
===================================================== */

const hotSlider = document.getElementById("hotTemperature");
const coldSlider = document.getElementById("coldTemperature");

const hotValue = document.getElementById("hotTemperatureValue");
const coldValue = document.getElementById("coldTemperatureValue");

const hotDisplay = document.getElementById("hotDisplay");
const coldDisplay = document.getElementById("coldDisplay");

const equilibriumDisplay =
    document.getElementById("equilibriumTemperature");

const simulationResult =
    document.getElementById("simulationResult");

const runSimulation =
    document.getElementById("runSimulation");

const resetSimulation =
    document.getElementById("resetSimulation");


function updateTemperatureDisplays() {

    if (!hotSlider || !coldSlider) return;

    hotValue.textContent = `${hotSlider.value} °C`;
    coldValue.textContent = `${coldSlider.value} °C`;

    hotDisplay.textContent = `${hotSlider.value} °C`;
    coldDisplay.textContent = `${coldSlider.value} °C`;

    equilibriumDisplay.textContent = "-- °C";

    simulationResult.textContent =
        "Temperature settings updated. Run the simulation to observe heat transfer.";
}


if (hotSlider && coldSlider) {

    hotSlider.addEventListener("input", updateTemperatureDisplays);

    coldSlider.addEventListener("input", updateTemperatureDisplays);

}


if (runSimulation) {

    runSimulation.addEventListener("click", () => {

        const hotTemperature = Number(hotSlider.value);
        const coldTemperature = Number(coldSlider.value);

        if (hotTemperature <= coldTemperature) {

            equilibriumDisplay.textContent = "-- °C";

            simulationResult.textContent =
                "Please set the hot object's temperature higher than the cold object's temperature.";

            return;

        }

        // Equal masses and equal specific heat capacities:
        const finalTemperature =
            (hotTemperature + coldTemperature) / 2;

        equilibriumDisplay.textContent =
            `${finalTemperature.toFixed(1)} °C`;

        simulationResult.innerHTML =
            `<strong>Simulation completed.</strong><br>
            Initial hot temperature: ${hotTemperature} °C<br>
            Initial cold temperature: ${coldTemperature} °C<br>
            Final equilibrium temperature: ${finalTemperature.toFixed(1)} °C<br><br>
            Heat transfers from the hotter object to the colder object
            until both reach the same temperature.`;

    });

}


if (resetSimulation) {

    resetSimulation.addEventListener("click", () => {

        hotSlider.value = 80;
        coldSlider.value = 20;

        updateTemperatureDisplays();

        simulationResult.textContent =
            "Simulation reset. Adjust the temperatures and run a new experiment.";

    });

}


if (hotSlider && coldSlider) {
    updateTemperatureDisplays();
}

/* =====================================================
   THREE METHODS OF HEAT TRANSFER
===================================================== */

const heatMethods = {

    conduction: {
        label: "METHOD 01",
        title: "Conduction",
        description:
            "Conduction is the transfer of thermal energy through direct contact between particles. It commonly occurs in solids.",
        example:
            "A metal spoon becomes hot when placed inside a pot of hot soup.",
        principle:
            "Energy transfers through particle interactions without bulk movement of the material.",
        observation:
            "The heated end transfers energy along the metal rod toward the cooler end.",
        visual: `
            <div class="conduction-visual">
                <div class="metal-rod">
                    <div class="heat-source">HEAT</div>
                    <div class="heat-particles">
                        <span></span><span></span><span></span>
                        <span></span><span></span>
                    </div>
                </div>
            </div>
        `
    },

    convection: {
        label: "METHOD 02",
        title: "Convection",
        description:
            "Convection is the transfer of thermal energy through the movement of fluids, such as liquids and gases.",
        example:
            "Water circulates inside a pot as it is heated.",
        principle:
            "Temperature differences can create density differences that cause fluid movement.",
        observation:
            "Warmer, less dense fluid rises while cooler, denser fluid sinks, creating circulation.",
        visual: `
            <div class="convection-visual">
                <div class="convection-current current-one"></div>
                <div class="convection-current current-two"></div>
            </div>
        `
    },

    radiation: {
        label: "METHOD 03",
        title: "Radiation",
        description:
            "Radiation transfers thermal energy through electromagnetic waves. It does not require direct contact or a material medium.",
        example:
            "Energy from the Sun travels through space and warms Earth's surface.",
        principle:
            "Thermal radiation is electromagnetic energy emitted by matter because of its temperature.",
        observation:
            "Energy travels from the source to another object through electromagnetic waves.",
        visual: `
            <div class="radiation-visual">
                <div class="radiation-sun"></div>
                <div class="radiation-waves"></div>
                <div class="radiation-earth"></div>
            </div>
        `
    }

};

const heatTabs = document.querySelectorAll(".heat-tab");
const heatVisual = document.getElementById("heatVisual");
const methodLabel = document.getElementById("methodLabel");
const methodTitle = document.getElementById("methodTitle");
const methodDescription = document.getElementById("methodDescription");
const methodExample = document.getElementById("methodExample");
const methodPrinciple = document.getElementById("methodPrinciple");
const heatExploreButton = document.getElementById("heatExploreButton");
const heatObservation = document.getElementById("heatObservation");

let selectedHeatMethod = "conduction";

function selectHeatMethod(method) {

    const data = heatMethods[method];

    if (!data) return;

    selectedHeatMethod = method;

    heatTabs.forEach(tab => {

        const isActive = tab.dataset.method === method;

        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-pressed", String(isActive));

    });

    methodLabel.textContent = data.label;
    methodTitle.textContent = data.title;
    methodDescription.textContent = data.description;
    methodExample.textContent = data.example;
    methodPrinciple.textContent = data.principle;

    heatVisual.innerHTML = data.visual;

    heatObservation.textContent =
        "Select Explore This Method to begin.";

}

heatTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        selectHeatMethod(tab.dataset.method);

    });

});

if (heatExploreButton) {

    heatExploreButton.addEventListener("click", () => {

        const data = heatMethods[selectedHeatMethod];

        heatObservation.textContent = data.observation;

    });

}

if (heatVisual && methodTitle) {

    selectHeatMethod("conduction");

}

/* =====================================================
   THERMOQUEST - ADVANCED 50-QUESTION ASSESSMENT
===================================================== */

(function () {
    const assessmentQuestions = [

        // TOPIC 1: INTRODUCTION TO THERMODYNAMICS (7)

        {
            topic: "introduction",
            question: "A gas is enclosed in a rigid, sealed, perfectly insulated container. Which classification best describes the system?",
            options: ["Open system", "Closed system", "Isolated system", "Steady-flow system"],
            answer: 2,
            explanation: "An isolated system exchanges neither mass nor energy with its surroundings. The rigid, sealed, insulated container satisfies these conditions."
        },
        {
            topic: "introduction",
            question: "Which statement correctly distinguishes an intensive property from an extensive property?",
            options: [
                "Intensive properties depend on mass.",
                "Extensive properties are independent of system size.",
                "Intensive properties are independent of the amount of substance.",
                "Both properties depend directly on system volume."
            ],
            answer: 2,
            explanation: "Temperature and pressure are intensive properties. Mass and total volume are extensive properties because they depend on the amount of matter."
        },
        {
            topic: "introduction",
            question: "A system undergoes a cyclic process and returns to its initial state. What is the net change in its internal energy?",
            options: ["Positive", "Negative", "Zero", "Equal to the heat supplied"],
            answer: 2,
            explanation: "Internal energy is a state function. Since the system returns to its initial state, its net change in internal energy is zero."
        },
        {
            topic: "introduction",
            question: "Which condition must be satisfied for a system to be in thermodynamic equilibrium?",
            options: [
                "Only mechanical equilibrium",
                "Only thermal equilibrium",
                "Thermal, mechanical, and chemical equilibrium",
                "Constant volume under all conditions"
            ],
            answer: 2,
            explanation: "Thermodynamic equilibrium requires thermal, mechanical, and chemical equilibrium, with no spontaneous macroscopic changes."
        },
        {
            topic: "introduction",
            question: "A gas expands inside a piston-cylinder device while its temperature and pressure change. Which statement is correct?",
            options: [
                "The system must be isolated.",
                "The system can be analyzed using thermodynamic state properties.",
                "The gas cannot exchange energy.",
                "The gas must remain at constant volume."
            ],
            answer: 1,
            explanation: "Thermodynamics analyzes systems through properties such as pressure, temperature, volume, and internal energy, even when these properties change."
        },
        {
            topic: "introduction",
            question: "Which statement best describes a quasi-static thermodynamic process?",
            options: [
                "A process occurring instantaneously",
                "A process maintained sufficiently close to equilibrium states",
                "A process with no energy transfer",
                "A process that always occurs at constant temperature"
            ],
            answer: 1,
            explanation: "A quasi-static process proceeds slowly enough that the system passes through states very close to thermodynamic equilibrium."
        },
        {
            topic: "introduction",
            question: "Two systems are separately in thermal equilibrium with a third system. According to which law are they in thermal equilibrium with each other?",
            options: ["First Law", "Second Law", "Third Law", "Zeroth Law"],
            answer: 3,
            explanation: "The Zeroth Law of Thermodynamics establishes the transitive nature of thermal equilibrium and provides the basis for temperature measurement."
        },

        // TOPIC 2: TEMPERATURE AND HEAT (8)

        {
            topic: "temperature",
            question: "A temperature of 127°C is equivalent to approximately how many kelvin?",
            options: ["146 K", "273 K", "300 K", "400 K"],
            answer: 3,
            explanation: "K = °C + 273.15. Therefore, 127 + 273.15 = 400.15 K, approximately 400 K."
        },
        {
            topic: "temperature",
            question: "A 2 kg metal block with specific heat capacity of 450 J/(kg·K) is heated from 20°C to 80°C. How much heat is absorbed?",
            options: ["27,000 J", "45,000 J", "54,000 J", "72,000 J"],
            answer: 2,
            explanation: "Q = mcΔT = 2 × 450 × (80 − 20) = 54,000 J."
        },
        {
            topic: "temperature",
            question: "Two objects at different temperatures are placed in thermal contact inside an insulated enclosure. What determines the final equilibrium temperature?",
            options: [
                "The initial temperature of the hotter object only",
                "The total mass only",
                "Their masses, specific heat capacities, and initial temperatures",
                "The surface area only"
            ],
            answer: 2,
            explanation: "The final temperature follows conservation of energy. The heat lost by the hotter object equals the heat gained by the colder object, assuming no losses."
        },
        {
            topic: "temperature",
            question: "A 0.5 kg substance absorbs 10,000 J of heat and its temperature increases by 20 K. What is its specific heat capacity?",
            options: ["500 J/(kg·K)", "750 J/(kg·K)", "1,000 J/(kg·K)", "2,000 J/(kg·K)"],
            answer: 2,
            explanation: "c = Q/(mΔT) = 10,000/(0.5 × 20) = 1,000 J/(kg·K)."
        },
        {
            topic: "temperature",
            question: "Why does a substance generally remain at constant temperature during melting at constant pressure?",
            options: [
                "Its particles stop moving.",
                "The supplied energy changes the phase rather than increasing temperature.",
                "The substance stops absorbing energy.",
                "Its specific heat capacity becomes zero."
            ],
            answer: 1,
            explanation: "During a phase transition, supplied energy is used as latent heat to change the substance's phase rather than raise its temperature."
        },
        {
            topic: "temperature",
            question: "A 1 kg sample of water absorbs 8,400 J of heat. If its specific heat capacity is 4,200 J/(kg·K), what is its temperature increase?",
            options: ["0.5 K", "1 K", "2 K", "4 K"],
            answer: 2,
            explanation: "ΔT = Q/(mc) = 8,400/(1 × 4,200) = 2 K."
        },
        {
            topic: "temperature",
            question: "Which statement about heat and temperature is scientifically correct?",
            options: [
                "Heat is a property stored in an object.",
                "Temperature measures the total thermal energy of an object.",
                "Heat is energy transferred because of a temperature difference.",
                "Heat and temperature have identical SI units."
            ],
            answer: 2,
            explanation: "Heat is energy in transit due to a temperature difference. Temperature is a thermodynamic property that indicates the thermal state of a system."
        },
        {
            topic: "temperature",
            question: "A 0.2 kg metal object at 100°C is placed in 0.3 kg of water at 20°C. Assuming no heat loss, the final temperature is 25°C. What is the heat capacity of the metal per kilogram? Use water's specific heat capacity of 4,200 J/(kg·K).",
            options: ["420 J/(kg·K)", "525 J/(kg·K)", "840 J/(kg·K)", "1,050 J/(kg·K)"],
            answer: 1,
            explanation: "Heat gained by water = 0.3 × 4,200 × 5 = 6,300 J. Heat lost by metal = 0.2 × c × 75. Equating gives c = 420 J/(kg·K). Correction: 6,300 = 15c, so c = 420 J/(kg·K). The correct option is A."
        },

        // TOPIC 3: HEAT TRANSFER (9)

        {
            topic: "transfer",
            question: "A composite wall has two layers in series. Layer A has thermal resistance of 0.4 K/W and Layer B has 0.6 K/W. If the temperature difference is 50 K, what is the heat transfer rate?",
            options: ["25 W", "50 W", "75 W", "125 W"],
            answer: 1,
            explanation: "For layers in series, total resistance = 0.4 + 0.6 = 1.0 K/W. Heat transfer rate = ΔT/R = 50/1 = 50 W."
        },
        {
            topic: "transfer",
            question: "Which mechanism of heat transfer can occur through a vacuum?",
            options: ["Conduction only", "Convection only", "Radiation only", "Conduction and convection"],
            answer: 2,
            explanation: "Thermal radiation is transferred by electromagnetic waves and does not require a material medium."
        },
        {
            topic: "transfer",
            question: "A wall has a thermal conductivity of 0.8 W/(m·K), an area of 10 m², a thickness of 0.2 m, and a temperature difference of 30 K. What is the steady conduction heat transfer rate?",
            options: ["120 W", "600 W", "1,200 W", "2,400 W"],
            answer: 2,
            explanation: "Using Q̇ = kAΔT/L: (0.8 × 10 × 30)/0.2 = 1,200 W."
        },
        {
            topic: "transfer",
            question: "In natural convection, what primarily causes fluid movement?",
            options: [
                "An external mechanical pump",
                "Density differences caused by temperature variations",
                "Electromagnetic radiation",
                "A constant pressure throughout the fluid"
            ],
            answer: 1,
            explanation: "Heating changes fluid density. Buoyancy forces cause warmer, less dense fluid to rise and cooler, denser fluid to descend."
        },
        {
            topic: "transfer",
            question: "According to Newton's law of cooling, the convective heat transfer rate is proportional to which quantity?",
            options: [
                "The square of the temperature difference",
                "The temperature difference between the surface and fluid",
                "The volume of the solid only",
                "The absolute temperature of the surroundings only"
            ],
            answer: 1,
            explanation: "Newton's law of cooling is Q̇ = hA(Ts − T∞), where h is the convection heat transfer coefficient."
        },
        {
            topic: "transfer",
            question: "A surface has emissivity 0.8 and area 2 m². Its temperature is 500 K, while the surroundings are at 300 K. Using σ = 5.67 × 10⁻⁸ W/(m²·K⁴), what is the approximate net radiation rate?",
            options: ["1.23 kW", "2.47 kW", "3.54 kW", "5.67 kW"],
            answer: 1,
            explanation: "Q̇ = εσA(Ts⁴ − Tsur⁴). Substitution gives approximately 2,470 W, or 2.47 kW."
        },
        {
            topic: "transfer",
            question: "Why are insulating materials commonly designed with trapped air pockets?",
            options: [
                "Air has extremely high thermal conductivity.",
                "Trapped air reduces heat transfer by limiting conduction and bulk fluid movement.",
                "Air produces heat continuously.",
                "Air eliminates thermal radiation completely."
            ],
            answer: 1,
            explanation: "Small trapped air spaces reduce conduction and suppress convection currents, improving insulation. Radiation may still occur."
        },
        {
            topic: "transfer",
            question: "A heat exchanger transfers 20 kW from a hot fluid to a cold fluid. If the cold fluid has a mass flow rate of 0.5 kg/s and specific heat capacity of 4,000 J/(kg·K), what is its temperature increase?",
            options: ["5 K", "10 K", "15 K", "20 K"],
            answer: 1,
            explanation: "Q̇ = ṁcpΔT. Therefore, ΔT = 20,000/(0.5 × 4,000) = 10 K."
        },
        {
            topic: "transfer",
            question: "Which change would increase the conductive heat transfer rate through a plane wall, assuming other factors remain constant?",
            options: [
                "Increasing wall thickness",
                "Decreasing thermal conductivity",
                "Increasing surface area",
                "Reducing the temperature difference"
            ],
            answer: 2,
            explanation: "Fourier's law gives Q̇ = kAΔT/L. Increasing area directly increases the conduction heat transfer rate."
        },

        // TOPIC 4: INTERNAL ENERGY AND WORK (9)

        {
            topic: "energy",
            question: "A system absorbs 800 J of heat and performs 300 J of work on its surroundings. What is its change in internal energy?",
            options: ["300 J", "500 J", "800 J", "1,100 J"],
            answer: 1,
            explanation: "Using ΔU = Q − W, ΔU = 800 − 300 = 500 J."
        },
        {
            topic: "energy",
            question: "A gas is compressed and 400 J of work is done on it. It releases 150 J of heat. What is its change in internal energy?",
            options: ["−550 J", "−250 J", "250 J", "550 J"],
            answer: 2,
            explanation: "With work done on the system, W by the system = −400 J. Heat released means Q = −150 J. Thus ΔU = Q − W = −150 − (−400) = 250 J."
        },
        {
            topic: "energy",
            question: "An ideal gas undergoes an isothermal expansion. Which statement is correct?",
            options: [
                "Its internal energy increases.",
                "Its internal energy decreases.",
                "Its internal energy remains constant.",
                "Its pressure remains constant."
            ],
            answer: 2,
            explanation: "For an ideal gas, internal energy depends only on temperature. During an isothermal process, temperature is constant, so ΔU = 0."
        },
        {
            topic: "energy",
            question: "A gas expands at constant pressure of 200 kPa from 0.02 m³ to 0.05 m³. How much boundary work does it perform?",
            options: ["3 kJ", "6 kJ", "10 kJ", "14 kJ"],
            answer: 1,
            explanation: "W = PΔV = 200,000 × (0.05 − 0.02) = 6,000 J = 6 kJ."
        },
        {
            topic: "energy",
            question: "A system completes a cycle while receiving 2,000 J of heat and rejecting 1,200 J. What is its net work output?",
            options: ["400 J", "800 J", "1,200 J", "3,200 J"],
            answer: 1,
            explanation: "For a complete cycle, ΔU = 0. Therefore, net heat transfer equals net work: Wnet = 2,000 − 1,200 = 800 J."
        },
        {
            topic: "energy",
            question: "Which thermodynamic process has zero boundary work for a closed system with a fixed volume?",
            options: ["Isobaric", "Isothermal", "Isochoric", "Adiabatic"],
            answer: 2,
            explanation: "Boundary work is W = ∫P dV. For constant volume, dV = 0, so boundary work is zero."
        },
        {
            topic: "energy",
            question: "A gas receives 1,500 J of heat during an adiabatic process. Which statement is correct?",
            options: [
                "The process is possible because heat transfer is zero.",
                "The process cannot be adiabatic if heat is transferred.",
                "The gas must have constant pressure.",
                "The gas must have zero internal energy."
            ],
            answer: 1,
            explanation: "An adiabatic process has no heat transfer across the system boundary. Therefore, Q = 0."
        },
        {
            topic: "energy",
            question: "A closed system has an internal energy decrease of 250 J while receiving 100 J of heat. What is the work done by the system?",
            options: ["150 J", "250 J", "350 J", "−350 J"],
            answer: 2,
            explanation: "ΔU = Q − W. Thus −250 = 100 − W, giving W = 350 J."
        },
        {
            topic: "energy",
            question: "Why is the work transfer in a thermodynamic process considered path-dependent?",
            options: [
                "It depends only on initial temperature.",
                "It depends on the process path between states.",
                "It is always equal to internal energy.",
                "It is independent of pressure and volume."
            ],
            answer: 1,
            explanation: "Work is a path function. Different process paths between the same initial and final states can produce different amounts of work."
        },

        // TOPIC 5: ENTROPY AND ENERGY EFFICIENCY (10)

        {
            topic: "entropy",
            question: "A reversible heat transfer of 600 J occurs at a constant temperature of 300 K. What is the entropy change of the receiving system?",
            options: ["0.5 J/K", "1 J/K", "2 J/K", "3 J/K"],
            answer: 2,
            explanation: "For reversible heat transfer, ΔS = Qrev/T = 600/300 = 2 J/K."
        },
        {
            topic: "entropy",
            question: "Which statement expresses the Second Law of Thermodynamics for an isolated system?",
            options: [
                "Its entropy must always decrease.",
                "Its entropy cannot decrease.",
                "Its internal energy must increase.",
                "Its temperature must remain constant."
            ],
            answer: 1,
            explanation: "The entropy of an isolated system remains constant for an ideal reversible process and increases for an irreversible process."
        },
        {
            topic: "entropy",
            question: "A heat engine operates between a hot reservoir at 600 K and a cold reservoir at 300 K. What is its maximum possible thermal efficiency?",
            options: ["25%", "40%", "50%", "75%"],
            answer: 2,
            explanation: "Carnot efficiency = 1 − Tc/Th = 1 − 300/600 = 0.50 or 50%."
        },
        {
            topic: "entropy",
            question: "An engine absorbs 2,000 J of heat and produces 500 J of useful work. What is its thermal efficiency?",
            options: ["15%", "20%", "25%", "40%"],
            answer: 2,
            explanation: "Efficiency = Wout/Qin × 100 = 500/2,000 × 100 = 25%."
        },
        {
            topic: "entropy",
            question: "Why can no cyclic heat engine operating between two reservoirs be more efficient than a Carnot engine?",
            options: [
                "Because energy is destroyed in every engine.",
                "Because the Carnot cycle establishes the maximum efficiency allowed by the Second Law.",
                "Because all engines must operate at constant pressure.",
                "Because the cold reservoir supplies all the work."
            ],
            answer: 1,
            explanation: "The Carnot theorem establishes the maximum possible efficiency for an engine operating between two fixed-temperature reservoirs."
        },
        {
            topic: "entropy",
            question: "A refrigerator removes 900 J of heat from its cold space while consuming 300 J of work. What is its coefficient of performance?",
            options: ["1", "2", "3", "4"],
            answer: 2,
            explanation: "COPR = QL/Win = 900/300 = 3."
        },
        {
            topic: "entropy",
            question: "For a reversible adiabatic process, what happens to the entropy of the system?",
            options: [
                "It increases.",
                "It decreases.",
                "It remains constant.",
                "It becomes zero in every case."
            ],
            answer: 2,
            explanation: "A reversible adiabatic process is isentropic, meaning the entropy remains constant."
        },
        {
            topic: "entropy",
            question: "A heat engine receives 5,000 J from a hot reservoir and rejects 3,500 J to a cold reservoir. What is the work output?",
            options: ["500 J", "1,000 J", "1,500 J", "2,500 J"],
            answer: 2,
            explanation: "Energy balance gives Wout = Qin − Qout = 5,000 − 3,500 = 1,500 J."
        },
        {
            topic: "entropy",
            question: "Which situation illustrates an increase in entropy due to an irreversible process?",
            options: [
                "An ideal reversible cycle",
                "Heat naturally flowing from a hot object to a colder object",
                "A perfectly reversible adiabatic expansion",
                "A system returning through an exact reversible path"
            ],
            answer: 1,
            explanation: "Natural heat transfer from hot to cold occurs spontaneously and generates entropy in the combined system and surroundings."
        },
        {
            topic: "entropy",
            question: "A Carnot refrigerator operates between 270 K and 300 K. What is its theoretical coefficient of performance?",
            options: ["3", "6", "9", "10"],
            answer: 2,
            explanation: "COPR = Tc/(Th − Tc) = 270/(300 − 270) = 270/30 = 9."
        },

        // TOPIC 6: APPLICATIONS OF THERMODYNAMICS (7)

        {
            topic: "applications",
            question: "In a steam power plant, which component primarily converts the thermal energy of high-pressure steam into mechanical shaft work?",
            options: ["Condenser", "Steam turbine", "Cooling tower", "Feedwater pump"],
            answer: 1,
            explanation: "The steam turbine expands high-pressure steam and converts part of its energy into mechanical rotational work."
        },
        {
            topic: "applications",
            question: "Which thermodynamic cycle is the idealized model commonly associated with spark-ignition gasoline engines?",
            options: ["Diesel cycle", "Otto cycle", "Rankine cycle", "Brayton cycle"],
            answer: 1,
            explanation: "The Otto cycle is the idealized thermodynamic model for spark-ignition internal combustion engines."
        },
        {
            topic: "applications",
            question: "A refrigerator removes 1,200 J of heat from its interior and releases 1,600 J to the room. How much work is supplied?",
            options: ["200 J", "400 J", "800 J", "2,800 J"],
            answer: 1,
            explanation: "Energy balance gives QH = QL + W. Therefore, W = 1,600 − 1,200 = 400 J."
        },
        {
            topic: "applications",
            question: "Which cycle is most commonly used to model ideal gas-turbine power plants?",
            options: ["Otto cycle", "Rankine cycle", "Brayton cycle", "Carnot vapor cycle"],
            answer: 2,
            explanation: "The Brayton cycle models gas-turbine systems, including many aircraft engines and gas-turbine power plants."
        },
        {
            topic: "applications",
            question: "Why does increasing the temperature of the heat source generally improve the maximum efficiency of a heat engine, if the cold-reservoir temperature remains fixed?",
            options: [
                "It reduces the Carnot efficiency.",
                "It increases the Carnot efficiency.",
                "It eliminates heat rejection.",
                "It makes all processes reversible."
            ],
            answer: 1,
            explanation: "Carnot efficiency is 1 − Tc/Th. Increasing Th while holding Tc constant increases the theoretical maximum efficiency."
        },
        {
            topic: "applications",
            question: "A heat pump delivers 12 kW of heating while consuming 3 kW of electrical power. What is its heating coefficient of performance?",
            options: ["2", "3", "4", "5"],
            answer: 2,
            explanation: "COPHP = QH/Win = 12/3 = 4."
        },
        {
            topic: "applications",
            question: "What is the primary thermodynamic purpose of a condenser in a conventional steam power plant?",
            options: [
                "To increase the steam temperature",
                "To reject heat and condense exhaust steam into liquid",
                "To increase turbine shaft speed",
                "To supply combustion air"
            ],
            answer: 1,
            explanation: "The condenser rejects heat from the exhaust steam, converting it into liquid water for return to the cycle."
        }
    ];

    const topicNames = {
        introduction: "Introduction to Thermodynamics",
        temperature: "Temperature and Heat",
        transfer: "Heat Transfer",
        energy: "Internal Energy and Work",
        entropy: "Entropy and Energy Efficiency",
        applications: "Applications of Thermodynamics"
    };

    let questions = [];
    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    const intro = document.getElementById("assessmentIntro");
    const quiz = document.getElementById("assessmentQuiz");
    const results = document.getElementById("assessmentResults");

    const topicSelect = document.getElementById("assessmentTopic");
    const startButton = document.getElementById("startAssessment");
    const nextButton = document.getElementById("nextAssessmentQuestion");
    const retakeButton = document.getElementById("retakeAssessment");

    const questionNumber = document.getElementById("assessmentQuestionNumber");
    const scoreDisplay = document.getElementById("assessmentScore");
    const progressBar = document.getElementById("assessmentProgressBar");

    const categoryDisplay = document.getElementById("assessmentCategory");
    const questionDisplay = document.getElementById("assessmentQuestion");
    const answersContainer = document.getElementById("assessmentAnswers");

    const feedback = document.getElementById("assessmentFeedback");
    const feedbackTitle = document.getElementById("assessmentFeedbackTitle");
    const feedbackText = document.getElementById("assessmentFeedbackText");

    const finalScore = document.getElementById("finalAssessmentScore");
    const resultMessage = document.getElementById("assessmentResultMessage");
    const resultDescription = document.getElementById("assessmentResultDescription");
    const correctDisplay = document.getElementById("correctAnswers");
    const wrongDisplay = document.getElementById("wrongAnswers");
    const percentageDisplay = document.getElementById("assessmentPercentage");

    if (
        !intro || !quiz || !results || !topicSelect ||
        !startButton || !nextButton || !retakeButton
    ) {
        console.warn("THERMOQUEST Assessment Center: Required HTML elements were not found.");
        return;
    }

    function startAssessment() {
        const selectedTopic = topicSelect.value;

        questions = selectedTopic === "all"
            ? [...assessmentQuestions]
            : assessmentQuestions.filter(
                question => question.topic === selectedTopic
            );

        if (questions.length === 0) {
            alert("No questions are available for this topic.");
            return;
        }

        currentQuestion = 0;
        score = 0;
        answered = false;

        intro.classList.add("hidden");
        results.classList.add("hidden");
        quiz.classList.remove("hidden");

        loadAssessmentQuestion();
    }

    function loadAssessmentQuestion() {
        answered = false;

        const question = questions[currentQuestion];

        questionNumber.textContent =
            `Question ${currentQuestion + 1} of ${questions.length}`;

        scoreDisplay.textContent = `Score: ${score}`;

        progressBar.style.width =
            `${((currentQuestion + 1) / questions.length) * 100}%`;

        categoryDisplay.textContent = topicNames[question.topic].toUpperCase();
        questionDisplay.textContent = question.question;

        answersContainer.innerHTML = "";

        feedback.classList.add("hidden");
        nextButton.classList.add("hidden");

        question.options.forEach((option, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "assessment-answer";
            button.textContent =
                `${String.fromCharCode(65 + index)}. ${option}`;

            button.addEventListener("click", () => {
                checkAssessmentAnswer(index);
            });

            answersContainer.appendChild(button);
        });
    }

    function checkAssessmentAnswer(selectedIndex) {
        if (answered) return;

        answered = true;

        const question = questions[currentQuestion];
        const answerButtons =
            answersContainer.querySelectorAll(".assessment-answer");

        const isCorrect = selectedIndex === question.answer;

        if (isCorrect) {
            score++;
            feedbackTitle.textContent = "Correct Answer";
        } else {
            feedbackTitle.textContent = "Incorrect Answer";
        }

        answerButtons.forEach((button, index) => {
            button.disabled = true;

            if (index === question.answer) {
                button.classList.add("correct");
            } else if (index === selectedIndex) {
                button.classList.add("incorrect");
            }
        });

        feedbackText.textContent = question.explanation;
        feedback.classList.remove("hidden");

        scoreDisplay.textContent = `Score: ${score}`;

        nextButton.textContent =
            currentQuestion === questions.length - 1
                ? "View Final Results"
                : "Next Question";

        nextButton.classList.remove("hidden");
    }

    function showAssessmentResults() {
        quiz.classList.add("hidden");
        results.classList.remove("hidden");

        const total = questions.length;
        const incorrect = total - score;
        const percentage = Math.round((score / total) * 100);

localStorage.setItem(
    "thermoquestLatestAssessment",
    JSON.stringify({
        score: score,
        total: total,
        percentage: percentage,
        date: new Date().toISOString()
    })
);


        finalScore.textContent = `${score}/${total}`;
        correctDisplay.textContent = score;
        wrongDisplay.textContent = incorrect;
        percentageDisplay.textContent = `${percentage}%`;

        if (percentage >= 90) {
            resultMessage.textContent = "Outstanding Performance";
            resultDescription.textContent =
                "You demonstrated excellent mastery of advanced thermodynamics concepts and problem-solving.";
        } else if (percentage >= 80) {
            resultMessage.textContent = "Very Good Performance";
            resultDescription.textContent =
                "You have a strong understanding of thermodynamics. Review the concepts behind the questions you missed.";
        } else if (percentage >= 70) {
            resultMessage.textContent = "Good Performance";
            resultDescription.textContent =
                "You understand many important principles, but additional practice will strengthen your mastery.";
        } else if (percentage >= 60) {
            resultMessage.textContent = "Developing Understanding";
            resultDescription.textContent =
                "Review the lessons and work through more numerical and conceptual exercises.";
        } else {
            resultMessage.textContent = "Needs Further Review";
            resultDescription.textContent =
                "Revisit the THERMOQUEST lessons and practice the fundamental principles before trying again.";
        }
    }

    function retakeAssessment() {
        results.classList.add("hidden");
        intro.classList.remove("hidden");

        currentQuestion = 0;
        score = 0;
        answered = false;
    }

    startButton.addEventListener("click", startAssessment);

    nextButton.addEventListener("click", () => {
        if (!answered) return;

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadAssessmentQuestion();
        } else {
            showAssessmentResults();
        }
    });

    retakeButton.addEventListener("click", retakeAssessment);

    console.log(
        `THERMOQUEST Assessment Center loaded: ${assessmentQuestions.length} questions.`
    );

})();

/* =========================================
   THERMOQUEST FORMULA & CALCULATOR LAB
========================================= */

(function () {

    const formulaSelect = document.getElementById("formulaSelect");
    const formulaTitle = document.getElementById("formulaTitle");
    const formulaEquation = document.getElementById("formulaEquation");
    const formulaDescription = document.getElementById("formulaDescription");
    const calculatorInputs = document.getElementById("calculatorInputs");
    const calculateButton = document.getElementById("calculateFormula");
    const resultValue = document.getElementById("resultValue");
    const resultExplanation = document.getElementById("resultExplanation");

    if (
        !formulaSelect ||
        !formulaTitle ||
        !formulaEquation ||
        !formulaDescription ||
        !calculatorInputs ||
        !calculateButton ||
        !resultValue ||
        !resultExplanation
    ) {
        console.warn("THERMOQUEST Formula Lab: Required HTML elements were not found.");
        return;
    }

    const formulas = {

        heat: {
            title: "Heat Energy",
            equation: "Q = mcΔT",
            description: "Calculate the heat absorbed or released by a substance.",
            fields: [
                { id: "mass", label: "Mass (kg)" },
                { id: "specificHeat", label: "Specific Heat Capacity (J/kg·°C)" },
                { id: "temperatureChange", label: "Temperature Change (°C)" }
            ],
            calculate: v => v.mass * v.specificHeat * v.temperatureChange,
            explanation: "Heat energy is calculated by multiplying mass, specific heat capacity, and temperature change.",
            unit: "J"
        },

        "first-law": {
            title: "First Law of Thermodynamics",
            equation: "ΔU = Q − W",
            description: "Determine the change in internal energy of a thermodynamic system.",
            fields: [
                { id: "heatAdded", label: "Heat Added to System (J)" },
                { id: "workDone", label: "Work Done by System (J)" }
            ],
            calculate: v => v.heatAdded - v.workDone,
            explanation: "The change in internal energy equals the heat added to the system minus the work done by the system.",
            unit: "J"
        },

        efficiency: {
            title: "Thermal Efficiency",
            equation: "η = (Wout / Qin) × 100%",
            description: "Calculate the percentage of heat input converted into useful work.",
            fields: [
                { id: "workOutput", label: "Useful Work Output (J)" },
                { id: "heatInput", label: "Heat Input (J)" }
            ],
            calculate: v => (v.workOutput / v.heatInput) * 100,
            explanation: "Thermal efficiency is the useful work output divided by the heat input, multiplied by 100.",
            unit: "%"
        },

        entropy: {
            title: "Entropy Change",
            equation: "ΔS = Qrev / T",
            description: "Calculate entropy change for a reversible heat transfer at constant absolute temperature.",
            fields: [
                { id: "reversibleHeat", label: "Reversible Heat Transfer (J)" },
                { id: "absoluteTemperature", label: "Absolute Temperature (K)" }
            ],
            calculate: v => v.reversibleHeat / v.absoluteTemperature,
            explanation: "Entropy change is the reversible heat transferred divided by the absolute temperature.",
            unit: "J/K"
        },

        carnot: {
            title: "Carnot Efficiency",
            equation: "η = (1 − Tc / Th) × 100%",
            description: "Calculate the maximum theoretical efficiency of a heat engine operating between two temperatures.",
            fields: [
                { id: "coldTemperature", label: "Cold Reservoir Temperature (K)" },
                { id: "hotTemperature", label: "Hot Reservoir Temperature (K)" }
            ],
            calculate: v => (1 - v.coldTemperature / v.hotTemperature) * 100,
            explanation: "Carnot efficiency depends on the absolute temperatures of the cold and hot reservoirs.",
            unit: "%"
        },

        cop: {
            title: "Coefficient of Performance",
            equation: "COP = Qc / W",
            description: "Calculate the coefficient of performance of a refrigerator.",
            fields: [
                { id: "coolingEffect", label: "Cooling Effect (J)" },
                { id: "workInput", label: "Work Input (J)" }
            ],
            calculate: v => v.coolingEffect / v.workInput,
            explanation: "COP is the heat removed from the cold space divided by the work input.",
            unit: ""
        }

    };

    function displayFormula() {

        const selected = formulas[formulaSelect.value];

        if (!selected) return;

        formulaTitle.textContent = selected.title;
        formulaEquation.textContent = selected.equation;
        formulaDescription.textContent = selected.description;

        calculatorInputs.innerHTML = "";

        selected.fields.forEach(field => {

            const fieldContainer = document.createElement("div");
            fieldContainer.className = "calculator-field";

            const label = document.createElement("label");
            label.htmlFor = field.id;
            label.textContent = field.label;

            const input = document.createElement("input");
            input.type = "number";
            input.id = field.id;
            input.step = "any";
            input.placeholder = "Enter value";

            fieldContainer.appendChild(label);
            fieldContainer.appendChild(input);

            calculatorInputs.appendChild(fieldContainer);

        });

        resultValue.textContent = "—";
        resultExplanation.textContent = "Enter the required values to begin.";

    }

    function calculateResult() {

        const selected = formulas[formulaSelect.value];

        if (!selected) return;

        const values = {};

        for (const field of selected.fields) {

            const input = document.getElementById(field.id);

            if (
                !input ||
                input.value.trim() === "" ||
                !Number.isFinite(Number(input.value))
            ) {
                resultValue.textContent = "Invalid Input";
                resultExplanation.textContent =
                    "Please enter a valid number in every field.";
                return;
            }

            values[field.id] = Number(input.value);

        }

        // Validate denominators and physical conditions.

        if (formulaSelect.value === "efficiency" && values.heatInput <= 0) {
            showError("Heat input must be greater than zero.");
            return;
        }

        if (formulaSelect.value === "entropy" && values.absoluteTemperature <= 0) {
            showError("Absolute temperature must be greater than zero Kelvin.");
            return;
        }

        if (formulaSelect.value === "carnot") {

            if (values.hotTemperature <= 0 || values.coldTemperature < 0) {
                showError("Temperatures must be valid absolute temperatures in Kelvin.");
                return;
            }

            if (values.hotTemperature <= values.coldTemperature) {
                showError("Hot reservoir temperature must be greater than cold reservoir temperature.");
                return;
            }

        }

        if (formulaSelect.value === "cop" && values.workInput <= 0) {
            showError("Work input must be greater than zero.");
            return;
        }

        if (
            formulaSelect.value === "efficiency" &&
            (values.workOutput < 0 || values.workOutput > values.heatInput)
        ) {
            showError("For this simple heat-engine model, work output must be between zero and heat input.");
            return;
        }

        const answer = selected.calculate(values);

        if (!Number.isFinite(answer)) {
            showError("The calculation could not produce a valid result.");
            return;
        }

        resultValue.textContent =
            Number(answer.toFixed(4)).toLocaleString() +
            (selected.unit ? " " + selected.unit : "");

        resultExplanation.textContent = selected.explanation;

    }

    function showError(message) {
        resultValue.textContent = "Check Your Values";
        resultExplanation.textContent = message;
    }

    formulaSelect.addEventListener("change", displayFormula);
    calculateButton.addEventListener("click", calculateResult);

    // Load the default formula when the page opens.
    displayFormula();

    console.log("THERMOQUEST Formula Lab: Successfully initialized.");

})();

/* =========================================
   THERMOQUEST PROBLEM-SOLVING CHALLENGE
========================================= */

(function () {

    const intro = document.getElementById("challengeIntro");
    const questionArea = document.getElementById("challengeQuestion");
    const completeArea = document.getElementById("challengeComplete");

    const startButton = document.getElementById("startChallenge");
    const submitButton = document.getElementById("submitProblem");
    const nextButton = document.getElementById("nextProblem");
    const restartButton = document.getElementById("restartChallenge");

    const topicDisplay = document.getElementById("challengeTopic");
    const numberDisplay = document.getElementById("challengeNumber");
    const titleDisplay = document.getElementById("problemTitle");
    const descriptionDisplay = document.getElementById("problemDescription");
    const formulaDisplay = document.getElementById("problemFormula");
    const unitDisplay = document.getElementById("problemUnit");
    const answerInput = document.getElementById("problemAnswer");

    const feedbackArea = document.getElementById("problemFeedback");
    const feedbackTitle = document.getElementById("feedbackTitle");
    const feedbackMessage = document.getElementById("feedbackMessage");

    const hintArea = document.getElementById("problemHint");
    const hintText = document.getElementById("hintText");

    const solutionArea = document.getElementById("problemSolution");
    const solutionText = document.getElementById("solutionText");
    const solutionAnswer = document.getElementById("solutionAnswer");

    const hintButton = document.getElementById("showHint");
    const solutionButton = document.getElementById("showSolution");

    const correctDisplay = document.getElementById("challengeCorrect");
    const attemptsDisplay = document.getElementById("challengeAttempts");
    const accuracyDisplay = document.getElementById("challengeAccuracy");

    const finalScore = document.getElementById("finalChallengeScore");
    const finalMessage = document.getElementById("finalChallengeMessage");

    const requiredElements = [
        intro, questionArea, completeArea,
        startButton, submitButton, nextButton, restartButton,
        topicDisplay, numberDisplay, titleDisplay,
        descriptionDisplay, formulaDisplay, unitDisplay,
        answerInput, feedbackArea, feedbackTitle,
        feedbackMessage, hintArea, hintText,
        solutionArea, solutionText, solutionAnswer,
        hintButton, solutionButton, correctDisplay,
        attemptsDisplay, accuracyDisplay, finalScore, finalMessage
    ];

    if (requiredElements.some(element => !element)) {
        console.warn(
            "THERMOQUEST Challenge: Required HTML elements were not found."
        );
        return;
    }

    const TOTAL_PROBLEMS = 10;

    let problems = [];
    let currentProblem = 0;
    let correctAnswers = 0;
    let attempts = 0;
    let answered = false;

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function round(value, decimals = 2) {
        const factor = Math.pow(10, decimals);
        return Math.round((value + Number.EPSILON) * factor) / factor;
    }

    function formatNumber(value) {
        return Number(value.toFixed(2)).toLocaleString();
    }

    function generateHeatProblem() {

        const mass = randomInteger(1, 5);
        const specificHeat = Math.random() < 0.5 ? 900 : 4200;
        const temperatureChange = randomInteger(5, 25);

        const answer = mass * specificHeat * temperatureChange;

        return {
            topic: "HEAT ENERGY",
            title: "Calculating Heat Energy",
            description:
                `A substance with a mass of ${mass} kg has a specific heat capacity of ${specificHeat} J/kg·°C. Its temperature increases by ${temperatureChange}°C. Calculate the heat energy absorbed.`,
            formula: "Q = mcΔT",
            unit: "J",
            answer: answer,
            hint: "Multiply the mass by the specific heat capacity, then multiply by the temperature change.",
            solution:
                `Given: m = ${mass} kg, c = ${specificHeat} J/kg·°C, ΔT = ${temperatureChange}°C.\n\n` +
                `Substitute into the equation:\n` +
                `Q = mcΔT\n` +
                `Q = ${mass} × ${specificHeat} × ${temperatureChange}\n` +
                `Q = ${answer} J`,
            displayAnswer: `${formatNumber(answer)} J`
        };
    }

    function generateFirstLawProblem() {

        const heat = randomInteger(600, 2500);
        const work = randomInteger(100, Math.min(500, heat - 1));

        const answer = heat - work;

        return {
            topic: "FIRST LAW OF THERMODYNAMICS",
            title: "Change in Internal Energy",
            description:
                `A thermodynamic system receives ${heat} J of heat and performs ${work} J of work on its surroundings. Determine the change in internal energy.`,
            formula: "ΔU = Q − W",
            unit: "J",
            answer: answer,
            hint: "Subtract the work done by the system from the heat added to the system.",
            solution:
                `Given: Q = ${heat} J and W = ${work} J.\n\n` +
                `Using the First Law:\n` +
                `ΔU = Q − W\n` +
                `ΔU = ${heat} − ${work}\n` +
                `ΔU = ${answer} J`,
            displayAnswer: `${formatNumber(answer)} J`
        };
    }

    function generateEfficiencyProblem() {

        const heatInput = randomInteger(1000, 5000);
        const workOutput = randomInteger(100, heatInput - 1);

        const answer = round((workOutput / heatInput) * 100);

        return {
            topic: "THERMAL EFFICIENCY",
            title: "Calculating Thermal Efficiency",
            description:
                `A heat engine receives ${heatInput} J of heat energy and produces ${workOutput} J of useful work. Calculate its thermal efficiency.`,
            formula: "η = (Wout / Qin) × 100%",
            unit: "%",
            answer: answer,
            hint: "Divide useful work output by heat input, then multiply by 100.",
            solution:
                `Given: Wout = ${workOutput} J and Qin = ${heatInput} J.\n\n` +
                `η = (Wout / Qin) × 100%\n` +
                `η = (${workOutput} / ${heatInput}) × 100%\n` +
                `η = ${answer}%`,
            displayAnswer: `${formatNumber(answer)}%`
        };
    }

    function generateEntropyProblem() {

        const heat = randomInteger(500, 3000);
        const temperature = randomInteger(250, 500);

        const answer = round(heat / temperature);

        return {
            topic: "ENTROPY",
            title: "Calculating Entropy Change",
            description:
                `A system undergoes a reversible heat transfer of ${heat} J at a constant absolute temperature of ${temperature} K. Calculate its entropy change.`,
            formula: "ΔS = Qrev / T",
            unit: "J/K",
            answer: answer,
            hint: "Divide the reversible heat transfer by the absolute temperature in Kelvin.",
            solution:
                `Given: Qrev = ${heat} J and T = ${temperature} K.\n\n` +
                `ΔS = Qrev / T\n` +
                `ΔS = ${heat} / ${temperature}\n` +
                `ΔS = ${answer} J/K`,
            displayAnswer: `${formatNumber(answer)} J/K`
        };
    }

    function generateCarnotProblem() {

        const cold = randomInteger(200, 350);
        const hot = randomInteger(cold + 50, 700);

        const answer = round((1 - cold / hot) * 100);

        return {
            topic: "CARNOT EFFICIENCY",
            title: "Maximum Theoretical Efficiency",
            description:
                `A Carnot engine operates between a hot reservoir at ${hot} K and a cold reservoir at ${cold} K. Calculate its maximum theoretical efficiency.`,
            formula: "η = (1 − Tc / Th) × 100%",
            unit: "%",
            answer: answer,
            hint: "Divide the cold reservoir temperature by the hot reservoir temperature. Subtract the result from 1 and multiply by 100.",
            solution:
                `Given: Tc = ${cold} K and Th = ${hot} K.\n\n` +
                `η = (1 − Tc / Th) × 100%\n` +
                `η = (1 − ${cold} / ${hot}) × 100%\n` +
                `η = ${answer}%`,
            displayAnswer: `${formatNumber(answer)}%`
        };
    }

    function generateCOPProblem() {

        const work = randomInteger(100, 800);
        const cooling = randomInteger(500, 3000);

        const answer = round(cooling / work);

        return {
            topic: "COEFFICIENT OF PERFORMANCE",
            title: "Refrigerator Performance",
            description:
                `A refrigerator removes ${cooling} J of heat from its cold space while consuming ${work} J of work. Calculate its coefficient of performance.`,
            formula: "COP = Qc / W",
            unit: "",
            answer: answer,
            hint: "Divide the heat removed from the cold space by the work input.",
            solution:
                `Given: Qc = ${cooling} J and W = ${work} J.\n\n` +
                `COP = Qc / W\n` +
                `COP = ${cooling} / ${work}\n` +
                `COP = ${answer}`,
            displayAnswer: `${formatNumber(answer)}`
        };
    }

    const generators = [
        generateHeatProblem,
        generateFirstLawProblem,
        generateEfficiencyProblem,
        generateEntropyProblem,
        generateCarnotProblem,
        generateCOPProblem
    ];

    function generateProblems() {

        problems = [];

        for (let i = 0; i < TOTAL_PROBLEMS; i++) {

            const generator =
                generators[randomInteger(0, generators.length - 1)];

            problems.push(generator());

        }

    }

    function updateScoreboard() {

        correctDisplay.textContent = correctAnswers;
        attemptsDisplay.textContent = attempts;

        const accuracy = attempts === 0
            ? 0
            : Math.round((correctAnswers / attempts) * 100);

        accuracyDisplay.textContent = `${accuracy}%`;

    }

    function startChallenge() {

        generateProblems();

        currentProblem = 0;
        correctAnswers = 0;
        attempts = 0;

        updateScoreboard();

        intro.classList.add("hidden");
        completeArea.classList.add("hidden");
        questionArea.classList.remove("hidden");

        loadProblem();

    }

    function loadProblem() {

        const problem = problems[currentProblem];

        answered = false;

        topicDisplay.textContent = problem.topic;
        numberDisplay.textContent =
            `Problem ${currentProblem + 1} of ${TOTAL_PROBLEMS}`;

        titleDisplay.textContent = problem.title;
        descriptionDisplay.textContent = problem.description;
        formulaDisplay.textContent = problem.formula;
        unitDisplay.textContent = problem.unit || "No unit";

        answerInput.value = "";
        answerInput.disabled = false;

        submitButton.disabled = false;
        submitButton.classList.remove("hidden");

        nextButton.classList.add("hidden");

        feedbackArea.classList.add("hidden");
        hintArea.classList.add("hidden");
        solutionArea.classList.add("hidden");

        hintText.textContent = problem.hint;
        solutionText.textContent = problem.solution;
        solutionAnswer.textContent =
            `Correct Answer: ${problem.displayAnswer}`;

    }

    function submitAnswer() {

        if (answered) return;

        const enteredValue = answerInput.value.trim();

        if (enteredValue === "" || !Number.isFinite(Number(enteredValue))) {

            feedbackArea.classList.remove("hidden");
            feedbackTitle.textContent = "Invalid Answer";
            feedbackMessage.textContent =
                "Please enter a valid numerical answer before submitting.";

            return;
        }

        const userAnswer = Number(enteredValue);
        const problem = problems[currentProblem];

        const tolerance = Math.max(
            0.02,
            Math.abs(problem.answer) * 0.005
        );

        const isCorrect =
            Math.abs(userAnswer - problem.answer) <= tolerance;

        answered = true;
        attempts++;

        if (isCorrect) {

            correctAnswers++;

            feedbackTitle.textContent = "Correct Answer!";
            feedbackMessage.textContent =
                "Excellent work! Your numerical answer is correct.";

        } else {

            feedbackTitle.textContent = "Not Quite Correct";
            feedbackMessage.textContent =
                "Review the formula and solution to understand the correct calculation.";

        }

        feedbackArea.classList.remove("hidden");
        solutionArea.classList.remove("hidden");

        answerInput.disabled = true;
        submitButton.disabled = true;

        nextButton.classList.remove("hidden");

        if (currentProblem === TOTAL_PROBLEMS - 1) {
            nextButton.textContent = "View Final Results";
        } else {
            nextButton.textContent = "Next Problem";
        }

        updateScoreboard();

    }

    function showNextProblem() {

        if (!answered) return;

        currentProblem++;

        if (currentProblem >= TOTAL_PROBLEMS) {
            finishChallenge();
            return;
        }

        loadProblem();

    }

    function finishChallenge() {

        questionArea.classList.add("hidden");
        completeArea.classList.remove("hidden");

        finalScore.textContent =
            `${correctAnswers} / ${TOTAL_PROBLEMS}`;

        const accuracy =
            Math.round((correctAnswers / TOTAL_PROBLEMS) * 100);
            
localStorage.setItem(
    "thermoquestChallengeResults",
    JSON.stringify({
        correct: correctAnswers,
        attempts: attempts,
        total: TOTAL_PROBLEMS,
        accuracy: accuracy,
        date: new Date().toISOString()
    })
);


        if (accuracy === 100) {

            finalMessage.textContent =
                "Outstanding! You answered every problem correctly.";

        } else if (accuracy >= 80) {

            finalMessage.textContent =
                "Excellent performance! You demonstrate strong thermodynamics problem-solving skills.";

        } else if (accuracy >= 60) {

            finalMessage.textContent =
                "Good effort! Continue practicing to strengthen your understanding.";

        } else {

            finalMessage.textContent =
                "Keep learning and practicing. Review the solutions and try another challenge.";

        }

    }

    function showHint() {

        hintArea.classList.toggle("hidden");

    }

    function showSolution() {

        solutionArea.classList.toggle("hidden");

    }

    startButton.addEventListener("click", startChallenge);
    restartButton.addEventListener("click", startChallenge);
    submitButton.addEventListener("click", submitAnswer);
    nextButton.addEventListener("click", showNextProblem);
    hintButton.addEventListener("click", showHint);
    solutionButton.addEventListener("click", showSolution);

    answerInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter" && !answered) {
            submitAnswer();
        }

    });

    console.log(
        "THERMOQUEST Problem-Solving Challenge: Successfully initialized."
    );

})();

/* =========================================
   THERMOQUEST PROBLEM-SOLVING CHALLENGE
========================================= */

(function () {

    const intro = document.getElementById("challengeIntro");
    const questionArea = document.getElementById("challengeQuestion");
    const completeArea = document.getElementById("challengeComplete");

    const startButton = document.getElementById("startChallenge");
    const submitButton = document.getElementById("submitProblem");
    const nextButton = document.getElementById("nextProblem");
    const restartButton = document.getElementById("restartChallenge");

    const topicDisplay = document.getElementById("challengeTopic");
    const numberDisplay = document.getElementById("challengeNumber");
    const titleDisplay = document.getElementById("problemTitle");
    const descriptionDisplay = document.getElementById("problemDescription");
    const formulaDisplay = document.getElementById("problemFormula");
    const unitDisplay = document.getElementById("problemUnit");
    const answerInput = document.getElementById("problemAnswer");

    const feedbackArea = document.getElementById("problemFeedback");
    const feedbackTitle = document.getElementById("feedbackTitle");
    const feedbackMessage = document.getElementById("feedbackMessage");

    const hintArea = document.getElementById("problemHint");
    const hintText = document.getElementById("hintText");

    const solutionArea = document.getElementById("problemSolution");
    const solutionText = document.getElementById("solutionText");
    const solutionAnswer = document.getElementById("solutionAnswer");

    const hintButton = document.getElementById("showHint");
    const solutionButton = document.getElementById("showSolution");

    const correctDisplay = document.getElementById("challengeCorrect");
    const attemptsDisplay = document.getElementById("challengeAttempts");
    const accuracyDisplay = document.getElementById("challengeAccuracy");

    const finalScore = document.getElementById("finalChallengeScore");
    const finalMessage = document.getElementById("finalChallengeMessage");

    const requiredElements = [
        intro, questionArea, completeArea,
        startButton, submitButton, nextButton, restartButton,
        topicDisplay, numberDisplay, titleDisplay,
        descriptionDisplay, formulaDisplay, unitDisplay,
        answerInput, feedbackArea, feedbackTitle,
        feedbackMessage, hintArea, hintText,
        solutionArea, solutionText, solutionAnswer,
        hintButton, solutionButton, correctDisplay,
        attemptsDisplay, accuracyDisplay, finalScore, finalMessage
    ];

    if (requiredElements.some(element => !element)) {
        console.warn(
            "THERMOQUEST Challenge: Required HTML elements were not found."
        );
        return;
    }

    const TOTAL_PROBLEMS = 10;

    let problems = [];
    let currentProblem = 0;
    let correctAnswers = 0;
    let attempts = 0;
    let answered = false;

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function round(value, decimals = 2) {
        const factor = Math.pow(10, decimals);
        return Math.round((value + Number.EPSILON) * factor) / factor;
    }

    function formatNumber(value) {
        return Number(value.toFixed(2)).toLocaleString();
    }

    function generateHeatProblem() {

        const mass = randomInteger(1, 5);
        const specificHeat = Math.random() < 0.5 ? 900 : 4200;
        const temperatureChange = randomInteger(5, 25);

        const answer = mass * specificHeat * temperatureChange;

        return {
            topic: "HEAT ENERGY",
            title: "Calculating Heat Energy",
            description:
                `A substance with a mass of ${mass} kg has a specific heat capacity of ${specificHeat} J/kg·°C. Its temperature increases by ${temperatureChange}°C. Calculate the heat energy absorbed.`,
            formula: "Q = mcΔT",
            unit: "J",
            answer: answer,
            hint: "Multiply the mass by the specific heat capacity, then multiply by the temperature change.",
            solution:
                `Given: m = ${mass} kg, c = ${specificHeat} J/kg·°C, ΔT = ${temperatureChange}°C.\n\n` +
                `Substitute into the equation:\n` +
                `Q = mcΔT\n` +
                `Q = ${mass} × ${specificHeat} × ${temperatureChange}\n` +
                `Q = ${answer} J`,
            displayAnswer: `${formatNumber(answer)} J`
        };
    }

    function generateFirstLawProblem() {

        const heat = randomInteger(600, 2500);
        const work = randomInteger(100, Math.min(500, heat - 1));

        const answer = heat - work;

        return {
            topic: "FIRST LAW OF THERMODYNAMICS",
            title: "Change in Internal Energy",
            description:
                `A thermodynamic system receives ${heat} J of heat and performs ${work} J of work on its surroundings. Determine the change in internal energy.`,
            formula: "ΔU = Q − W",
            unit: "J",
            answer: answer,
            hint: "Subtract the work done by the system from the heat added to the system.",
            solution:
                `Given: Q = ${heat} J and W = ${work} J.\n\n` +
                `Using the First Law:\n` +
                `ΔU = Q − W\n` +
                `ΔU = ${heat} − ${work}\n` +
                `ΔU = ${answer} J`,
            displayAnswer: `${formatNumber(answer)} J`
        };
    }

    function generateEfficiencyProblem() {

        const heatInput = randomInteger(1000, 5000);
        const workOutput = randomInteger(100, heatInput - 1);

        const answer = round((workOutput / heatInput) * 100);

        return {
            topic: "THERMAL EFFICIENCY",
            title: "Calculating Thermal Efficiency",
            description:
                `A heat engine receives ${heatInput} J of heat energy and produces ${workOutput} J of useful work. Calculate its thermal efficiency.`,
            formula: "η = (Wout / Qin) × 100%",
            unit: "%",
            answer: answer,
            hint: "Divide useful work output by heat input, then multiply by 100.",
            solution:
                `Given: Wout = ${workOutput} J and Qin = ${heatInput} J.\n\n` +
                `η = (Wout / Qin) × 100%\n` +
                `η = (${workOutput} / ${heatInput}) × 100%\n` +
                `η = ${answer}%`,
            displayAnswer: `${formatNumber(answer)}%`
        };
    }

    function generateEntropyProblem() {

        const heat = randomInteger(500, 3000);
        const temperature = randomInteger(250, 500);

        const answer = round(heat / temperature);

        return {
            topic: "ENTROPY",
            title: "Calculating Entropy Change",
            description:
                `A system undergoes a reversible heat transfer of ${heat} J at a constant absolute temperature of ${temperature} K. Calculate its entropy change.`,
            formula: "ΔS = Qrev / T",
            unit: "J/K",
            answer: answer,
            hint: "Divide the reversible heat transfer by the absolute temperature in Kelvin.",
            solution:
                `Given: Qrev = ${heat} J and T = ${temperature} K.\n\n` +
                `ΔS = Qrev / T\n` +
                `ΔS = ${heat} / ${temperature}\n` +
                `ΔS = ${answer} J/K`,
            displayAnswer: `${formatNumber(answer)} J/K`
        };
    }

    function generateCarnotProblem() {

        const cold = randomInteger(200, 350);
        const hot = randomInteger(cold + 50, 700);

        const answer = round((1 - cold / hot) * 100);

        return {
            topic: "CARNOT EFFICIENCY",
            title: "Maximum Theoretical Efficiency",
            description:
                `A Carnot engine operates between a hot reservoir at ${hot} K and a cold reservoir at ${cold} K. Calculate its maximum theoretical efficiency.`,
            formula: "η = (1 − Tc / Th) × 100%",
            unit: "%",
            answer: answer,
            hint: "Divide the cold reservoir temperature by the hot reservoir temperature. Subtract the result from 1 and multiply by 100.",
            solution:
                `Given: Tc = ${cold} K and Th = ${hot} K.\n\n` +
                `η = (1 − Tc / Th) × 100%\n` +
                `η = (1 − ${cold} / ${hot}) × 100%\n` +
                `η = ${answer}%`,
            displayAnswer: `${formatNumber(answer)}%`
        };
    }

    function generateCOPProblem() {

        const work = randomInteger(100, 800);
        const cooling = randomInteger(500, 3000);

        const answer = round(cooling / work);

        return {
            topic: "COEFFICIENT OF PERFORMANCE",
            title: "Refrigerator Performance",
            description:
                `A refrigerator removes ${cooling} J of heat from its cold space while consuming ${work} J of work. Calculate its coefficient of performance.`,
            formula: "COP = Qc / W",
            unit: "",
            answer: answer,
            hint: "Divide the heat removed from the cold space by the work input.",
            solution:
                `Given: Qc = ${cooling} J and W = ${work} J.\n\n` +
                `COP = Qc / W\n` +
                `COP = ${cooling} / ${work}\n` +
                `COP = ${answer}`,
            displayAnswer: `${formatNumber(answer)}`
        };
    }

    const generators = [
        generateHeatProblem,
        generateFirstLawProblem,
        generateEfficiencyProblem,
        generateEntropyProblem,
        generateCarnotProblem,
        generateCOPProblem
    ];

    function generateProblems() {

        problems = [];

        for (let i = 0; i < TOTAL_PROBLEMS; i++) {

            const generator =
                generators[randomInteger(0, generators.length - 1)];

            problems.push(generator());

        }

    }

    function updateScoreboard() {

        correctDisplay.textContent = correctAnswers;
        attemptsDisplay.textContent = attempts;

        const accuracy = attempts === 0
            ? 0
            : Math.round((correctAnswers / attempts) * 100);

        accuracyDisplay.textContent = `${accuracy}%`;

    }

    function startChallenge() {

        generateProblems();

        currentProblem = 0;
        correctAnswers = 0;
        attempts = 0;

        updateScoreboard();

        intro.classList.add("hidden");
        completeArea.classList.add("hidden");
        questionArea.classList.remove("hidden");

        loadProblem();

    }

    function loadProblem() {

        const problem = problems[currentProblem];

        answered = false;

        topicDisplay.textContent = problem.topic;
        numberDisplay.textContent =
            `Problem ${currentProblem + 1} of ${TOTAL_PROBLEMS}`;

        titleDisplay.textContent = problem.title;
        descriptionDisplay.textContent = problem.description;
        formulaDisplay.textContent = problem.formula;
        unitDisplay.textContent = problem.unit || "No unit";

        answerInput.value = "";
        answerInput.disabled = false;

        submitButton.disabled = false;
        submitButton.classList.remove("hidden");

        nextButton.classList.add("hidden");

        feedbackArea.classList.add("hidden");
        hintArea.classList.add("hidden");
        solutionArea.classList.add("hidden");

        hintText.textContent = problem.hint;
        solutionText.textContent = problem.solution;
        solutionAnswer.textContent =
            `Correct Answer: ${problem.displayAnswer}`;

    }

    function submitAnswer() {

        if (answered) return;

        const enteredValue = answerInput.value.trim();

        if (enteredValue === "" || !Number.isFinite(Number(enteredValue))) {

            feedbackArea.classList.remove("hidden");
            feedbackTitle.textContent = "Invalid Answer";
            feedbackMessage.textContent =
                "Please enter a valid numerical answer before submitting.";

            return;
        }

        const userAnswer = Number(enteredValue);
        const problem = problems[currentProblem];

        const tolerance = Math.max(
            0.02,
            Math.abs(problem.answer) * 0.005
        );

        const isCorrect =
            Math.abs(userAnswer - problem.answer) <= tolerance;

        answered = true;
        attempts++;

        if (isCorrect) {

            correctAnswers++;

            feedbackTitle.textContent = "Correct Answer!";
            feedbackMessage.textContent =
                "Excellent work! Your numerical answer is correct.";

        } else {

            feedbackTitle.textContent = "Not Quite Correct";
            feedbackMessage.textContent =
                "Review the formula and solution to understand the correct calculation.";

        }

        feedbackArea.classList.remove("hidden");
        solutionArea.classList.remove("hidden");

        answerInput.disabled = true;
        submitButton.disabled = true;

        nextButton.classList.remove("hidden");

        if (currentProblem === TOTAL_PROBLEMS - 1) {
            nextButton.textContent = "View Final Results";
        } else {
            nextButton.textContent = "Next Problem";
        }

        updateScoreboard();

    }

    function showNextProblem() {

        if (!answered) return;

        currentProblem++;

        if (currentProblem >= TOTAL_PROBLEMS) {
            finishChallenge();
            return;
        }

        loadProblem();

    }

    function finishChallenge() {

        questionArea.classList.add("hidden");
        completeArea.classList.remove("hidden");

        finalScore.textContent =
            `${correctAnswers} / ${TOTAL_PROBLEMS}`;

        const accuracy =
            Math.round((correctAnswers / TOTAL_PROBLEMS) * 100);

        if (accuracy === 100) {

            finalMessage.textContent =
                "Outstanding! You answered every problem correctly.";

        } else if (accuracy >= 80) {

            finalMessage.textContent =
                "Excellent performance! You demonstrate strong thermodynamics problem-solving skills.";

        } else if (accuracy >= 60) {

            finalMessage.textContent =
                "Good effort! Continue practicing to strengthen your understanding.";

        } else {

            finalMessage.textContent =
                "Keep learning and practicing. Review the solutions and try another challenge.";

        }

    }

    function showHint() {

        hintArea.classList.toggle("hidden");

    }

    function showSolution() {

        solutionArea.classList.toggle("hidden");

    }

    startButton.addEventListener("click", startChallenge);
    restartButton.addEventListener("click", startChallenge);
    submitButton.addEventListener("click", submitAnswer);
    nextButton.addEventListener("click", showNextProblem);
    hintButton.addEventListener("click", showHint);
    solutionButton.addEventListener("click", showSolution);

    answerInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter" && !answered) {
            submitAnswer();
        }

    });

    console.log(
        "THERMOQUEST Problem-Solving Challenge: Successfully initialized."
    );

})();

/* =========================================
   THERMOQUEST STUDENT PERFORMANCE DASHBOARD
========================================= */

(function () {

    const assessmentDisplay =
        document.getElementById("dashboardAssessment");

    const accuracyDisplay =
        document.getElementById("dashboardAccuracy");

    const problemsDisplay =
        document.getElementById("dashboardProblems");

    const lessonsDisplay =
        document.getElementById("dashboardLessons");

    const assessmentText =
        document.getElementById("assessmentProgressText");

    const assessmentBar =
        document.getElementById("assessmentProgressBar");

    const challengeText =
        document.getElementById("challengeProgressText");

    const challengeBar =
        document.getElementById("challengeProgressBar");

    const lessonText =
        document.getElementById("lessonProgressText");

    const lessonBar =
        document.getElementById("lessonProgressBar");

    const performanceMessage =
        document.getElementById("performanceMessage");

    const refreshButton =
        document.getElementById("refreshDashboard");

    function updateDashboard() {

        const assessment = JSON.parse(
            localStorage.getItem("thermoquestLatestAssessment") || "null"
        );

        const challenge = JSON.parse(
            localStorage.getItem("thermoquestChallengeResults") || "null"
        );

        if (assessment) {
            assessmentDisplay.textContent =
                `${assessment.percentage}%`;

            assessmentText.textContent =
                `${assessment.score} out of ${assessment.total}`;

            assessmentBar.style.width =
                `${assessment.percentage}%`;
        } else {
            assessmentDisplay.textContent = "--";
            assessmentText.textContent = "No assessment completed";
            assessmentBar.style.width = "0%";
        }

        if (challenge) {
            accuracyDisplay.textContent =
                `${challenge.accuracy}%`;

            problemsDisplay.textContent =
                challenge.correct;

            challengeText.textContent =
                `${challenge.correct} out of ${challenge.total} correct`;

            challengeBar.style.width =
                `${challenge.accuracy}%`;
        } else {
            accuracyDisplay.textContent = "--";
            problemsDisplay.textContent = "0";
            challengeText.textContent =
                "No challenge completed";
            challengeBar.style.width = "0%";
        }

        lessonsDisplay.textContent = "0";
        lessonText.textContent = "No lessons completed yet";
        lessonBar.style.width = "0%";

        if (assessment || challenge) {
            performanceMessage.textContent =
                "Your learning progress is being recorded. Continue completing lessons, assessments, and problem-solving challenges.";
        } else {
            performanceMessage.textContent =
                "Start learning and complete an assessment or challenge to see your performance here.";
        }
    }

    if (refreshButton) {
        refreshButton.addEventListener(
            "click",
            updateDashboard
        );
    }

    updateDashboard();

    console.log("THERMOQUEST Performance Dashboard loaded.");

})();
