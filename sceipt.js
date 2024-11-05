const apiKey = '8bf77aca4155387e8d6cc55fcf82ce52'; // Substitua pela sua chave de API
let correctMedia;
let options = [];
let isMovieRound = true; // Controla se a rodada será sobre filme ou série
let timerInterval;
let timeLeft = 15; // Tempo em segundos para responder

function getRandomMedia() {
    const mediaType = isMovieRound ? 'movie' : 'tv';
    const apiUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=pt-BR&page=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            correctMedia = data.results[randomIndex];
            options = [correctMedia];

            // Adiciona mais 3 opções aleatórias
            while (options.length < 4) {
                const randomOption = data.results[Math.floor(Math.random() * data.results.length)];
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }

            // Embaralha as opções para tornar a escolha aleatória
            options = options.sort(() => Math.random() - 0.5);

            // Exibe a pergunta e as opções
            displayQuestion();
            startTimer(); // Inicia o temporizador
        })
        .catch(error => console.error('Erro ao buscar mídia:', error));
}

function displayQuestion() {
    document.getElementById('question').innerHTML = '<p>Qual é o filme ou série?</p>';
    document.getElementById('mediaImage').src = `https://image.tmdb.org/t/p/w500${correctMedia.poster_path}`;
    document.getElementById('mediaImage').style.height = '200px'; // Mostra a imagem cortada
    document.getElementById('mediaImage').style.display = 'block';

    // Exibe sinopse, data de lançamento e avaliação
    document.getElementById('mediaSynopsis').innerText = `Sinopse: ${correctMedia.overview || 'Sinopse não disponível'}`;
    document.getElementById('mediaReleaseDate').innerText = `Data de Lançamento: ${correctMedia.release_date || correctMedia.first_air_date || 'Data não disponível'}`;
    document.getElementById('mediaRating').innerText = `Avaliação: ${correctMedia.vote_average || 'Avaliação não disponível'}`;
    document.getElementById('mediaInfo').style.display = 'block';

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    // Cria botões para as opções
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.title || option.name; // title para filmes, name para séries
        button.onclick = () => {
            clearInterval(timerInterval); // Para o temporizador ao responder
            checkAnswer(option);
        };
        optionsDiv.appendChild(button);
    });
}

function startTimer() {
    timeLeft = 15; // Redefine o tempo para cada pergunta
    document.getElementById('timer').innerHTML = `Tempo restante: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerHTML = `Tempo restante: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer(null); // Chama a verificação com resposta nula (tempo esgotado)
        }
    }, 1000);
}

// Função para limpar as informações da mídia
function clearMediaInfo() {
    document.getElementById('mediaSynopsis').innerText = "";
    document.getElementById('mediaReleaseDate').innerText = "";
    document.getElementById('mediaRating').innerText = "";
    document.getElementById('mediaInfo').style.display = 'none';
}

function checkAnswer(selected) {
    const resultDiv = document.getElementById('result');
    if (selected && selected.id === correctMedia.id) {
        resultDiv.innerHTML = '<p>Correto!</p>';
    } else {
        resultDiv.innerHTML = `<p>Incorreto! O filme ou série era: ${correctMedia.title || correctMedia.name}</p>`;
    }

    // Mostra a imagem completa após responder
    document.getElementById('mediaImage').style.height = 'auto';
    document.getElementById('mediaImage').style.objectPosition = 'center';

    document.getElementById('nextButton').style.display = 'block';
}

document.getElementById('nextButton').onclick = () => {
    document.getElementById('result').innerHTML = '';
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('timer').innerHTML = ''; // Limpa o temporizador

    clearMediaInfo(); // Limpa as informações da mídia anterior
    getRandomMedia();
};

// Inicia o jogo
getRandomMedia();
