// START

// CHECKING LOCAL STROAGE FOR PEOPLE KEY 
var inLocalStorage = localStorage.getItem('People');
// IF THE KEY PEOPLE DOESNT EXIST IN LOCAL STORAGE THEN SET A NEW LOCAL STORAGE WITH KEY PEOPLE AND VALUE PERSON
if (inLocalStorage == null) {
    let person = [
    ]

    // PARSING THE ARRAY AS A STRING AND SAVING THE ARRAY IN LOCAL STORAGE 
    localStorage.setItem("People", JSON.stringify(person))

}




// CHECKING IF THE KEY 'SALES' EXISTS IN LOCAL STORAGE
// IF IT DOESNT EXIST A NEW VARIABLE IS CREATED AND SAVED TO LOCAL STORAGE WITH THE KEY 'SALES'
var salesInLocalStorage = localStorage.getItem("Sales")
if (salesInLocalStorage == null) {
    var sales = []
    localStorage.setItem("Sales", JSON.stringify(sales))
}


// FOR LOAN ORDER
// FINDING THE LOAN ORDER DATA IN LOCAL STORAGE AND STORING IT IN A VARIABLE
var existingLoanOrders = localStorage.getItem("Loan Orders")
existingLoanOrders = JSON.parse(existingLoanOrders)
// CHECKING IF THERE ARE ANY EXISTING LOAN ORDERS

if (existingLoanOrders == null) {

    var customersLoanOrder = [
    ]
    localStorage.setItem("Loan Orders", JSON.stringify(customersLoanOrder))

}







// TO CREATE NEW USER

function addUser() {
    // WHEN BUTTON IS CLICKED GET PEOPLE FROM LOCAL STORAGE 
    var existingUsers = localStorage.getItem('People')
    // THE OBJECT IS SAVED IN LOCAL STORAGE AS STRING SO IT SHOULD BE PARSED TO AN OBJECT
    existingUsers = JSON.parse(existingUsers)
    // GETTING NEW USER DATA FROM FORM
    var newUsername = document.getElementById('newname').value
    var newPassword = document.getElementById('newpassword').value

    // ADDING NEW USER AND SAVING IN ALREADY EXISTING LOCAL STORAGE 
    var newUser = { username: newUsername, password: newPassword }
    // CHECKING IF A USERNAME AND PASSWORD WAS INPUTED
    if (newUsername && newPassword) {
        existingUsers.push(newUser)
        localStorage.setItem("People", JSON.stringify(existingUsers))
        proceedtologin.innerHTML = "Proceed to login"
    } else {
        alert("Enter required information")
    }

    // THIS IS A JS FUNCTION TO RELOAD THE PAGE
    location.assign("login.html")

}

// LOGIN EXISTING USER
// CHANGE DATA IN LOCAL STORAGE TO OBJECT USING JSON PARSE 
inLocalStorage = JSON.parse(inLocalStorage)

function login() {

    // GET USER INPUT INFO FOR LOGIN
    var inputUsername = document.getElementById('username').value
    var inputPassword = document.getElementById('password').value

    // LOOPING THROUGH EVERY USER SAVED IN LOCAL STORAGE 
    for (let i = 0; i < inLocalStorage.length; i++) {
        // IF INPUTED USERNAME IS FOUND IN LOCAL STOGAGE THEN USER IS LOGGED IN
        if (inputUsername == inLocalStorage[i].username && inputPassword == inLocalStorage[i].password) {

            location.assign("homepage.html")
            return
        }

    }
    alert("INCORRECT CRIDENTIALS")
    location.reload()
}





// FUNCTION TO ADD LOAN ORDER AFTER BUTTON IS CLICKED
function loanOrder() {

    var existingLoanOrders = localStorage.getItem("Loan Orders")
    existingLoanOrders = JSON.parse(existingLoanOrders)

    salesInLocalStorage = JSON.parse(localStorage.getItem("Sales"))

    // THIS IS TO GET THE DATE 
    var date = new Date()
    var currentYear = date.getFullYear()
    var currentMonth = date.getMonth()
    var currentDay = date.getDate()
    var hours = date.getHours()
    var mins = date.getMinutes()
    var secs = date.getSeconds()

    // GETTING THE DATA FROM THE FORM IN THE LOAN ORDER PAGE
    var Name = document.getElementById('customerName').value
    var tel = document.getElementById('number').value
    var ammountNeeded = document.getElementById('ammount').value
    var customerAddress = document.getElementById('address').value



    // CREATING A NEW LOAN ORDER OBJECT WITH DATA FROM THE FORM
    var newLoanOrder = {
        customerName: Name, ammount: ammountNeeded,
        address: customerAddress, phoneNumber: tel,
        year: currentYear, month: currentMonth,
        day: currentDay, hour: hours, min: mins, sec: secs
    }

    // IF USER HAS PAID HIS DEBT HE CAN TAKE ANOTHER LOAN 
    for (let i = 0; i < salesInLocalStorage.length; i++) {

        if (salesInLocalStorage[i].Name.includes(Name) && salesInLocalStorage[i].debtLeft == 0) {
            existingLoanOrders.push(newLoanOrder)
            existingLoanOrders = JSON.stringify(existingLoanOrders)
            localStorage.setItem("Loan Orders", existingLoanOrders)
            location.reload()
            return
        }

    }


    // IF CUSTOMER STILL HAS A DEBT

    for (let i = 0; i < salesInLocalStorage.length; i++) {

        if (salesInLocalStorage[i].Name.includes(Name) && salesInLocalStorage[i].debtLeft > 1 && salesInLocalStorage[i].debtLeft != 0) {

            debtAlert.innerHTML = "You have an unpaid debt <br> Kindly clear your debt in order to take a new loan "
            return

        }

    }



    // CHECKING IF SOME SPECIFIC DATA IS INPUTED , IF YES  THEN LOAN ORDER IS MADE AND SAVED IN LOCAL STORAGE AS A STRING
    if (Name, tel, ammountNeeded, customerAddress) {
        existingLoanOrders.push(newLoanOrder)
        existingLoanOrders = JSON.stringify(existingLoanOrders)
        localStorage.setItem("Loan Orders", existingLoanOrders)
    }
    else {
        alert("you must fill in the information required")
    }


    // RELOAD PAGE
    location.reload()


}



// DIISPLAYING LOAN ORDERS ON A TABLE
function displayLoanOrders() {
    var existingLoanOrders = localStorage.getItem("Loan Orders")
    existingLoanOrders = JSON.parse(existingLoanOrders)
    document.getElementById("loanCount").innerHTML = existingLoanOrders.length
    // THIS IS TO SHOW THE AMOUNT OF LOAN ORDERS CURRENTLY

    // FOR LOOP TO LOOP THROUGH ALL EXISTING LOAN ORDERS 
    for (let i = 0; i < existingLoanOrders.length; i++) {
        var ampm = ""
        if (existingLoanOrders[i].hour > 12) {
            ampm = "PM"
        } else {
            ampm = "AM"
        }

        // THIS IS THE TABLE ON WHICH THE LOAN ORDERS WILL BE DISPLAYED
        tablebody.innerHTML += '<tr><td>' + existingLoanOrders[i].customerName + ' </td> <td>'
            + existingLoanOrders[i].phoneNumber + '</td><td class ="amtdata">'
            + existingLoanOrders[i].ammount + ' ' + ' FCFA</td><td>'
            + existingLoanOrders[i].address + '</td><td> '
            + existingLoanOrders[i].day + '-' + '0' + existingLoanOrders[i].month + '-'
            + existingLoanOrders[i].year + '</td> <td> ' + existingLoanOrders[i].hour + ':'
            + existingLoanOrders[i].min + ' ' + ampm + '   </td> </tr>'

    }
}

// DELETING  LOAN ORDERs
function deleteOrders() {
    localStorage.removeItem("Loan Orders")
    location.reload()

}



// FUNCTION TO PERFORM A SALE AFTER BUTTON IS CLICKED

function performSales() {

    var date = new Date()
    var currentYear = date.getFullYear()
    var currentMonth = date.getMonth()
    var currentDay = date.getDate()
    var hours = date.getHours()
    var mins = date.getMinutes()
    var secs = date.getSeconds()


    var existingSales = localStorage.getItem("Sales")
    existingSales = JSON.parse(existingSales)

    var sellerName = document.getElementById("sellerName").value
    var sellerProduct = document.getElementById("sellerProduct").value
    var productAmmount = document.getElementById("productAmmount").value



    // FOR LOOP TO LOOP THROUGH ALL LOAN ORDERS MADE MADE
    for (let i = 0; i < existingLoanOrders.length; i++) {


        if (sellerName == existingLoanOrders[i].customerName && productAmmount < existingLoanOrders[i].ammount) {

            var remainingDebt = existingLoanOrders[i].ammount - productAmmount

        }
        else if (sellerName == existingLoanOrders[i].customerName && productAmmount == existingLoanOrders[i].ammount) {
            var remainingDebt = productAmmount - existingLoanOrders[i].ammount

        }
        else if (sellerName == existingLoanOrders[i].customerName && productAmmount > existingLoanOrders[i].ammount) {
            // var zero = 1 - 1

            var remainingDebt = existingLoanOrders[i].ammount - productAmmount

        }


    }



    // FOR LOOP TO LOOP THROUGH ALL SALES MADE
    for (let i = 0; i < existingSales.length; i++) {

        if (sellerName == existingSales[i].Name && existingSales[i].debtLeft > 0 && productAmmount <= existingSales[i].debtLeft) {

            var remainingDebt = existingSales[i].debtLeft - productAmmount


        }

        else if (sellerName == existingSales[i].Name && productAmmount > existingSales[i].debtLeft) {

            var zero = 1 - 1
            var remainingDebt = zero
        }

    }





    // If the arguments in the two loops are not furfilled , the code continues and a sale is made 

    var newSale = {
        Name: sellerName, prodduct: sellerProduct,
        ammount: productAmmount, debtLeft: remainingDebt,
        year: currentYear, month: currentMonth,
        day: currentDay, hour: hours, min: mins, sec: secs
    }

    existingSales.push(newSale)
    existingSales = JSON.stringify(existingSales)
    localStorage.setItem("Sales", existingSales)



    location.reload()

}



function previewSales() {
    var existingSales = localStorage.getItem("Sales")
    existingSales = JSON.parse(existingSales)

    for (let i = 0; i < existingSales.length; i++) {
        var ampm = ""
        if (existingSales[i].hour > 12) {
            ampm = "PM"
        } else {
            ampm = "AM"
        }

        salesTable.innerHTML += '<tr> <td>' + existingSales[i].Name + '</td><td>'
            + existingSales[i].prodduct + '</td><td  class=prodCost >'
            + existingSales[i].ammount + ' FCFA</td> <td class=debtdata>'
            + existingSales[i].debtLeft + ' FCFA</td>  <td> '
            + existingSales[i].day + '-' + '0' + existingSales[i].month + '-'
            + existingSales[i].year + '</td> <td> ' + existingSales[i].hour + ':0'
            + existingSales[i].min + ' ' + ampm + '   </td> </tr>'
            
    }

    document.getElementById("salesCount").innerHTML = existingSales.length

}

function deleteSales() {
    localStorage.removeItem("Sales")
    location.reload()
}



function logoutUser() {
    location.assign("login.html")
}