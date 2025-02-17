let chart;
let currentCurrency = 'BRL';

async function fetchHistoricalData() {
    const days = 7; // Últimos 7 dias
    const today = new Date();
    const dates = [];
    const prices = [];

    // Busca dados históricos da API
    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        
        try {
            const currency = currentCurrency === 'BRL' ? 'USD-BRL' : 'USD-EUR';
            const response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${currency}/?start_date=${formattedDate.replace(/-/g, '')}&end_date=${formattedDate.replace(/-/g, '')}`);
            const data = await response.json();
            
            if (data && data.length > 0) {
                dates.unshift(formattedDate);
                prices.unshift(parseFloat(data[0].bid));
            }
        } catch (error) {
            console.error('Erro ao buscar dados históricos:', error);
        }
    }

    return { dates, prices };
}

async function updateChart() {
    const { dates, prices } = await fetchHistoricalData();
    
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `USD/${currentCurrency}`,
                data: prices,
                borderColor: '#2B823A',
                backgroundColor: 'rgba(43, 130, 58, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1a2632',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#2c3b4a',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(4)} ${currentCurrency}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        color: '#2c3b4a'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#2c3b4a'
                    },
                    ticks: {
                        color: 'white',
                        callback: function(value) {
                            return value.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

// Atualiza o preço atual
function updateCurrentPrice() {
    chrome.storage.local.get(['currentPrice', 'priceChange'], function(data) {
        if (data.currentPrice) {
            document.getElementById('price').textContent = data.currentPrice;
            
            const priceChangeElement = document.getElementById('price-change');
            priceChangeElement.textContent = data.priceChange;
            priceChangeElement.className = parseFloat(data.priceChange) >= 0 ? 'positive' : 'negative';
        }
    });
}

// Atualiza a moeda selecionada
document.getElementById('currency').addEventListener('change', function(e) {
    currentCurrency = e.target.value;
    document.querySelector('.currency-type').textContent = currentCurrency;
    chrome.storage.local.set({ currency: currentCurrency });
    updateChart();
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('currency', function(data) {
        if (data.currency) {
            currentCurrency = data.currency;
            document.getElementById('currency').value = currentCurrency;
            document.querySelector('.currency-type').textContent = currentCurrency;
        }
    });
    
    updateChart();
    updateCurrentPrice();
    
    // Atualiza o preço a cada 30 segundos
    setInterval(updateCurrentPrice, 30000);
});