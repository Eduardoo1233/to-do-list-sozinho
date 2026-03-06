let tarefas = []

const inputTarefa = document.getElementById('inputTarefa')
const btnEnviar = document.getElementById('submitTarefa')
const lista = document.getElementById('lista')

function adicionarTarefa () {
    tarefas.push(inputTarefa.value)
}

function mostrarTarefa () {
    lista.innerHTML = tarefas.map((tarefa, index) => `
        <li>
        <span>${tarefa}</span>
        <div class="acoes">
        <button class="edit" onclick="editTarefa(${index})">Editar</button>
        <button class="delete" onclick="excluirTarefa(${index})">Deletar</button>
        </li>
        </li>`)
        .join("")
}

function limparInput () {
    inputTarefa.value = ""
}

function editTarefa (index) {
    const novaTarefa = prompt("Editar Tarefa:", tarefas[index])
    if (novaTarefa !== null) {
        tarefas[index] = novaTarefa
        mostrarTarefa()
    }
}

function excluirTarefa (index) {
    tarefas.splice(index, 1)
    mostrarTarefa()
}

// EVENTOS

btnEnviar.addEventListener('click', () => {
    adicionarTarefa()
    mostrarTarefa()
    limparInput()
})