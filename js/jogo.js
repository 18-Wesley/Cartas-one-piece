let tempoGame = 100
let tempoPadrao = 100
const body = document.body
const footer = document.querySelector('.footer')

const checarClick = () => {
    const primeiroPersonagem = primeiro.getAttribute('data')
    const segundoPersonagem = segundo.getAttribute('data')
    if(primeiroPersonagem == segundoPersonagem){
        primeiro.firstChild.classList.add('desabilita')
        segundo.firstChild.classList.add('desabilita')
        
        primeiro = ''
        segundo = ''
    }else{
        setTimeout(() => {
            primeiro.classList.remove('revela_carta')
            primeiro = ''
            segundo.classList.remove('revela_carta')
            segundo = ''
        },500)
    }
}
//checa se todos as cartas estão com a classe desabilita e cria a condição para criar mensagem de vitoria e parar o cronometro
const checarCartas = (tempo, tempoGameAtual) =>{
    const cartasDesabilitadas = document.querySelectorAll('.desabilita')
    if(cartasDesabilitadas.length == 20 && tempoGameAtual > 0){
        console.log('parabens')
        tempoDiv.style.display = "none"
        nomePlayer.style.display = "none"
        mensagemGame.style.display = "block"
        mensagemGame.style.color = "#00ff00 "
        mensagemGame.innerHTML = "Parabéns você ganhou !!"
        criarMensagem()
        clearTimeout(tempo)
        rankingElemento(tempoGameAtual)
        
    }
}
//pegar o nome do local strorage armazenado através do inicio.html para colocar o nome do player no jogo
const nomePlayer = document.querySelector('.nome_player')
const pegarNomePlayer = () => {
    let player = localStorage.getItem('jogador: ')
    nomePlayer.innerHTML = player
}
pegarNomePlayer()

//criar variaveis para criar o crometro, feito isso criar o crometro do game
const tempo = document.querySelector('.cronometro')
const tempoDiv = document.querySelector('.tempo')
let mensagemGame = document.querySelector('.mensagem')

const criarCronometroGame = () =>{
    let desabilitaCartas = document.querySelector('.grid')


    let cronometroGame = setInterval(() => {
        tempoGame--
        tempo.innerHTML = tempoGame
        if(tempoGame == 0){
            clearInterval(cronometroGame)
            tempoDiv.style.display = "none"
            nomePlayer.style.display = "none"
            mensagemGame.style.display = "block"
            desabilitaCartas.style.display = "none"
            body.style.position = 'relative'
            footer.style.position = 'absolute'
            criarMensagem()
        }else{
            checarCartas(cronometroGame, tempoGame)
        }
        
    },1000)
}
//criar a function para revelar a carta com o click no elemento no caso da carta e comparar se são iguais e esabelecer uma condição para caso sejam iguais e diferentes
let primeiro = ''
let segundo = ''

const revelaCarta = ({ target }) =>{

    if(target.parentNode.className.includes('revela_carta')){
        return
    }
    if(primeiro === ''){
        target.parentNode.classList.add('revela_carta')
        primeiro = target.parentNode
    }else if (segundo === ''){
        target.parentNode.classList.add('revela_carta')
        segundo = target.parentNode
        checarClick()
    }
}
//array dos personagens
const personagens = [
    'brook',
    'nami',
    'zoro',
    'sanji',
    'robin',
    'jinbei',
    'franky',
    'usoop',
    'luffy',
    'chopper',
]

//function para reutilizar ao criar elementos
const criarElemento = (tag, className)=> {
    const elemento = document.createElement(tag)
    elemento.className = className
    return elemento
}

//função para criar um elemento para perguntar se o usuario quer ou nao jogar novamente
const criarMensagem = () =>{
    const texto = criarElemento('span', 'text-reiniciar')
    const opcoes = criarElemento('div', 'opcoes')
    const btn_sim = criarElemento('button', 'btn-sim')
    const btn_nao = criarElemento('button', 'btn-nao')

    const div = document.querySelector('.reiniciar')
    div.style.display  = "flex"
    texto.innerHTML = 'Jogar Novamente ?'
    btn_sim.innerHTML = 'sim'
    btn_nao.innerHTML = 'nâo'

    div.appendChild(texto)
    div.appendChild(opcoes)
    opcoes.appendChild(btn_sim)
    opcoes.appendChild(btn_nao)
    btn_nao.setAttribute("onclick", "voltar()")
    btn_sim.setAttribute("onclick", "reiniciarGame()")

}
//função para retornar a pagina do proprio jogo
function voltar(){
    window.location.href = "./inicio.html"
}
//função para retornar para a pagina do inicio
function reiniciarGame(){
    window.location.href = "./jogo.html"
}

//função para criar as cartas enviando como parametro o array de personagens para que cada carta seja criada no futuro com cada imagem dos personagens
const criarCards =(personagens) =>{
    const cards = criarElemento('div', 'cards')
    const back = criarElemento('div', 'card_item back')
    const front = criarElemento('div', 'card_item front')

    back.style.backgroundImage = `url('../imagens/${personagens}.jpg')`

    const grid = document.querySelector(".grid")
    grid.appendChild(cards)
    cards.appendChild(back)
    cards.appendChild(front)
    
    cards.addEventListener('click', revelaCarta)
    cards.setAttribute('data',personagens)

    return cards
}

//função para criar as cartas com base na perocorrencia do array, cria tambem outro array baseado no array de personagens e duplica no novo finalizando com um valor randomico menor que 0 ou maior que 0 para gerar aleatoriamente as imagens
const iniciarJogo = ()=>{
    const sobraArray = [...personagens, ...personagens]
    const novoArray = sobraArray.sort( ()=> Math.random() - 0.5)
    novoArray.forEach((personagens)=>{
        const card = criarCards(personagens)
    })
}
const rankingElemento = (tempoFeito) =>{
    console.log(tempoFeito)
    console.log(tempoGame)

    let tempoRestante = tempoPadrao - tempoFeito
    const rankingText = criarElemento('h4', '')
    const div = criarElemento('div','top_1')
    //const spanRanking = criarElemento('span', 'ranking' )
    const spanTempoRestante =criarElemento('span', 'tempo_colocacao')
    const spanSegundosTempo = criarElemento('span', 'segundos_colocacao')
    const divRanking = document.querySelector('.colocacao')

    divRanking.appendChild(rankingText)
    divRanking.appendChild(div)
    //div.appendChild(spanRanking)
    div.appendChild(spanTempoRestante)
    spanTempoRestante.innerHTML ='Tempo Realizado: '
    div.appendChild(spanSegundosTempo)
    spanSegundosTempo.innerHTML = tempoRestante +' Segundos'
}
iniciarJogo()
criarCronometroGame()

