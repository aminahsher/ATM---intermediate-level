#! /usr/bin/env node

import inquirer from "inquirer";

 interface User{
    accountNumber:number
    pin: number
    balance:number
 }
 class ATM{
    private user:User[] | any[]=[]
    constructor(){
        this.user.push({accountNumber:1234, pin:1234, balance:4000})
        this.user.push({accountNumber:5678, pin:5678, balance:4000})
        this.user.push({accountNumber:7891, pin:7891, balance:4000})
        this.user.push({accountNumber:123, pin:123, balance:4000})
    }
    public authenication(accountNumber:number, pin:number):boolean {
        const user = this.user.find((user) => user.accountNumber === accountNumber && user.pin === pin)
        return user !== undefined
    }
    public checkBalance(accountNumber:number, pin:number){
        const user= this.user.find((user) => user.accountNumber === accountNumber && user.pin ===pin)
    return user.balance

    }
    public withDraw(accountNumber:number, pin: number, amount:number){
        const user = this.user.find((user) => user.accountNumber===accountNumber && user.pin ===pin);{
            if(user.balance >= amount ) {
                user.balance -= amount
                return true

            }else return false
        }
    }
    public deposite(accountNumber:number, amount:number){
        const user = this.user.find((user) => user.accountNumber === accountNumber);
        user.balance += amount
        return true;
    }
    public start(){
        inquirer.prompt([
            {
                type: "input",
                name:"userAccount",
                message: "Enter your account number"

        },
        {
            type: "input",
            name: "userpin",
            message:"Enter your Pin",
            mask: "*"
        },
         
    ])
    .then((answers)=> {
        const userAccount = parseInt(answers.userAccount)
        const pin = parseInt(answers.userpin)

        if(this.authenication(userAccount,pin)){
            inquirer.prompt([
                {
                    type: "list",
                    name:"actions",
                    message:"select the desired action",
                    choices:["check balance", "withdraw", "deposite","Exit"]
                },
            ])
            .then((answers) => {
                switch (answers.actions){
                    case "check balance":
                        console.log(`your balance is ${this.checkBalance(userAccount,pin)}`)
                        break;
                        case "withdraw":
                            inquirer.prompt([
                                {
                                    type:"input",
                                    name:"amount",
                                    message:"enter the amount to withdraw"
                                },
                            ])
                            .then ((answers)=>{
                                const amount = parseInt(answers.amount);
                                if(this.withDraw(userAccount,pin,amount)){
                                    console.log(`withdrawl successful! your new balance is ${this.checkBalance(userAccount,pin)}`)
                                } else  {console.log("insufficient Balance")}

                            });
                            break;
                            case "deposite":
                                inquirer.prompt([
                                    {
                                        type: "input",
                                        name:"amount",
                                        message:"enter the amount to deposite"
                                    },
                                ])
                                .then((answers)=> {
                                    const amount = parseInt(answers.amount);
                                    this.deposite(userAccount,amount);
                                    console.log(`deposite successful ${this.checkBalance(userAccount,pin)}`)
                                });
                                break;
                                case "Exit":
                                    console.log("Thankyou for using our BANK xyz")
                                    break;

                }
                

            });
        }else {
            console.log("invalid account number and pin")
        }
     })
    }
 }
 const atm = new ATM
 atm.start()
 