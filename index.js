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

class SavingsAccount extends BankAccount {

    // B/c we are extending BankAccount, don't need to declare this.transactions in the constructor 
    // Will still have access to the methods (e.g. this.balance, this.charge, etc)

    constructor(accountNumber, owner, interestRate) {
      super(accountNumber, owner);
      this.interestRate = interestRate;
    }

    accrueInterest() {
        return this.transactions.push(new Transaction(this.balance() * this.interestRate, "Bank Interest")) 
    }
}

const myBankAccount = new BankAccount(1234567, "Andrea")
myBankAccount.deposit(100, "Company X")
myBankAccount.charge(20, "McDonalds")
console.log(myBankAccount)
console.log(myBankAccount.balance())


const mySavingsAccount = new SavingsAccount(98765, "Andrea", 0.02)
console.log(mySavingsAccount) //Unlike the browser, console.log logs the current value of a variable, not the value after the script is executed 
mySavingsAccount.deposit(200, "Andrea")
console.log(mySavingsAccount)
mySavingsAccount.accrueInterest()
console.log(mySavingsAccount)
