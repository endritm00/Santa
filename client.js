var stripe = Stripe("your_public_key");
// The items the customer wants to buy
var purchase = {
  items: [{ id: "" }]
};

// Disable the button until we have Stripe set up on the page
// setTimeout(function(){
//   document.getElementById("d1").removeAttribute("disabled")
// },500);


document.getElementById("button-text").disabled = true;
fetch("/create-payment-intent", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    purchase,
  })

})
  .then(function (result) {
    return result.json();
  })
  .then(function (data) {
    var elements = stripe.elements();
    var style = {
      base: {
        color: "#32325d",
        padding:"30px",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    var card = elements.create("cardNumber", { style });
    var cvc = elements.create("cardCvc" , { style: style });
    var exp = elements.create("cardExpiry", { style: style });
    // Stripe injects an iframe into the DOM
    card.mount("#card-number");
    cvc.mount("#card-cvc");
    exp.mount("#card-expiry");
    
    card.on("change", function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.getElementById("button-text").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });
    var form = document.getElementById("payment-form");
    console.log(form)
    $("#submit-stripe-btn").on("click",()=>{
      payWithCard(stripe, card, data.clientSecret);
      
    })
    // form.addEventListener("submit", function (event) {
    //   event.preventDefault();
    //   // Complete payment when the submit button is clicked
    // });

  });
// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.

var payWithCard = function (stripe, card, clientSecret) {
  const first_name = document.getElementById('firstName').value;
  const last_name = document.getElementById('lastName').value;
  const name = `${first_name} ${last_name}`
  const email = document.getElementById('email').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const zip = document.getElementById('zip').value;
  const child_fName = document.getElementById('child-firstName').value;
  const child_lName = document.getElementById('child-lastName').value;
  //var child_list = `${child_fName} ${child_lName}`
  const child_city = document.getElementById('child-city').value;
  
  var arr = $('input[name=child-lastName], input[name=child-firstName]').map(function() {
    return this.value;
  }).get();
  console.log(arr)

  var child_name = JSON.stringify(arr);
  
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: name,
          email: email,
          address: {
            city: city,
            state: state,
            postal_code: zip,
            line1 : child_name,
            line2: child_city
          },          
        }      
      }
    })
    .then(function (result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        orderComplete(result.paymentIntent.id);        
      }
    });
};
/* ------- UI helpers ------- */
// Shows a success message when the payment is complete
var orderComplete = function (paymentIntentId) {
  loading(false);
  document
    .querySelector(".result-message a")
    .setAttribute(
      "href",
      "https://dashboard.stripe.com/test/payments/" + paymentIntentId
    );
  document.querySelector(".result-message").classList.remove("hidden");
  document.getElementById("button-text").disabled = true;
};
//Show the customer the error from Stripe if their card fails to charge
var showError = function (errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function () {
    errorMsg.textContent = "";
  }, 4000);
};
// Show a spinner on payment submission
var loading = function (isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.getElementById("button-text").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.getElementById("button-text").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};

function hide() {

  var x = document.getElementById("children");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

}


function changeWrapper(){
  $(".form1").hide();
  $(".form2").show();

}