import React, { useState } from 'react';

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa !== '') {
      setTarefas([...tarefas, { texto: novaTarefa, concluida: false }]);
      setNovaTarefa('');
    }
  };

  const removerTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  const handleConcluirTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida;
    setTarefas(novasTarefas);
  };

  return (
    <div className="container">
      <h2 className="titulo">Lista de Tarefas</h2>
      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        placeholder="Digite uma nova tarefa"
        className="input-tarefa"
      />
      <button onClick={adicionarTarefa} className="botao-adicionar">
        Adicionar Tarefa
      </button>
      <ul className="lista-tarefas">
        {tarefas.map((tarefa, index) => (
          <li key={index} className={index % 2 === 0 ? "linha-verde-claro" : "linha-verde-mais-claro"}>
            <div className="linha-conteudo">
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => handleConcluirTarefa(index)}
                className="checkbox-concluir"
              />
              <span className={tarefa.concluida ? "tarefa-concluida" : ""} style={{ marginLeft: '20px' }}>{tarefa.texto}</span>
              {!tarefa.concluida && (
                
                <button onClick={() => removerTarefa(index)} className="botao-remover">
                  Remover
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeTarefas;
