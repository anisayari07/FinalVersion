// Constants
const exchangeRate = 0.002332791 / 270.832017; // SOL per USDC

// DOM Elements
const sellAmountInput = document.getElementById('sellAmount');
const buyAmountInput = document.getElementById('buyAmount');
const halfMaxButton = document.getElementById('halfMax');
const swapButton = document.getElementById('swapButton');
const swapIcon = document.getElementById('swapIcon');
const sellTokenName = document.getElementById('sellTokenName');
const buyTokenName = document.getElementById('buyTokenName');
const sellTokenNameDisplay = document.getElementById('sellTokenNameDisplay');
const buyTokenNameDisplay = document.getElementById('buyTokenNameDisplay');
const sellTokenBalance = document.getElementById('sellTokenBalance');
const buyTokenBalance = document.getElementById('buyTokenBalance');

// Example Balances
let balances = {
    USDC: 1000.00,
    SOL: 0.00
};

// Update Buy Amount When Sell Amount Changes
sellAmountInput.addEventListener('input', () => {
    const sellAmount = parseFloat(sellAmountInput.value) || 0;
    const buyAmount = sellAmount * exchangeRate;
    buyAmountInput.value = buyAmount.toFixed(9);
});

// Half Max Button
halfMaxButton.addEventListener('click', () => {
    const maxAmount = balances[sellTokenName.textContent];
    sellAmountInput.value = (maxAmount / 2).toFixed(6);
    sellAmountInput.dispatchEvent(new Event('input'));
});

// Swap Functionality
function swapTokens() {
    // Swap token names
    const sellToken = sellTokenName.textContent;
    const buyToken = buyTokenName.textContent;
    sellTokenName.textContent = buyToken;
    buyTokenName.textContent = sellToken;
    sellTokenNameDisplay.textContent = buyToken;
    buyTokenNameDisplay.textContent = sellToken;

    // Swap token balances
    const sellBalance = balances[sellToken];
    const buyBalance = balances[buyToken];
    balances[sellToken] = buyBalance;
    balances[buyToken] = sellBalance;
    sellTokenBalance.textContent = `Balance: ${balances[sellTokenName.textContent]}`;
    buyTokenBalance.textContent = `Balance: ${balances[buyTokenName.textContent]}`;

    // Swap input values
    const sellAmount = sellAmountInput.value;
    const buyAmount = buyAmountInput.value;
    sellAmountInput.value = buyAmount;
    buyAmountInput.value = sellAmount;
}

// Swap Icon Click
swapIcon.addEventListener('click', () => {
    swapTokens();
    swapIcon.classList.toggle('rotate-up');
    swapIcon.classList.toggle('rotate-down');
});

// Swap Button Click
swapButton.addEventListener('click', () => {
    const sellAmount = parseFloat(sellAmountInput.value) || 0;
    const buyAmount = parseFloat(buyAmountInput.value) || 0;

    if (sellAmount > 0 && buyAmount > 0) {
        // Deduct sell amount and add buy amount to balances
        balances[sellTokenName.textContent] -= sellAmount;
        balances[buyTokenName.textContent] += buyAmount;

        // Update balance displays
        sellTokenBalance.textContent = `Balance: ${balances[sellTokenName.textContent]}`;
        buyTokenBalance.textContent = `Balance: ${balances[buyTokenName.textContent]}`;

        alert(`Swapped ${sellAmount} ${sellTokenName.textContent} for ${buyAmount} ${buyTokenName.textContent}`);
    } else {
        alert('Please enter a valid amount to swap.');
    }
});