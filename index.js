class BankAccount {
    constructor(accountNumber, owner) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = [];
    }

    balance () {
        let amountsOnly = [];
        this.transactions.forEach(element => amountsOnly.push(element.amount))
        
        return amountsOnly.reduce((sum, num) => sum + num, 0)
    }

    deposit (amt, payee) {

        if (amt >= 0) {
            this.transactions.push(new Transaction(amt, payee))
        } else {
            console.log("Can't deposit a negative amount")
        } 
    }

    charge (amt, payee) {

        if (this.balance() - amt >= 0) {
            this.transactions.push(new Transaction(-1 * amt, payee)) // add a negative sign in front of amount
        } else {
            console.log("Can't make amount tip below 0")
        } 
    }
}

class Transaction {
    constructor(amount, payee) {
        this.date = Date.now();
        this.amount = amount;
        this.payee = payee;
    }
}

const myBankAccount = new BankAccount(1234567, "Andrea")
myBankAccount.deposit(100, "Company X")
myBankAccount.charge(20, "McDonalds")
console.log(myBankAccount)
console.log(myBankAccount.balance())
