const choices = ["pedra", "papel", "tesoura"];
const playerChoice = process.argv[2];
if (!playerChoice || !choices.includes(playerChoice)) {
    console.log("Escolha inválida. As opções são: pedra, papel e tesoura");
} else {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)]
    console.log(
        `Você escolheu ${playerChoice} e o computador escolheu ${computerChoice}`
    );
    if (playerChoice === computerChoice) {
        console.log("Empate!");
    } else if (
        (playerChoice === "pedra" && computerChoice === "tesoura") ||
        (playerChoice === "papel" && computerChoice === "pedra") ||
        (playerChoice === "tesoura" && computerChoice === "papel")
    ) {
        console.log("Você ganhou!");
    } else {
        console.log("Você perdeu!")
    }
}