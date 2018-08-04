export function WeiToEther (wei) {
    return wei / Math.pow(10,18)

}


export function GetCoinImage(coinName) {
    switch(coinName) {
        case "BTC": 
            return "https://www.cryptocompare.com/media/19633/btc.png?width=200"
        case "ETH": 
            return "https://yt3.ggpht.com/a-/AJLlDp2s1f7aZqtjMquR1N8q3ZHeTOmhFz0vaGASFg=s900-mo-c-c0xffffffff-rj-k-no"
        case "LTC":
            return "https://steemitimages.com/DQmQ3xaDyP23ghGgcrLxd8wsjjJuyqBqeFS9eye3Nx2KXEu/image.png"
        case "XRP":
            return "https://themerkle.com/wp-content/uploads/2015/12/Ripple-XRP.png"
    }
    
}

//https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_97-512.png

export function GetWalletAmount (wallets, newCoinPrices) {
    var newTotalValue = 0
    // var wallets = self.state.wallets
    for (var i = 0; i < wallets.length; i++){
        var coinSymbol = wallets[i].Currency
        newTotalValue += newCoinPrices[coinSymbol]*wallets[i].Amount
    }
    console.log(newTotalValue)
    return newTotalValue
}