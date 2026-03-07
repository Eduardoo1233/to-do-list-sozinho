let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

const inputTarefa = document.getElementById('inputTarefa')
const btnEnviar = document.getElementById('submitTarefa')
const lista = document.getElementById('lista')
const totalTarefas = document.getElementById("totalTarefas")
const totalTarefasConcluidas = document.getElementById("totalTarefasConcluidas")
const totalTarefasPendentes = document.getElementById("totalTarefasPendentes")

function limparInput () {
    inputTarefa.value = ""
}

function adicionarTarefa () {
    if (inputTarefa.value.trim() == "") {
        alert("Você não pode enviar uma tarefa vazia!")
    } else {
        tarefas.push({
            texto: inputTarefa.value,
            concluida: false
        })
        salvarTarefas()
        contadorTarefas()
    }
}

function editTarefa (index) {
    const novaTarefa = prompt("Editar Tarefa:", tarefas[index].texto)
    if (novaTarefa !== null) {
        tarefas[index].texto = novaTarefa
        salvarTarefas()
        mostrarTarefa()
    }
}

function excluirTarefa (index) {
    tarefas.splice(index, 1)
    salvarTarefas()
    mostrarTarefa()
}

function inputToggle(index) {
    tarefas[index].concluida = !tarefas[index].concluida
    salvarTarefas()
    mostrarTarefa()
}

function mostrarTarefa () {
    lista.innerHTML = tarefas.map((tarefa, index) => `
        <li>
        <input type="checkbox" onclick="inputToggle(${index})" ${tarefa.concluida ? "checked" : "" }> 
        <span class="${tarefa.concluida ? "done" : "" }">${tarefa.texto}</span>
        <div class="acoes">
        <button class="edit" onclick="editTarefa(${index})">Editar</button>
        <button class="delete" onclick="excluirTarefa(${index})">Deletar</button>
        </li>`)
        .join("")
        contadorTarefas()
}        

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function contadorTarefas() {
    
    const total = tarefas.length
    const concluidas = tarefas.filter(tarefa => !tarefa.concluida).length
    const pendentes = total - concluidas
    
    totalTarefas.textContent = total
    totalTarefasConcluidas.textContent = concluidas
    totalTarefasPendentes.textContent = pendentes
}


// EVENTOS

btnEnviar.addEventListener('click', () => {
    adicionarTarefa()
    mostrarTarefa()
    limparInput()
})

mostrarTarefa()