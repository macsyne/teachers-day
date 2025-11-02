document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hackAlert = document.getElementById('hack-alert');
    const fixScreen = document.getElementById('fix-screen');
    const forgetLoop = document.getElementById('forget-loop');
    const finalMessage = document.getElementById('final-message');
    const fixBtn = document.getElementById('fix-btn');
    const forgetBtn = document.getElementById('forget-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const submitAnswer = document.getElementById('submit-answer');
    const answerInput = document.getElementById('answer-input');
    const studentName = document.getElementById('student-name');
    const resetBtn = document.getElementById('reset-btn');
    const hint = document.getElementById('hint');
    const imageHint = document.getElementById('image-hint');
    
    // Correct answer (what the teacher calls his students)
    const correctAnswer = "floppy birds";
    let wrongAttempts = 0;
    
    // Variables for forget it loop
    let forgetLoopCount = 0;
    const forgetMessages = [
        "Are you really sure?",
        "Seriously? You want to lose all your files?",
        "This is your last chance to save your data!",
        "I can't believe you're still ignoring this!",
        "Okay, you're clearly stubborn. Let's fix it."
    ];
    
    // Event Listeners
    fixBtn.addEventListener('click', showFixScreen);
    forgetBtn.addEventListener('click', showForgetLoop);
    yesBtn.addEventListener('click', handleYesClick);
    noBtn.addEventListener('click', handleNoClick);
    submitAnswer.addEventListener('click', checkAnswer);
    resetBtn.addEventListener('click', resetPrank);
    
    // Press Enter to submit answer
    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Functions
    function showFixScreen() {
        hackAlert.classList.add('hidden');
        fixScreen.classList.remove('hidden');
        answerInput.focus();
    }
    
    function showForgetLoop() {
        hackAlert.classList.add('hidden');
        forgetLoop.classList.remove('hidden');
        updateForgetMessage();
    }
    
    function updateForgetMessage() {
        const message = forgetLoopCount < forgetMessages.length ? 
            forgetMessages[forgetLoopCount] : 
            forgetMessages[forgetMessages.length - 1];
        document.querySelector('#forget-loop p:nth-child(1)').textContent = message;
    }
    
    function handleYesClick() {
        forgetLoopCount++;
        if (forgetLoopCount >= forgetMessages.length) {
            handleNoClick();
        } else {
            updateForgetMessage();
        }
    }
    
    function handleNoClick() {
        forgetLoop.classList.add('hidden');
        showFixScreen();
        forgetLoopCount = 0;
    }
    
    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        if (userAnswer === correctAnswer) {
            studentName.textContent = userAnswer;
            fixScreen.classList.add('hidden');
            finalMessage.classList.remove('hidden');
        } else {
            wrongAttempts++;
            answerInput.classList.add('shake');
            setTimeout(() => answerInput.classList.remove('shake'), 500);
            
            // Show hint after first wrong attempt
            if (wrongAttempts >= 1) {
                hint.classList.remove('hidden');
            }
            
            // Show image hint after second wrong attempt
            if (wrongAttempts >= 2) {
                imageHint.classList.remove('hidden');
            }
            
            answerInput.focus();
        }
    }
    
    function resetPrank() {
        finalMessage.classList.add('hidden');
        hackAlert.classList.remove('hidden');
        answerInput.value = '';
        forgetLoopCount = 0;
        wrongAttempts = 0;
        hint.classList.add('hidden');
        imageHint.classList.add('hidden');
    }
    
    // Simulate system scanning effect
    setInterval(() => {
        const progressText = document.querySelector('.text-red-400');
        if (progressText) {
            const currentPercent = parseInt(progressText.textContent.match(/\d+/)[0]);
            const newPercent = currentPercent < 99 ? currentPercent + 1 : 78;
            progressText.textContent = `> Encryption in progress: ${newPercent}% complete`;
            
            // Update progress bar
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.background = 
                    `linear-gradient(90deg, #ff0000 0%, #ff0000 ${newPercent}%, #333333 ${newPercent}%, #333333 100%)`;
            }
        }
    }, 2000);
    
    // Add some terminal-like effects
    setTimeout(() => {
        const terminalLines = document.querySelectorAll('.font-mono p');
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('cursor');
                setTimeout(() => {
                    line.classList.remove('cursor');
                }, 500);
            }, index * 300);
        });
    }, 500);
});