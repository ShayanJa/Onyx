export function WeiToEther (wei) {
    return wei / Math.pow(10,18)

}

export function SatoshiToBTC ( satoshi ) {
    return satoshi / Math.pow(10,8)
}


export function GetCoinImage(coinName) {
    switch(coinName) {
        case "BTC": 
            return "https://www.cryptocompare.com/media/19633/btc.png?width=200"
        case "ETH": 
            return "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
        case "LTC":
            return "https://steemitimages.com/DQmQ3xaDyP23ghGgcrLxd8wsjjJuyqBqeFS9eye3Nx2KXEu/image.png"
        case "XRP":
            return "https://www.stickercrypto.com/assets/images/ripple_logo_x400.png"
    }
    
}

//https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_97-512.png

export function GetWalletAmount (wallets, newCoinPrices) {
    var newTotalValue = 0
    for (var i = 0; i < wallets.length; i++){
        var coinSymbol = wallets[i].Currency
        newTotalValue += newCoinPrices[coinSymbol]*wallets[i].Amount
    }
    return newTotalValue
}