import React, { useState } from 'react';

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa !== '') {
      setTarefas([...tarefas, { texto: novaTarefa, concluida: false, subitens: [] }]);
      setNovaTarefa('');
    }
  };

  const adicionarSubitem = (index) => {
    setEditandoSubitem(true);
  };

  const removerTarefa = (index) => {
    setEditandoSubitem(false);
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  const handleConcluirTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida;
    setTarefas(novasTarefas);
  };

  const [editandoSubitem, setEditandoSubitem] = useState(false);
  const [novoSubitem, setNovoSubitem] = useState('');

  const adicionarNovoSubitem = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].subitens.push({ texto: novoSubitem });
    setTarefas(novasTarefas);
    setEditandoSubitem(false);
    setNovoSubitem('');
  };

  const cancelarEdicaoSubitem = () => {
    setEditandoSubitem(false);
    setNovoSubitem('');
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
                <React.Fragment key={index}>
                  <tr className={index % 2 === 0 ? "linha-verde-claro" : "linha-verde-mais-claro"}>
                    <td>
                      <input
                        type="checkbox"
                        checked={tarefa.concluida}
                        onChange={() => handleConcluirTarefa(index)}
                        className="checkbox-concluir"
                      />
                      <span className={tarefa.concluida ? "tarefa-concluida" : ""} style={{ marginLeft: '20px' }}>
                        {tarefa.texto}
                      </span>
                    </td>
                    <td>
                      {!tarefa.concluida && (
                        <>
                          <button onClick={() => adicionarSubitem(index)} className="botao-adicionar-subitem">
                            Adicionar Subitem
                          </button>
                          <button onClick={() => removerTarefa(index)} className="botao-remover">
                            Remover
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                  {tarefa.subitens.map((subitem, subindex) => (
                    <tr key={subindex} className="subitem">
                      <td colSpan="2">
                        <span>{subitem.texto}</span>
                      </td>
                    </tr>
                  ))}
                  {editandoSubitem && index === tarefas.length - 1 && (
                    <tr>
                      <td colSpan="2">
                        <input
                          type="text"
                          value={novoSubitem}
                          onChange={(e) => setNovoSubitem(e.target.value)}
                          placeholder="Digite um novo subitem"
                          className="input-subitem"
                        />
                        <button onClick={() => adicionarNovoSubitem(index)} className="botao-adicionar-subitem">
                          Adicionar
                        </button>
                        <button onClick={cancelarEdicaoSubitem} className="botao-cancelar-subitem">
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
  
  
  
}

export default ListaDeTarefas;
