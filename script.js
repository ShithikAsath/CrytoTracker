let cryptoData = [];

document.addEventListener('DOMContentLoaded', function () {
    getCryptoData();
});

function getCryptoData() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            cryptoData = data;
            displayCryptoData(cryptoData);
            renderChart(cryptoData);
        })
        .catch(error => console.error('Error fetching crypto data:', error));
}

function displayCryptoData(cryptoData) {
    const cryptoList = document.getElementById('cryptoList');
    cryptoList.innerHTML = ''; // Clear previous data
    cryptoData.forEach(crypto => {
        const cryptoItem = document.createElement('div');
        cryptoItem.classList.add('cryptoItem');
        cryptoItem.innerHTML = `
            <h2>${crypto.name} (${crypto.symbol.toUpperCase()})</h2>
            <p>Current Price: $${crypto.current_price.toFixed(2)}</p>
            <p>Market Cap: $${crypto.market_cap.toLocaleString()}</p>
            <p>24h Change: ${crypto.price_change_percentage_24h.toFixed(2)}%</p>
        `;
        cryptoList.appendChild(cryptoItem);
    });
}

function renderChart(cryptoData) {
    const cryptoLabels = cryptoData.map(crypto => crypto.symbol.toUpperCase());
    const cryptoPrices = cryptoData.map(crypto => crypto.current_price);

    const ctx = document.getElementById('cryptoChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cryptoLabels,
            datasets: [{
                label: 'Current Price (USD)',
                data: cryptoPrices,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

document.getElementById('searchInput').addEventListener('input', function (event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredCryptoData = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(searchValue) || crypto.symbol.toLowerCase().includes(searchValue));
    displayCryptoData(filteredCryptoData);
});
