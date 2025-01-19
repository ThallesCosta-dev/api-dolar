# Cotação do Dólar - Extensão para Chrome

![image](https://github.com/user-attachments/assets/43ec8623-26cf-4481-aeeb-a0f8351376ed)![image](https://github.com/user-attachments/assets/f03b2214-c9bb-48e1-b80c-4b59f9c034a1)




Uma extensão para Chrome que permite acompanhar em tempo real a cotação do dólar em relação ao Real (BRL) e Euro (EUR).

## 📋 Funcionalidades

- Acompanhamento em tempo real da cotação USD/BRL e USD/EUR
- Gráfico interativo com histórico dos últimos 7 dias
- Badge com valor atual da cotação
- Atualização automática a cada 30 segundos
- Interface intuitiva com tema escuro
- Animações suaves de transição
- Indicador de variação percentual

## 🚀 Instalação

1. Faça o download ou clone este repositório
2. Abra o Chrome e navegue até `chrome://extensions/`
3. Ative o "Modo do desenvolvedor" no canto superior direito
4. Clique em "Carregar sem compactação"
5. Selecione a pasta do projeto

## 🔧 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Chart.js para visualização de dados
- API AwesomeAPI para cotações

## 📦 Estrutura do Projeto

├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── background.js
├── chart.js
└── assets/
└── icons/

## 🔄 Como Funciona

A extensão utiliza a API AwesomeAPI para buscar dados de cotação em tempo real. O background script mantém os dados atualizados a cada 30 segundos, enquanto a interface do usuário exibe as informações de forma clara e intuitiva.

### Principais Componentes:

- **background.js**: Gerencia as requisições à API e mantém os dados atualizados
- **popup.js**: Controla a interface do usuário e o gráfico
- **popup.css**: Estilização da interface
- **chart.js**: Biblioteca para renderização do gráfico

## 🎨 Interface

- Tema escuro moderno
- Visualização clara da cotação atual
- Gráfico interativo com histórico
- Indicadores de variação com código de cores
- Seletor de moeda (BRL/EUR)

## 📈 API Utilizada

A extensão utiliza a [AwesomeAPI](https://docs.awesomeapi.com.br/) para obter:
- Cotações em tempo real
- Histórico de cotações
- Conversão entre diferentes moedas

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit de suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para reportar bugs ou sugerir novas funcionalidades, por favor abra uma [issue](https://github.com/ThallesCosta-dev/api-dolar/issues).
