let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
let filtroAtual = "todas"

const inputTarefa = document.getElementById('inputTarefa')
const btnEnviar = document.getElementById('submitTarefa')
const lista = document.getElementById('lista')
const totalTarefas = document.getElementById("totalTarefas")
const totalTarefasConcluidas = document.getElementById("totalTarefasConcluidas")
const totalTarefasPendentes = document.getElementById("totalTarefasPendentes")
const filterTodas = document.getElementById("filterTodas")
const filterPendentes = document.getElementById("filterPendentes")
const filterConcluidas = document.getElementById("filterConcluidas")

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

    let listaTarefas = tarefas

    if (filtroAtual === "pendentes") {
        listaTarefas = tarefas.filter(tarefa => !tarefa.concluida)
    }
    if (filtroAtual === "concluidas") {
        listaTarefas = tarefas.filter(tarefa => tarefa.concluida)
    }

    lista.innerHTML = listaTarefas.map((tarefa) => {
        const indexReal = tarefas.indexOf(tarefa)
        const concluida = tarefa.concluida || false
        return `
        <li class="tarefa" >
        <div class="task ${concluida ? "completed" : "pendente"} info">

        <input type="checkbox" onclick="inputToggle(${indexReal})" ${concluida ? "checked" : "" }>
        <span class="${concluida ? "done" : ""}">${tarefa.texto}</span>

        </div>

        <div class="actions">
        <button class="edit" onclick="editTarefa(${indexReal})">Editar</button>
        <button class="delete" onclick="excluirTarefa(${indexReal})">Deletar</button>

        </div>
        </li>`})
        .join("")
        contadorTarefas()
}        

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function contadorTarefas() {
    
    const total = tarefas.length
    const concluidas = tarefas.filter(tarefa => tarefa.concluida).length
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

filterTodas.addEventListener('click', () => {
    filtroAtual = "todas"
    mostrarTarefa()
})

filterPendentes.addEventListener('click', () => {
    filtroAtual = "pendentes"
    mostrarTarefa()
})

filterConcluidas.addEventListener('click', () => {
    filtroAtual = "concluidas"
    mostrarTarefa()
})

mostrarTarefa()