'use strict';

const assert = require('assert');

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


if (typeof describe === 'function') {

    describe('#BankAccount', () => {
        it('should make the correct bank account', () => {
          const bankaccount = new BankAccount(555, "Lord")
          bankaccount.deposit(5000, "Mom")
          bankaccount.charge(3000, "Hotel")
          assert.equal(bankaccount.accountNumber, 555);
          assert.equal(bankaccount.owner, "Lord");
          assert.equal(bankaccount.balance(), 2000)
        });
    });

    describe('#SavingsAccount', () => {
        it('should make the correct savings account', () => {
          const savingsaccount = new SavingsAccount(999, "Mr. Know It All", 0.05)
          assert.equal(savingsaccount.accountNumber, 999);
          assert.equal(savingsaccount.owner, "Mr. Know It All");
          assert.equal(savingsaccount.interestRate, 0.05);
          savingsaccount.deposit(1000, "IRS Tax Refund")
          savingsaccount.accrueInterest(); // +50
          assert.equal(savingsaccount.balance(), 1050);
        });
    });

    describe('#SavingsAccount', () => {
        it('should end with the correct balance', () => {
          const savingsaccount = new SavingsAccount(999, "Mr. Know It All", 0.05) // have to redefine due to function scope
          savingsaccount.deposit(1000, "IRS Tax Refund")
          savingsaccount.accrueInterest(); // +50
          assert.equal(savingsaccount.balance(), 1050);
        });
    });
}