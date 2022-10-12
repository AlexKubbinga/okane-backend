//
// Graph
// http://localhost:3001/getMerchantsBySubscription/STR
//

[
  { monthEndDate: "2022-08-31", Netflix: 10.99, "Amazon Prime": 8.99 },
  { monthEndDate: "2022-09-30", Netflix: 10.99, "Amazon Prime": 8.99 }
]


//
// Calendar
// http://localhost:3001/getTransactionsByMerchant
//

[ 
  { 
    monthEndDate: "2022-08-31",
    trans: [ 
             { date: "2022-08-12",
               subs: "Streaming",
               merch: "Netflix",
               val: "10.99" },
             { date: "2022-08-27",
               subs: "Streaming",
               merch: "Amazon Prime",
               val: "8.99" }
           ]
   },
   {
     monthEndDate: "2022-09-30",
     trans: [ 
              { date: "2022-09-07",
                subs: "Streaming",
                merch: "Netflix",
                val: "10.99" },
              { date: "2022-09-13",
                subs: "Streaming",
                merch: "Amazon Prime",
                val: "8.99" }
            ]
   }
]