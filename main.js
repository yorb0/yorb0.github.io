
const petname = document.getElementById('petname')
const petage = document.getElementById('petage')
const ownername = document.getElementById('ownername')
const plan = document.getElementById('plan')
const submit = document.getElementById('submit')
const output = document.getElementById('output')

submit.addEventListener('click', function(e){
    e.preventDefault()
    output.innerHTML = 
`<b>pet name</b>: ${petname.value}
<b>pet age</b>: ${petage.value}
<b>owner name</b>: ${ownername.value}
<b>plan</b>: ${plan.value} `
})