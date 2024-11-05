# desafios_filmeseseries
Este é um jogo de adivinhação onde você tenta adivinhar o nome de filmes ou séries a partir de opções fornecidas. O site utiliza a API do The Movie Database (TMDb) para obter informações sobre filmes e séries.

Aqui está um exemplo de README.md para documentar o projeto e explicar como usar o site:

markdown
Copiar código
# Jogo de Adivinhação de Filmes e Séries

## Pré-requisitos

Para usar este projeto, você precisará de:

1. Uma chave de API do TMDb. Você pode obter uma criando uma conta no [TMDb](https://www.themoviedb.org/) e gerando uma chave de API.
2. Um navegador moderno que suporte JavaScript.

## Configuração do Projeto

1. **Baixe o projeto**: Clone este repositório ou baixe os arquivos para o seu computador.
2. **Adicione sua chave de API**: Abra o arquivo `js/script.js` e substitua o valor de `apiKey` pela sua chave de API do TMDb:
   ```javascript
   const apiKey = 'SUA_CHAVE_DE_API_AQUI';

   
   Como Jogar
Abra o site em um navegador e clique em Iniciar.
Uma imagem cortada de um filme ou série será exibida, junto com várias opções.
Você terá 15 segundos para escolher a opção correta.
Se você acertar, verá uma mensagem de "Correto!".
Se errar ou o tempo acabar, verá a resposta correta.
Clique em Próximo para iniciar uma nova rodada.
