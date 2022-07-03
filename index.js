const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const transactionPayments = [
    {
        id:1,  
        Amount: 12580,
        Currency: "NGN",
        CustomerEmail: "anon8@customers.io",
        SplitInfo: [
            {
                SplitType: "FLAT",
                SplitValue: 45,
                SplitEntityId: "LNPYACC0019"
            },
            {
                SplitType: "RATIO",
                SplitValue: 3,
                SplitEntityId: "LNPYACC0011"
            },
            {
                SplitType: "PERCENTAGE",
                SplitValue: 3,
                SplitEntityId: "LNPYACC0015"
            }
        ]
    },
    {
        id:1305,  
        Amount: 50580,
        Currency: "NGN",
        CustomerEmail: "anon8@customers.io",
        SplitInfo: [
            {
                SplitType: "FLAT",
                SplitValue: 45,
                SplitEntityId: "LNPYACC0019"
            },
            {
                SplitType: "RATIO",
                SplitValue: 3,
                SplitEntityId: "LNPYACC0011"
            },
            {
                SplitType: "PERCENTAGE",
                SplitValue: 3,
                SplitEntityId: "LNPYACC0015"
            }
        ]
    },

];

app.get('/', (req, res) => {
    res.send("Hello Lannister !!!");
});

app.get('/split-payments/compute', (req, res) => {
    res.send(transactionPayments)
})

app.get('/split-payments/compute/:id', (req, res) =>{
    const singletransaction = transactionPayments.find(transaction => transaction.id === parseInt(req.params.id));
    if (!singletransaction) res.status(404).send('The transaction payment with the given ID was not found.');
    res.send(singletransaction);
})


app.post('/split-payments/compute',(req, res) =>{
    const schema = {
        Amount: Joi.number().min(1).required(),
        CustomerEmail:Joi.string().min(5).required(),
        SplitInfo: Joi.array().items(
            Joi.object({
              SplitType: Joi.string().min(3).required(),
              SplitValue: Joi.number().min(1).required(),
              SplitEntityId:`LNPYACC + ${Joi.number()}`
            })
          )
    }

     const result = Joi.validate(req.body, schema);
    if(result.error){
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const transaction = {
        id: transactionPayments.length + 1,
        Amount: req.body.Amount,
        Currency: "NGN",
        CustomerEmail: req.body.CustomerEmail,
        // SplitInfo: req.body.SplitInfo,
        SplitInfo: [
            {
                SplitType: req.body.SplitInfo.SplitType,
                SplitValue: req.body.SplitInfo.SplitValue,
                SplitEntityId: "LNPYACC0019"
            },
            {
                SplitType: "RATIO",
                SplitValue: 3,
                SplitEntityId: "LNPYACC0011"
            },
            {
                SplitType: "PERCENTAGE",
                SplitValue: 3,
                SplitEntityId: "LNPYACC0015"
            }
        ],
        
        Balance: {totalBal}
    }
    transactionPayments.push(transaction);
    res.send(transaction);


})

const firstBal = function(){
    if(SplitType === "Flat".toLowerCase()){
        {Amount} - (SplitInfo[0]).SplitValue
    }else return;
}

const secondBal = function(){
    if(SplitType === "Percentage".toLowerCase()){
        const percent = (SplitInfo[2].SplitValue)% of (firstBal);
        firstBal - {percent}
    }
}
const thirdBal = function(){
    if(SplitType === "Ratio".toLowerCase()){
         (SplitInfo[1].SplitValue)% of (secondBal)
    }
}

const totalBal = thirdBal
// PORT
const port = process.env.PORT || 3000;

app.listen(port,() => console.log(`listening on port ${port}`))