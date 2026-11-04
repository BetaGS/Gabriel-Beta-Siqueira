import React, { useCallback, useEffect, useRef, useState } from 'react';
import './BootScreen.css';

// Animação de abertura: simula um terminal iniciando o portfólio.
// Aparece 1x por sessão, pode ser pulada (clique / qualquer tecla) e é ignorada com "animações reduzidas".
const COMMAND = 'iniciar portfolio --usuario gabriel';

const LOGS = [
  { kind: 'info', text: 'Iniciando sistema...', wait: 450 },
  { kind: 'ok', text: 'Carregando interface em React', wait: 380 },
  { kind: 'ok', text: 'Montando cena 3D', wait: 380 },
  { kind: 'ok', text: 'Ativando fundo interativo', wait: 380 },
  { kind: 'ok', text: 'Iniciando módulos de back-end', wait: 380 },
  { kind: 'done', text: 'Tudo pronto! Abrindo portfólio...', wait: 500 },
];

const KEY = 'boot-seen';

const shouldShow = () => {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(KEY) !== '1';
  } catch {
    return true;
  }
};

const BootScreen = () => {
  const [visible, setVisible] = useState(shouldShow);
  const [leaving, setLeaving] = useState(false);
  const [typed, setTyped] = useState('');
  const [lines, setLines] = useState([]);
  const timers = useRef([]);

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLeaving(true);
    const id = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* sem storage */
      }
      setVisible(false);
    }, 650);
    timers.current.push(id);
  }, []);

  // Sequência: digita o comando, depois mostra cada linha de log
  useEffect(() => {
    if (!visible) return undefined;

    let i = 0;
    const typeNext = () => {
      i += 1;
      setTyped(COMMAND.slice(0, i));
      if (i < COMMAND.length) {
        later(typeNext, 38);
      } else {
        later(() => showLog(0), 450);
      }
    };
    const showLog = (n) => {
      setLines(LOGS.slice(0, n + 1));
      if (n < LOGS.length - 1) later(() => showLog(n + 1), LOGS[n + 1].wait);
      else later(finish, 900);
    };
    later(typeNext, 400);

    const onKey = () => finish();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden'; // trava a rolagem durante a abertura

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [visible, finish]);

  if (!visible) return null;

  const progress = Math.round((lines.length / LOGS.length) * 100);
  const typing = typed.length < COMMAND.length;

  return (
    <div
      className={`boot ${leaving ? 'boot-leaving' : ''}`}
      onClick={finish}
      role="presentation"
      aria-hidden="true"
    >
      <div className="boot-window">
        <div className="boot-bar">
          <span className="boot-dot red" />
          <span className="boot-dot yellow" />
          <span className="boot-dot green" />
          <span className="boot-title">gabriel@portfolio: ~</span>
        </div>
        <div className="boot-body">
          <p className="boot-line">
            <span className="boot-prompt">gabriel@portfolio:~$</span> {typed}
            {typing && <span className="boot-caret" />}
          </p>
          {lines.map((line) => (
            <p key={line.text} className={`boot-line boot-${line.kind}`}>
              {line.kind === 'ok' && <span className="boot-tag">[ OK ]</span>}
              {line.kind === 'done' && <span className="boot-tag">✔</span>}
              {line.text}
            </p>
          ))}
          {!typing && lines.length < LOGS.length && <span className="boot-caret" />}
          <div className="boot-progress" aria-hidden="true">
            <div className="boot-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="boot-percent">{progress}%</p>
        </div>
      </div>
      <p className="boot-skip">Clique ou pressione qualquer tecla para pular</p>
    </div>
  );
};

export default BootScreen;
