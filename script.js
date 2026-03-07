let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

const inputTarefa = document.getElementById('inputTarefa')
const btnEnviar = document.getElementById('submitTarefa')
const lista = document.getElementById('lista')

function limparInput () {
    inputTarefa.value = ""
}

function adicionarTarefa () {
    if (inputTarefa.value.trim() == "") {
        alert("Você não pode enviar uma tarefa vazia!")
    } else {
        tarefas.push(inputTarefa.value)
        salvarTarefas()
    }
}

function editTarefa (index) {
    const novaTarefa = prompt("Editar Tarefa:", tarefas[index])
    if (novaTarefa !== null) {
        tarefas[index] = novaTarefa
        salvarTarefas()
        mostrarTarefa()
    }
}

function excluirTarefa (index) {
    tarefas.splice(index, 1)
    salvarTarefas()
    mostrarTarefa()
}

function mostrarTarefa () {
    lista.innerHTML = tarefas.map((tarefa, index) => `
        <li>
        <input type="checkbox">
        <span>${tarefa}</span>
        <div class="acoes">
        <button class="edit" onclick="editTarefa(${index})">Editar</button>
        <button class="delete" onclick="excluirTarefa(${index})">Deletar</button>
        </li>
        </li>`)
        .join("")
}        

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}


// EVENTOS

btnEnviar.addEventListener('click', () => {
    adicionarTarefa()
    mostrarTarefa()
    limparInput()
})

mostrarTarefa()