const buttonPesquisar = document.querySelector('.button-adc-tarefa'); // Botão de pesquisa
const buttonAdicionar = document.querySelector('.button-add-task'); // Botão de adicionar tarefa
const inputTarefa = document.querySelector('.input-tarefa'); // Input para pesquisa e adição de tarefa
const inputTask = document.querySelector('.input-task'); // Input para descrição da tarefa
const select = document.querySelector('#priori'); // Select de prioridade
const listaCompleta = document.querySelector('.list-tarefas');

let minhaListaDeItens = [];

// Função para adicionar nova tarefa
function adicionarNovaTarefa() {
  if (inputTask.value.trim() !== '') {
    minhaListaDeItens.push({
      tarefa: inputTask.value,
      prioridade: select.value, // Adiciona a prioridade selecionada
      concluida: false,
    });

    inputTask.value = ''; // Limpa o campo após adicionar
    mostrarTarefas(); // Atualiza a lista
  }
}

// Função para mostrar todas as tarefas
function mostrarTarefas() {
  let novaLi = '';

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida ? 'done' : ''}" style="background-color: ${getCorPorPrioridade(item.prioridade)};" style="text-decoration-color: white;">
          <i class="fa fa-check" title="Concluir" onclick="concluirTarefa(${posicao})"></i>
          <p>${item.tarefa}</p>
          <i class="fa fa-trash" title="Excluir" onclick="deletarItem(${posicao})"></i>
          <i class="fa fa-edit" title="Editar" onclick="editarTarefa(${posicao})"></i>
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;
}

// Função para filtrar as tarefas de acordo com o texto da pesquisa
function pesquisarTarefas() {
  const textoBusca = inputTarefa.value.toLowerCase(); // Pega o texto digitado no input de pesquisa

  let novaLi = '';

  minhaListaDeItens.filter(item => item.tarefa.toLowerCase().includes(textoBusca)).forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida ? 'done' : ''}" style="background-color: ${getCorPorPrioridade(item.prioridade)};" style="text-decoration-color: white;">
          <i class="fa fa-check" title="Concluir" onclick="concluirTarefa(${posicao})"></i>
          <p>${item.tarefa}</p>
          <i class="fa fa-trash" title="Excluir" onclick="deletarItem(${posicao})"></i>
          <i class="fa fa-edit" title="Editar" onclick="editarTarefa(${posicao})"></i>
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;
}

// Função para pegar a cor da prioridade
function getCorPorPrioridade(prioridade) {
  switch (prioridade) {
    case 'alta':
      return 'red';
    case 'media':
      return '#ffa500';
    case 'baixa':
      return 'blue';
    default:
      return 'white';
  }
}

function abrirModal(mensagem, callbackSim) {
    const modal = document.getElementById('modal-confirmacao');
    const modalMensagem = document.getElementById('modal-mensagem');
    const botaoSim = document.getElementById('modal-sim');
    const botaoNao = document.getElementById('modal-nao');
  
    modalMensagem.textContent = mensagem;
    modal.style.display = 'flex';
  
    botaoSim.onclick = () => {
      callbackSim(); // Executa a função passada
      fecharModal();
    };
  
    botaoNao.onclick = fecharModal;
  }
  
  function fecharModal() {
    const modal = document.getElementById('modal-confirmacao');
    modal.style.display = 'none';
  }  

// Função para concluir a tarefa
function concluirTarefa(posicao) {
    abrirModal('Tem certeza de que deseja marcar esta tarefa como concluída?', () => {
      minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
      mostrarTarefas();
    });
}

// Função para deletar a tarefa
function deletarItem(posicao) {
    abrirModal('Tem certeza de que deseja excluir esta tarefa?', () => {
      minhaListaDeItens.splice(posicao, 1);
      mostrarTarefas();
    });
}

// Função para editar a tarefa
function editarTarefa(posicao) {
    // Prompt para editar a tarefa
    const novaTarefa = prompt('Edite a tarefa:', minhaListaDeItens[posicao].tarefa);
  
    if (novaTarefa !== null && novaTarefa.trim() !== '') {
      // Mostra o modal para confirmar a edição
      abrirModal(`Você editou a tarefa para: "${novaTarefa}". Está correto?`, () => {
        minhaListaDeItens[posicao].tarefa = novaTarefa; // Aplica a edição
        mostrarTarefas(); // Atualiza a lista
      });
    }
}

// Adicionar eventos
buttonAdicionar.addEventListener('click', adicionarNovaTarefa); // Adiciona tarefa
buttonPesquisar.addEventListener('click', pesquisarTarefas); // Pesquisa as tarefas com o botão "Pesquisar"