let tarefas = []

const inputTarefa = document.getElementById('inputTarefa')

// EVENTOS
document.getElementById('submitTarefa').addEventListener('click', function() {
    tarefas.push(inputTarefa.value)
    console.log(tarefas)
})