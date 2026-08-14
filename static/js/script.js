// ==========================================
// EduPulse AI - Student Feedback Chatbot
// ==========================================

let step = 0;

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const dropdown = document.getElementById("dropdownInput");
const quickReplies = document.getElementById("quickReplies");

const progressFill = document.getElementById("progressFill");
const progressValue = document.getElementById("progressValue");

const answers = {};


// ==========================================
// STUDENT DETAILS
// ==========================================

const departments = [

    "Mechanical Engineering",
    "Computer Science and Engineering",
    "Information Technology",
    "Artificial Intelligence & Data Science",
    "Electronics and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Civil Engineering",
    "Biomedical Engineering",
    "Chemical Engineering"

];


const years = [

    "I Year",
    "II Year",
    "III Year",
    "IV Year"

];


const subjects = [

    "Mathematics",
    "Physics",
    "Chemistry",
    "Engineering Graphics",
    "Python",
    "Tamil"

];


const facultyData = {

    "Mathematics": [
        "Kalaivani",
        "Yugesh",
        "Sampath"
    ],

    "Physics": [
        "Julie Charles",
        "Balaji",
        "Anandha Babu"
    ],

    "Chemistry": [
        "Murugesan",
        "Mahalakshmi",
        "Shanmugaraj"
    ],

    "Engineering Graphics": [
        "Alwin",
        "Alphin",
        "Hari Krishna"
    ],

    "Python": [
        "Nepolean Keisham",
        "Sudha",
        "Sornavalli"
    ],

    "Tamil": [
        "Clinton Britto",
        "Srinivasan",
        "Ram Smaran"
    ]

};


// ==========================================
// FEEDBACK QUESTIONS
// ==========================================

const feedbackQuestions = [

    {
        question: "😊 How was the class overall?",

        options: [
            "🌟 Excellent",
            "👍 Good",
            "😐 Average",
            "😕 Needs Improvement"
        ]
    },

    {
        question: "💡 How were the concepts explained?",

        options: [
            "💡 Very Clear",
            "🙂 Clear",
            "😐 Somewhat Clear",
            "❓ Difficult"
        ]
    },

    {
        question: "👨‍🏫 How was the teaching?",

        options: [
            "🌟 Excellent",
            "👍 Good",
            "😐 Average",
            "😕 Needs Improvement"
        ]
    },

    {
        question: "💬 How approachable was the faculty?",

        options: [
            "😊 Very Approachable",
            "🙂 Approachable",
            "😐 Somewhat Approachable",
            "🙁 Not Approachable"
        ]
    }

];


// ==========================================
// BOT MESSAGE
// ==========================================

function botMessage(message) {

    const div = document.createElement("div");

    div.className = "bot";

    div.innerHTML = "🤖 " + message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

}


// ==========================================
// USER MESSAGE
// ==========================================

function userMessage(message) {

    const div = document.createElement("div");

    div.className = "user";

    div.innerHTML = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

}


// ==========================================
// TYPING EFFECT
// ==========================================

function showTyping(nextMessage, callback = null) {

    const typing = document.createElement("div");

    typing.className = "bot";

    typing.id = "typing";

    typing.innerHTML = "🤖 Typing...";

    chatBox.appendChild(typing);

    chatBox.scrollTop = chatBox.scrollHeight;


    setTimeout(function () {

        typing.remove();

        botMessage(nextMessage);

        if (callback) {

            callback();

        }

    }, 800);

}


// ==========================================
// QUICK REPLY BUTTONS
// ==========================================

function showQuickReplies(options) {

    quickReplies.innerHTML = "";

    options.forEach(function (option) {

        const button = document.createElement("button");

        button.className = "quick-reply";

        button.innerText = option;

        button.onclick = function () {

            handleQuickReply(option);

        };

        quickReplies.appendChild(button);

    });

}


// ==========================================
// CLEAR QUICK REPLIES
// ==========================================

function clearQuickReplies() {

    quickReplies.innerHTML = "";

}


// ==========================================
// DROPDOWN
// ==========================================

function loadDropdown(list) {

    dropdown.innerHTML = "";

    const first = document.createElement("option");

    first.value = "";

    first.text = "-- Select --";

    dropdown.appendChild(first);


    list.forEach(function (item) {

        const option = document.createElement("option");

        option.value = item;

        option.text = item;

        dropdown.appendChild(option);

    });

}


// ==========================================
// PROGRESS
// ==========================================

function updateProgress() {

    // 6 student details + 5 feedback questions
    const totalSteps = 11;

    const percent = Math.min(
        (step / totalSteps) * 100,
        100
    );

    progressFill.style.width = percent + "%";

    progressValue.innerHTML =
        Math.round(percent) + "%";

}


// ==========================================
// INPUT MODE
// ==========================================

function showTextInput(placeholder) {

    input.style.display = "block";

    dropdown.style.display = "none";

    quickReplies.style.display = "none";

    input.placeholder = placeholder;

    input.focus();

}


function showDropdownInput() {

    input.style.display = "none";

    dropdown.style.display = "block";

    quickReplies.style.display = "none";

}


function showQuickInput() {

    input.style.display = "none";

    dropdown.style.display = "none";

    quickReplies.style.display = "flex";

}


// ==========================================
// START CHAT
// ==========================================

window.onload = function () {

    updateProgress();

    botMessage("👋 Hello! Welcome to EduPulse AI.");

    setTimeout(function () {

        botMessage(
            "I'm your AI Feedback Assistant."
        );

    }, 600);


    setTimeout(function () {

        botMessage(
            "Let's have a quick conversation about your learning experience."
        );

    }, 1200);


    setTimeout(function () {

        botMessage(
            "May I know your Name?"
        );

        showTextInput("Enter your name...");

    }, 1800);

};


// ==========================================
// ENTER KEY
// ==========================================

input.addEventListener(
    "keypress",
    function (e) {

        if (e.key === "Enter") {

            sendMessage();

        }

    }
);


// ==========================================
// SEND TEXT / DROPDOWN ANSWER
// ==========================================

function sendMessage() {

    let text = "";


    // --------------------------------------
    // TEXT INPUT
    // --------------------------------------

    if (
        step === 0 ||
        step === 1 ||
        step === 10 ||
        step === 11 ||
        step === 12
    ) {

        text = input.value.trim();

        if (text === "") {

            alert("Please enter your answer.");

            return;

        }

    }


    // --------------------------------------
    // DROPDOWN
    // --------------------------------------

    else if (
        step === 2 ||
        step === 3 ||
        step === 4 ||
        step === 5
    ) {

        text = dropdown.value;

        if (text === "") {

            alert("Please select an option.");

            return;

        }

    }


    // --------------------------------------
    // SHOW USER ANSWER
    // --------------------------------------

    userMessage(text);

    clearQuickReplies();


    // --------------------------------------
    // SAVE STUDENT DETAILS
    // --------------------------------------

    if (step === 0) {

        answers.name = text;

    }

    else if (step === 1) {

        answers.email = text;

    }

    else if (step === 2) {

        answers.department = text;

    }

    else if (step === 3) {

        answers.year = text;

    }

    else if (step === 4) {

        answers.subject = text;

    }

    else if (step === 5) {

        answers.faculty = text;

    }


    // --------------------------------------
    // FEEDBACK TEXT ANSWERS
    // --------------------------------------

    else if (step === 10) {

        answers.conceptFollowUp = text;

    }

    else if (step === 11) {

        answers.improvement = text;

    }


    input.value = "";

    step++;

    updateProgress();


    continueConversation();

}


// ==========================================
// QUICK REPLY HANDLER
// ==========================================

function handleQuickReply(option) {

    userMessage(option);

    clearQuickReplies();


    // --------------------------------------
    // Q1
    // --------------------------------------

    if (step === 6) {

        answers.overallExperience = option;

    }


    // --------------------------------------
    // Q2
    // --------------------------------------

    else if (step === 7) {

        answers.conceptClarity = option;

    }


    // --------------------------------------
    // Q3
    // --------------------------------------

    else if (step === 8) {

        answers.teachingRating = option;

    }


    // --------------------------------------
    // Q4
    // --------------------------------------

    else if (step === 9) {

        answers.approachability = option;

    }


    step++;

    updateProgress();

    continueConversation();

}


// ==========================================
// CONVERSATION FLOW
// ==========================================

function continueConversation() {


    // ======================================
    // NAME → EMAIL
    // ======================================

    if (step === 1) {

        showTyping(
            "Thanks, " + answers.name + "! 😊"
        );


        setTimeout(function () {

            botMessage(
                "Please enter your college email address."
            );

            showTextInput(
                "Enter your college email..."
            );

        }, 1000);

    }


    // ======================================
    // EMAIL → DEPARTMENT
    // ======================================

    else if (step === 2) {

        showDropdownInput();

        loadDropdown(departments);

        showTyping(
            "Great! Now select your department."
        );

    }


    // ======================================
    // DEPARTMENT → YEAR
    // ======================================

    else if (step === 3) {

        loadDropdown(years);

        showTyping(
            "Which year are you studying?"
        );

    }


    // ======================================
    // YEAR → SUBJECT
    // ======================================

    else if (step === 4) {

        loadDropdown(subjects);

        showTyping(
            "Select the subject."
        );

    }


    // ======================================
    // SUBJECT → FACULTY
    // ======================================

    else if (step === 5) {

        loadDropdown(
            facultyData[answers.subject] || []
        );

        showTyping(
            "Now select the faculty."
        );

    }


    // ======================================
    // FACULTY → Q1
    // ======================================

    else if (step === 6) {

        showTyping(
            "Thank you! Let's keep this quick. 😊"
        );


        setTimeout(function () {

            botMessage(
                feedbackQuestions[0].question
            );

            showQuickInput();

            showQuickReplies(
                feedbackQuestions[0].options
            );

        }, 1000);

    }


    // ======================================
    // Q1 → Q2
    // ======================================

    else if (step === 7) {

        botMessage(
            feedbackQuestions[1].question
        );

        showQuickReplies(
            feedbackQuestions[1].options
        );

    }


    // ======================================
    // Q2
    // ======================================

    else if (step === 8) {

        /*
         * If the student selected
         * "Somewhat Clear", ask
         * one conditional follow-up.
         */

        if (
            answers.conceptClarity.includes(
                "Somewhat Clear"
            )
        ) {

            showTextInput(
                "Which concept needs more explanation?"
            );


            showTyping(
                "💬 Which concept needs more explanation?"
            );

        }

        else {

            botMessage(
                feedbackQuestions[2].question
            );

            showQuickInput();

            showQuickReplies(
                feedbackQuestions[2].options
            );

        }

    }


    // ======================================
    // FOLLOW-UP AFTER SOMEWHAT CLEAR
    // ======================================

    else if (step === 9) {

        /*
         * If conceptFollowUp hasn't been stored,
         * this means the previous answer was
         * the conditional text response.
         */

        if (
            !answers.conceptFollowUp &&
            answers.conceptClarity &&
            answers.conceptClarity.includes(
                "Somewhat Clear"
            )
        ) {

            return;

        }

        botMessage(
            feedbackQuestions[2].question
        );

        showQuickInput();

        showQuickReplies(
            feedbackQuestions[2].options
        );

    }


    // ======================================
    // Q3 → Q4
    // ======================================

    else if (step === 10) {

        botMessage(
            feedbackQuestions[3].question
        );

        showQuickInput();

        showQuickReplies(
            feedbackQuestions[3].options
        );

    }


    // ======================================
    // Q4 → Q5
    // ======================================

    else if (step === 11) {

        showTextInput(
            "Type your suggestion..."
        );

        showTyping(
            "💭 What can this faculty improve?"
        );

    }


    // ======================================
    // Q5 → SAVE
    // ======================================

    else if (step === 12) {

        answers.improvement = answers.improvement || "";

        showTyping(
            "✨ Thank you! Your feedback has been recorded."
        );


        setTimeout(function () {

            saveFeedback();

        }, 900);

    }

}


// ==========================================
// SAVE FEEDBACK TO FLASK
// ==========================================

function saveFeedback() {

    fetch("/save", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            name: answers.name,

            email: answers.email,

            department: answers.department,

            year: answers.year,

            subject: answers.subject,

            faculty: answers.faculty,

            overallExperience:
                answers.overallExperience || "",

            conceptClarity:
                answers.conceptClarity || "",

            conceptFollowUp:
                answers.conceptFollowUp || "",

            teachingRating:
                answers.teachingRating || "",

            approachability:
                answers.approachability || "",

            improvement:
                answers.improvement || ""

        })

    })

    .then(function (response) {

        if (!response.ok) {

            throw new Error(
                "Server returned an error."
            );

        }

        return response.json();

    })

    .then(function (data) {

        if (data.status === "success") {

            showTyping(
                "🎉 Your feedback has been saved successfully!"
            );


            setTimeout(function () {

                botMessage(
                    "Thank you for helping us improve the learning experience. ❤️"
                );

            }, 1000);

        }

        else {

            botMessage(
                "❌ " +
                (
                    data.message ||
                    "Unable to save feedback."
                )
            );

        }

    })

    .catch(function (error) {

        console.error(
            "Save Error:",
            error
        );

        botMessage(
            "❌ There was a problem saving your feedback. Please try again."
        );

    });

}
