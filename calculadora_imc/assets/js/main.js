const form = document.querySelector("#formulario");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const inputPeso = evento.target.querySelector("#peso");
  const inputAltura = evento.target.querySelector("#altura");

  let peso = inputPeso.value;
  let altura = inputAltura.value;

  if (peso.search(",") !== -1) {
    peso = Number(peso.replace(/,/, "."));
    console.log(peso);
  } else {
    peso = Number(inputPeso.value);
  }

  if (altura.search(",") !== -1) {
    altura = Number(altura.replace(/,/, "."));
    console.log(altura);
  } else {
    altura = Number(inputAltura.value);
  }

  if ((!peso && !altura) || (peso < 0 && altura < 0)) {
    setResultado(`Peso e altura inválidos!`, false);
    return;
  } else if (!peso || peso < 0) {
    setResultado(`Peso inválido!`, false);
    return;
  } else if (!altura || altura < 0) {
    setResultado("Altura inválida!", false);
    return;
  }

  const imc = getImc(peso, altura);
  const percentualImc = getPercentualImc(imc);

  const msg = `Seu IMC é ${imc} (${percentualImc}).`;

  setResultado(msg, true);
});

/*
Menos do que 18,5 Abaixo do peso
Entre 18,5 e 24,9 Peso normal
Entre 25 e 29,9 Sobrepeso
Entre 30 e 34,9 Obesidade grau 1
Entre 35 e 39,9 Obesidade grau 2
Mais do que 40 Obesidade grau 3
*/

function getPercentualImc(imc) {
  const percentual = [
    "Abaixo do peso",
    "Peso normal",
    "Sobrepeso",
    "Obesidade grau 1",
    "Obesidade grau 2",
    "Obesidade grau 3",
  ];

  if (imc >= 39.9) return percentual[5];

  if (imc >= 34.9) return percentual[4];

  if (imc >= 29.9) return percentual[3];

  if (imc >= 24.9) return percentual[2];

  if (imc >= 18.5) return percentual[1];

  if (imc < 18.5) return percentual[0];
}

function getImc(peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);
}

function criaParagrafo() {
  const p = document.createElement("p");
  return p;
}

function setResultado(msg, isValid) {
  const resultado = document.querySelector("#resultado");
  resultado.innerHTML = "";
  const p = criaParagrafo();

  if (isValid) {
    p.classList.add("paragrafo-resultado");
  } else {
    p.classList.add("bad");
  }

  p.innerHTML = `<p><strong>Resultado:</strong></p></br>${msg}`;
  resultado.appendChild(p);
}
