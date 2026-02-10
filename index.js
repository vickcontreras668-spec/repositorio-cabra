const bill = document.getElementById("bill");
const people = document.getElementById("people");
const tipButtons = document.querySelectorAll(".tips button");
const customTip = document.getElementById("customTip");
const tipAmount = document.getElementById("tipAmount");
const total = document.getElementById("total");
const reset = document.getElementById("reset");
const error = document.getElementById("error");

let tipValue = 10;


tipButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tipButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    tipValue = Number(btn.dataset.tip);
    customTip.value = "";
    calculate();
  });
});


customTip.addEventListener("input", () => {
  tipButtons.forEach(b => b.classList.remove("active"));
  tipValue = Number(customTip.value);
  calculate();
});


[bill, people].forEach(input => {
  input.addEventListener("input", calculate);
});

function calculate() {
  const billValue = parseFloat(bill.value);
  const peopleValue = parseInt(people.value);

  
  if (isNaN(billValue) || isNaN(peopleValue)) {
    tipAmount.textContent = "$0.00";
    total.textContent = "$0.00";
    error.style.display = "none";
    return;
  }

  
  if (peopleValue <= 0) {
    error.style.display = "inline";
    tipAmount.textContent = "$0.00";
    total.textContent = "$0.00";
    return;
  } else {
    error.style.display = "none";
  }

  const tip = (billValue * tipValue) / 100;
  const tipPerPerson = tip / peopleValue;
  const totalPerPerson = (billValue + tip) / peopleValue;

  tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
  total.textContent = `$${totalPerPerson.toFixed(2)}`;
}


reset.addEventListener("click", () => {
  bill.value = "";
  people.value = "";
  customTip.value = "";
  tipValue = 10;

  tipButtons.forEach(b => b.classList.remove("active"));
  tipButtons[1].classList.add("active");

  error.style.display = "none";
  tipAmount.textContent = "$0.00";
  total.textContent = "$0.00";
});
