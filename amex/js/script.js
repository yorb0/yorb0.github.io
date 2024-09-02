
const caixa1 = document.getElementById('caixa1')
const caixa2 = document.getElementById('caixa2')
const items = document.querySelectorAll('.item')
const adicionar = document.getElementById('adicionar')
const remover = document.getElementById('remover')

items.forEach(item=>{
    item.addEventListener('click', (e)=>{
        item.classList.toggle('selecionado')
    })
})

adicionar.addEventListener('click', (e)=>{
    const selecionados = caixa1.querySelectorAll('.selecionado')
    selecionados.forEach(selecionado => {
        caixa2.appendChild(selecionado)
        selecionado.classList.remove('selecionado')
    })
})

remover.addEventListener('click', (e)=>{
    const selecionados = caixa2.querySelectorAll('.selecionado')
    selecionados.forEach(selecionado => {
        caixa1.appendChild(selecionado)
        selecionado.classList.remove('selecionado')
    })
})

addEventListener('keydown', (e)=>{
    
})