const questions = [
    {
        question: "1. Limbah yang memiliki dimensi panjang dan lebar serta tidak memiliki tinggi atau ketebalan yang signifikan disebut...",
        options: ["Limbah organik", "Limbah anorganik", "Limbah bangun ruang", "Limbah bangun datar"],
        correctAnswer: 3,
        explanation: "Limbah berbentuk bangun datar adalah limbah yang memiliki dimensi panjang dan lebar, tetapi tidak memiliki ruang (tebal/tinggi)."
    },
    {
        question: "2. Berikut ini yang BUKAN merupakan contoh limbah berbentuk bangun datar adalah...",
        options: ["Daun kering", "Kertas karton", "Botol plastik", "Kain perca"],
        correctAnswer: 2,
        explanation: "Botol plastik merupakan limbah berbentuk bangun ruang (3D), bukan bangun datar yang berdimensi 2 (panjang x lebar)."
    },
    {
        question: "3. Analisis untuk mengetahui kekuatan yang dimiliki oleh suatu usaha disebut unsur...",
        options: ["Strength", "Weakness", "Opportunity", "Threat"],
        correctAnswer: 0,
        explanation: "Dalam Analisis SWOT, 'S' (Strength) merupakan analisis komponen kekuatan dari internal suatu usaha."
    },
    {
        question: "4. Kegiatan penciptaan, pengubahan, atau penambahan nilai guna suatu barang disebut...",
        options: ["Distribusi", "Konsumsi", "Produksi", "Pengemasan"],
        correctAnswer: 2,
        explanation: "Produksi adalah kegiatan menambah nilai guna atau menciptakan produk kreatif agar lebih bermanfaat dan bernilai ekonomi."
    },
    {
        question: "5. Biaya yang jumlahnya tidak berubah meskipun volume produksi barang berubah-ubah disebut...",
        options: ["Biaya variabel", "Biaya tetap", "Biaya total", "Biaya rata-rata"],
        correctAnswer: 1,
        explanation: "Biaya tetap (Fixed Cost) adalah biaya yang tidak bergantung pada jumlah barang yang diproduksi (contoh: beban sewa gedung)."
    },
    {
        question: "6. Kemampuan seseorang untuk melahirkan sesuatu yang baru, baik berupa gagasan maupun karya nyata disebut...",
        options: ["Inovasi", "Kreativitas", "Produktivitas", "Keterampilan"],
        correctAnswer: 1,
        explanation: "Kreativitas adalah kemampuan pola pikir untuk menciptakan ide, gagasan, atau karya yang baru dan orisinil."
    },
    {
        question: "7. Proses mengevaluasi ide-ide yang muncul dari tahapan curah pendapat (brainstorming) untuk memilih yang terbaik disebut...",
        options: ["Rasionalisasi", "Eksplorasi", "Implementasi", "Visualisasi"],
        correctAnswer: 0,
        explanation: "Rasionalisasi adalah tahapan proses mengevaluasi dan menyaring ide-ide berdasarkan rasio dan pertimbangan kelayakannya."
    },
    {
        question: "8. Tujuan utama melakukan promosi bagi sebuah produk kerajinan adalah...",
        options: ["Meningkatkan harga jual", "Menurunkan kualitas", "Meningkatkan pengenalan produk", "Menghabiskan modal"],
        correctAnswer: 2,
        explanation: "Promosi bertujuan untuk menginformasikan produk kepada calon konsumen agar lebih dikenal masyarakat sasaran."
    },
    {
        question: "9. Break Even Point (BEP) adalah sebuah titik impas, yang dimana berarti suatu usaha...",
        options: ["Mendapatkan untung besar", "Mengalami kerugian", "Tidak laba maupun rugi", "Terpaksa berhutang"],
        correctAnswer: 2,
        explanation: "BEP atau Titik Impas adalah kondisi ideal titik balik dimana total pendapatan tepat menutupi total biaya keseluruhan."
    },
    {
        question: "10. Pengemasan pada hasil produksi produk kerajinan memiliki fungsi utama yaitu...",
        options: ["Memperberat produk", "Melindungi produk", "Menyulitkan konsumen", "Mengurangi nilai seni"],
        correctAnswer: 1,
        explanation: "Fungsi utama pengemasan utamanya adalah untuk melindungi produk fisik dari kerusakan selama tahap distribusi produk."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen')
};

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const questionImageContainer = document.getElementById('question-image-container');
const questionImage = document.getElementById('question-image');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const scoreDisplay = document.getElementById('score-display');
const progressIndicator = document.getElementById('progress-indicator');

const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');

const finalScoreDisplay = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const scoreCircle = document.querySelector('.score-circle');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', resetQuiz);

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showScreen('quiz');
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    
    // Update header info
    questionNumber.textContent = `Soal ${currentQuestion + 1}/${questions.length}`;
    scoreDisplay.textContent = `Skor: ${Math.round((score / questions.length) * 100)}`;
    progressIndicator.style.width = `${((currentQuestion) / questions.length) * 100}%`;
    
    // Reset classes
    nextBtn.classList.add('hidden');
    feedbackContainer.className = 'feedback-container hidden';
    
    // Set question data
    questionText.textContent = q.question;
    
    // Show image if available
    if (q.image) {
        questionImage.src = q.image;
        questionImageContainer.classList.remove('hidden');
    } else {
        questionImage.src = '';
        questionImageContainer.classList.add('hidden');
    }
    
    optionsContainer.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    
    q.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'option';
        optionEl.innerHTML = `
            <div class="option-letter">${letters[index]}</div>
            <div class="option-text">${option}</div>
        `;
        optionEl.addEventListener('click', () => selectOption(index, optionEl));
        optionsContainer.appendChild(optionEl);
    });
    
    // Animate progress after slight delay to show transition
    setTimeout(() => {
        progressIndicator.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    }, 50);
}

function selectOption(selectedIndex, optionElement) {
    if (answered) return;
    answered = true;
    
    const q = questions[currentQuestion];
    const isCorrect = selectedIndex === q.correctAnswer;
    
    const allOptions = optionsContainer.children;
    
    // Disable all options
    Array.from(allOptions).forEach((opt, index) => {
        opt.classList.add('disabled');
        // Highlight correct answer
        if (index === q.correctAnswer) {
            opt.classList.add('correct');
        }
    });
    
    feedbackContainer.classList.remove('hidden');
    
    if (isCorrect) {
        score++;
        scoreDisplay.textContent = `Skor: ${Math.round((score / questions.length) * 100)}`;
        feedbackContainer.classList.add('correct');
        feedbackText.innerHTML = `<strong>Jawaban Benar!</strong> <br> ${q.explanation}`;
    } else {
        optionElement.classList.add('wrong');
        feedbackContainer.classList.add('wrong');
        const correctAnswerText = q.options[q.correctAnswer];
        feedbackText.innerHTML = `<strong>Jawaban Salah!</strong><br><span style='color:var(--text-main); font-size:0.95rem; display:block; margin: 8px 0;'>Jawaban yang benar adalah: <b>${correctAnswerText}</b></span>${q.explanation}`;
    }
    
    if (currentQuestion < questions.length - 1) {
        nextBtn.textContent = 'Selanjutnya';
    } else {
        nextBtn.textContent = 'Lihat Hasil';
    }
    
    nextBtn.classList.remove('hidden');
}

function handleNext() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    showScreen('result');
    const finalScore = Math.round((score / questions.length) * 100);
    
    // Reset circle before animation
    scoreCircle.style.background = `conic-gradient(rgba(255,255,255,0.1) 100%, rgba(255,255,255,0.1) 0%)`;
    finalScoreDisplay.textContent = '0';
    
    setTimeout(() => {
        animateScore(finalScore);
    }, 300);
    
    if (finalScore >= 90) {
        resultMessage.textContent = "Sangat Memuaskan! Kamu sangat menguasai materi ini.";
    } else if (finalScore >= 70) {
        resultMessage.textContent = "Bagus! Pemahamanmu sudah cukup baik.";
    } else if (finalScore >= 50) {
        resultMessage.textContent = "Cukup. Ayo pelajari materinya lagi ya.";
    } else {
        resultMessage.textContent = "Masih perlu banyak belajar. Jangan menyerah!";
    }
}

function animateScore(targetScore) {
    if (targetScore === 0) {
        finalScoreDisplay.textContent = '0';
        scoreCircle.style.background = `conic-gradient(var(--danger) 0%, rgba(255,255,255,0.1) 0%)`;
        return;
    }
    
    let current = 0;
    const duration = 1500;
    const interval = 20;
    const step = targetScore / (duration / interval);
    
    const timer = setInterval(() => {
        current += step;
        if (current >= targetScore) {
            current = targetScore;
            clearInterval(timer);
        }
        finalScoreDisplay.textContent = Math.round(current);
        const percentage = current;
        
        let color = 'var(--success)';
        if (targetScore < 50) color = 'var(--danger)';
        else if (targetScore < 70) color = 'var(--secondary)';
        
        scoreCircle.style.background = `conic-gradient(${color} ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`;
    }, interval);
}

function resetQuiz() {
    startQuiz();
}
