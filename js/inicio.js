const input = document.getElementById('input')
const button = document.querySelector('.disabled')
const form = document.querySelector('.form')
const dialog = document.getElementById('ModalPop')
const btn_voltar = document.getElementById('btn') 
const caixa = document.querySelector('.container-form')
const ModalPop = document.getElementById('ModalPop')

const verificaInput = ({ target }) =>{
    const valorInput = target.value
    if(valorInput.length > 2){
        button.removeAttribute('disabled', '')
        button.classList.remove('disabled')
        button.classList.add('btn')
        return
    }
    button.classList.remove('btn')
    button.classList.add('disabled')
}
const salvarInput = (event) =>{
    event.preventDefault()
    const nomePlayer = localStorage.setItem('jogador: ', input.value )
    setTimeout(() =>{
        window.location.href = "./jogo.html"

    },500)
}
function abrirDialog () {
    caixa.style.display = "none"
    dialog.style.display = "flex"
    ModalPop.style.transition = '2s'
}
function removeDialog (){
    caixa.style.display = "flex"
    dialog.style.display = "none"
}

input.addEventListener("input", verificaInput)
form.addEventListener("submit", salvarInput)

function displayNoneDialog (){
    dialog.style.display = "none"
}
displayNoneDialog()