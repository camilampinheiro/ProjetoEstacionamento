const precoInicial = 20;
const precoAdicional = 5;
const m = 100;
const n = 100;

const entradaBtn = document.getElementById('entrada-btn');
const saidaBtn = document.getElementById('saida-btn');
const entradaForm = document.getElementById('entrada-form');
const saidaForm = document.getElementById('saida-form');
const submitEntradaBtn = document.getElementById('submit-entrada');
const submitSaidaBtn = document.getElementById('submit-saida');
const messagesDiv = document.getElementById('messages');

entradaBtn.addEventListener('click', () => {
    entradaForm.style.display = 'block';
    saidaForm.style.display = 'none';
});

saidaBtn.addEventListener('click', () => {
    entradaForm.style.display = 'none';
    saidaForm.style.display = 'block';
});

submitEntradaBtn.addEventListener('click', () => {
    const placa = document.getElementById('placa').value;
    const horaEntrada = document.getElementById('hora-entrada').value;
    colocarVeiculo(placa, horaEntrada);
});

submitSaidaBtn.addEventListener('click', () => {
    const placa = document.getElementById('placa-saida').value;
    const horaSaida = document.getElementById('hora-saida').value;
    liberarVeiculo(placa, horaSaida);
});

function showMessage(message) {
    const msg = document.createElement('p');
    msg.textContent = message;
    messagesDiv.appendChild(msg);
    setTimeout(() => messagesDiv.removeChild(msg), 5000);  
}

function calcularValorEstacionamento(horasEntrada, minutosEntrada, horasSaida, minutosSaida) {
    const minutos = (horasSaida * 60 + minutosSaida) - (horasEntrada * 60 + minutosEntrada);
    if (minutos <= 15) {
        return 0;
    }

    const horas = Math.ceil(minutos / 60);
    if (horas <= 3) {
        return precoInicial;
    } else {
        return precoInicial + ((horas - 3) * precoAdicional);
    }
}

const estacionamento = Array(100).fill().map(() => Array(100).fill(null));

function colocarVeiculo(placa, horaEntrada) {
    const estado = verificarEstadoPlaca(placa);
    if (estado === "Placa inválida") {
        showMessage("O veículo não possui placa válida");
        return;
    }
    
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            if (estacionamento[i][j] === null) {
                estacionamento[i][j] = { "placa": placa, "horaEntrada": horaEntrada };
                showMessage("Veículo entrou no estacionamento");
                return;
            }
        }
    }
    showMessage("Estacionamento lotado");
}

function liberarVeiculo(placa, horaSaida) {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            if (estacionamento[i][j] && estacionamento[i][j].placa === placa) {
                const hora = estacionamento[i][j].horaEntrada;
                const horasEntrada = parseInt(hora.substring(0, 2));
                const minutosEntrada = parseInt(hora.substring(3, 5));
                const horasSaida = parseInt(horaSaida.substring(0, 2));
                const minutosSaida = parseInt(horaSaida.substring(3, 5));
                const valor = calcularValorEstacionamento(horasEntrada, minutosEntrada, horasSaida, minutosSaida);
                const estado = verificarEstadoPlaca(placa);

                showMessage(`Veículo ${placa} do estado ${estado} liberado. Tempo total: ${Math.ceil(
                    (horasSaida * 60 + minutosSaida - horasEntrada * 60 - minutosEntrada) / 60)} horas. Valor a ser cobrado: R$ ${valor.toFixed(2)}`);

                estacionamento[i][j] = null;
                return;
            }
        }
    }
    showMessage("Veículo não encontrado");
}

function verificarEstadoPlaca(placa) {
    const regex = /^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/;
    if (!regex.test(placa)) {
        return "Placa inválida";
    }

    const letras = placa.substring(0, 3).toUpperCase();
    if (letras >= "MZN" && letras <= "NAG") {
        return "Acre";
    } else if (letras >= "NBB" && letras <= "NEH") {
        return "Rondônia";
    } else if (letras >= "NOI" && letras <= "NPB") {
        return "Amazonas";
    } else {
        return "Nenhum dos estados listados";
    }
}













