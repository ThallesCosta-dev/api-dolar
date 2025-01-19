let currentPrice = '';
let currentCurrency = 'BRL';
let previousPrice = null;

function formatCompactNumber(number) {
    number = Math.round(number);
    if (number >= 1000) {
        if (number < 100000) {
            return (number/1000).toFixed(1) + 'k';
        }
        return Math.floor(number/1000) + 'k';
    }
    return number.toString();
}

function calculatePriceChange(currentPrice, previousPrice) {
    if (!previousPrice) return '+0.00%';
    const change = ((currentPrice - previousPrice) / previousPrice) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
}

async function fetchPrice() {
    try {
        // Usa a API da Awesome API para buscar USD-BRL
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
        const data = await response.json();
        
        let price = Number(data.USDBRL.bid);
        
        // Se for EUR, converte usando USD-EUR
        if (currentCurrency === 'EUR') {
            const eurResponse = await fetch('https://economia.awesomeapi.com.br/json/last/USD-EUR');
            const eurData = await eurResponse.json();
            price = Number(eurData.USDEUR.bid);
        }
        
        currentPrice = price.toLocaleString('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
            useGrouping: true
        });
        
        chrome.action.setBadgeText({ text: price.toFixed(2) });
        chrome.action.setBadgeBackgroundColor({ color: '#2B823A' });
        
        const priceChange = calculatePriceChange(price, previousPrice);
        previousPrice = price;
        
        chrome.storage.local.set({
            currentPrice,
            priceChange,
            timestamp: Date.now()
        });
        
        setTimeout(fetchPrice, 30000); // Atualiza a cada 30 segundos
    } catch (error) {
        console.error('Erro ao buscar cotação:', error);
        setTimeout(fetchPrice, 30000);
    }
}

chrome.storage.onChanged.addListener((changes) => {
    if (changes.currency) {
        currentCurrency = changes.currency.newValue;
        previousPrice = null;
        fetchPrice();
    }
});

fetchPrice(); 