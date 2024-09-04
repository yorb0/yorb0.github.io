
let p = 0
const caixa1 = document.getElementById('caixa1')
const caixa2 = document.getElementById('caixa2')
const itens = document.querySelectorAll('.item')
const btnAdicionar = document.getElementById('btnAdicionar')
const btnRemover = document.getElementById('btnRemover')

function adicionarItem(){
    const selecionados = caixa1.querySelectorAll('.selecionado')
    selecionados.forEach(selecionado => {
        caixa2.appendChild(selecionado)
        selecionado.classList.remove('selecionado')
    })

    resetarCursor()
}

function removerItem(){
    const selecionados = caixa2.querySelectorAll('.selecionado')
    selecionados.forEach(selecionado => {
        caixa1.appendChild(selecionado)
        selecionado.classList.remove('selecionado')
    })
    
    resetarCursor()
}

function resetarCursor(){
    itens.forEach(item=>{
        item.classList.remove('cursor')
    })
    p = 0
    const item = document.querySelector('.item')
    item.classList.toggle('cursor')
}

itens.forEach(item=>{
    item.addEventListener('click', (e)=>{
        item.classList.toggle('selecionado')
    })
})

btnAdicionar.addEventListener('click', (e)=>{
    adicionarItem()
})

btnRemover.addEventListener('click', (e)=>{
    removerItem()
})

addEventListener('keydown', (e)=>{
    const itens = Array.from(document.querySelectorAll('.item'))
    switch(e.code){
        case 'ArrowDown':
            if(p < itens.length-1){
                if(itens[p]) itens[p].classList.remove('cursor')
                p++
                itens[p].classList.add('cursor')
            }
            break;
        case 'ArrowUp':
            if(p > 0){
                itens[p].classList.remove('cursor')
                itens[--p].classList.add('cursor')
            }
            break;
        case 'Enter':
            itens[p].classList.toggle('selecionado')
            break;
        case 'Space':
            itens[p].classList.toggle('selecionado')
            break;
        case 'KeyA':
            adicionarItem()
            break;
        case 'KeyR':
            removerItem()
            break;
    }
})