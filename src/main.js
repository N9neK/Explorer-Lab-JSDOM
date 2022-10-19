import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    elo: ["#00a4e0", "#ef4123"],
    cielo: ["#00AEEF", "#333333"],
    default: ["black", "gray"]
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

// setCardType("bb")

//código de segurança/cvc/security code
const securityCode = document.getElementById("security-code")
const securityCodePattern = {
  mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

//data de validade do cartão/expiração
const expirationDate = document.getElementById("expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

//number card/número do cartão
const cardNumber = document.getElementById("card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^6\d{0,15}/,
      cardtype: "elo"
    },
    // {
    //   mask: "0000 0000 0000 0000",
    //   cardtype: "cielo"
    // },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default"
    }
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")

    const foundCardMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    console.log(foundCardMask)

    return foundCardMask
  }
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
