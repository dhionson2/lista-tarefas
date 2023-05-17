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
      <h2 className="titulo-borda">Lista de Tarefas</h2>
      <div className="borda-preta">
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
        {tarefas.length > 0 && (
          <table className="tabela-tarefas">
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tarefas.map((tarefa, index) => (
                <tr key={index} className={index % 2 === 0 ? "linha-verde-claro" : "linha-verde-mais-claro"}>
                  <td>
                    <input
                      type="checkbox"
                      checked={tarefa.concluida}
                      onChange={() => handleConcluirTarefa(index)}
                      className="checkbox-concluir"
                    />
                    <span className={tarefa.concluida ? "tarefa-concluida" : ""} style={{ marginLeft: '20px' }}>{tarefa.texto}</span>
                  </td>
                  <td>
                    {!tarefa.concluida && (
                      <button onClick={() => removerTarefa(index)} className="botao-remover">
                        Remover
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ListaDeTarefas;
