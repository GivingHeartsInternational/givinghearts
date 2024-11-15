const jsforce  = require('jsforce');


const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

 


const Ben =
[
 {
        "Company": "\"Google  \"",
        "Project": "Giving Hearts International Inc",
        "Donation Date": "2021-12-29T19:15:33Z",
        "Donor First Name": "Maksim",
        "Donor Last Name": "Mukha",
        "Email": "maksimmukha@google.com",
        "Address": "Not shared by donor",
        "City": "Not shared by donor",
        "State/Province": "Not shared by donor",
        "Postal Code": "8002",
        "Activity": "",
        "Comment": "",
        "Transaction ID": "361066W9VT",
        "Donation Frequency": "Recurring", //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        "Currency": "CHF",// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        "Project Remote ID": "",
        "Source": "Payroll",
        "Reason": "User Donation",
        "Total Donation to be Acknowledged": "50.00",
        "Match Amount": "50.00",
        "Cause Support Fee": "0.00",
        "Merchant Fee": "0.00",
        "Fee Comment\r": "\r"
    },
    {
        "Company": "\"Google  \"",
        "Project": "Giving Hearts International Inc",
        "Donation Date": "2021-12-29T19:15:33Z",
        "Donor First Name": "Maksim",
        "Donor Last Name": "Mukha",
        "Email": "maksimmukha@google.com",
        "Address": "Not shared by donor",
        "City": "Not shared by donor",
        "State/Province": "Not shared by donor",
        "Postal Code": "8002",
        "Activity": "",
        "Comment": "",
        "Transaction ID": "361066W9VT",
        "Donation Frequency": "Recurring", //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        "Currency": "CHF",// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        "Project Remote ID": "",
        "Source": "Payroll",
        "Reason": "User Donation",
        "Total Donation to be Acknowledged": "50.00",
        "Match Amount": "50.00",
        "Cause Support Fee": "0.00",
        "Merchant Fee": "0.00",
        "Fee Comment\r": "\r"
    }
    ]

const BenevityReportToSalesforce = (req,res) => {
// const jsonBenevityReport = req.body;
const jsonBenevityReport = Ben;



       const conn = new jsforce.Connection({
      loginUrl: `https://givingheartsinternational.my.salesforce.com`
    });

    conn.login('danik77p@gmail.com', 'Pass1Word1GDdbObiwxolLGFjHT4VYUB3lx', function(err, result) {
      if (err) { return console.log(err) }
    });



  jsonBenevityReport.map(payment => {
    
   const amount = Math.round(payment["Match Amount"]);
       const id = payment["Transaction ID"]; 
    const date = payment["Donation Date"];
    const firstName = payment["Donor First Name"];
    const lastName = payment["Donor Last Name"];
    const email = payment["Email"];

const name = firstName + " " + lastName;
const searchQuery = email ? { Email: email} : { Name: firstName + " " + lastName} ;



conn.sobject("Contact")
  .find(
    // conditions in JSON object
    //{ Email: email} 
    searchQuery
    ,
    // fields in JSON object
    { Id: 1,
      Name: 1,
      AccountId: 1 }
  )
  .execute(function(err, records) {
    if (err) { return console.error(err); }

//res.json({res: records})


 const OpportunityData = {
  Name: "Donation from " + name, /// add email???
  CloseDate: date,
  StageName: "Closed Won",
  RecordTypeId: "0128c00000224o2AAA",
  Amount: amount,
 // Description: paymentDesc ////// DESC ????
}
 
// Check if donor exist
if(records.length) {
  //send Account with Payment
  let AccountId = records[0].AccountId;
  OpportunityData.AccountId = AccountId;

  


 //create payment 
   conn.sobject("Opportunity").create(OpportunityData, function(err, ret) {
   if (err || !ret.success) { return console.error(err, ret); }
   console.log("Created donation id : " + ret.id);
 });

} else {
  //create Contact and Account, and send to Salesforce with payment data 


  //create Account 
     const AccountData = {
       Name: name + " Household",
       Type: "Household",
      /* RecordTypeId: '0128c00000224o0AAA'*/
     }

     conn.sobject("Account").create(AccountData, function(err, ret) {
       if (err || !ret.success) { return console.error(err, ret); }
       console.log("Created account id : " + ret.id);
       let AccountId = ret.id
       OpportunityData.AccountId = AccountId;

       const ContactData = {
          LastName: name,
          Email: email,
          AccountId: AccountId
        }

         //create Contact 
         conn.sobject("Contact").create(ContactData, function(err, ret) {
           if (err || !ret.success) { return console.error(err, ret); }
           console.log("Created contact id : " + ret.id);


              // Account update -- add primary contact 
              conn.sobject("Account").update({ 
                Id : AccountId,
                npe01__One2OneContact__c: ret.id
              }, function(err, ret) {
                if (err || !ret.success) { return console.error(err, ret); }
                console.log('Account updated Successfully : ' + AccountId);
              });

         });

        //create payment 
         conn.sobject("Opportunity").create(OpportunityData, function(err, ret) {
           if (err || !ret.success) { return console.error(err, ret); }
           console.log("Created donation id : " + ret.id);
         });
   
     

 });

}
// end else 
 
 
  });
  //end of conn.sobject().find





  }) //end  jsonBenevityReport.map

  res.json({received: true}) 


}


 

 const salesforceAction = (object) => {



let { id, currency, customer, description } = object;
let { email, name } = object.charges.data[0].billing_details;
let { projectId, paymentDesc, websiteId } = object.metadata;
let amount = object.amount / 100;



// Payments from facebook have no field "email", but they have customer email in "description" field in form of string "Donation of {email}", so email can be taken from this string)

if(!email && websiteId == "58a0e75d893fc0b6d3dbb39c") {
  const arrEmailFromDesc = description.split(" ");
  email = arrEmailFromDesc[2];
}
 
const conn = new jsforce.Connection({
  loginUrl: `https://givingheartsinternational.my.salesforce.com`
});


conn.login('danik77p@gmail.com', 'Pass1WordxhzYu6Px8uuXfmMb2lWWr4AL', function(err, result) {
  if (err) { return console.log(err) }
console.log(result)
        
 
 
const CurrentDate = new Date()


conn.sobject("Contact")
  .find(
    // conditions in JSON object
    { Email: email} 
    ,
    // fields in JSON object
    { Id: 1,
      Name: 1,
      AccountId: 1 }
  )
  .execute(function(err, records) {
    if (err) { return console.error(err); }

//res.json({res: records})


 const OpportunityData = {
  Name: "Donation from " + email,
  CloseDate: CurrentDate,
  StageName: "Closed Won",
  RecordTypeId: "0128c00000224o2AAA",
  Amount: amount,
  Description: paymentDesc
}
 
// Check if donor exist
if(records.length) {
  //send Account with Payment
  let AccountId = records[0].AccountId;
  OpportunityData.AccountId = AccountId;

  


 //create payment 
   conn.sobject("Opportunity").create(OpportunityData, function(err, ret) {
   if (err || !ret.success) { return console.error(err, ret); }
   console.log("Created donation id : " + ret.id);
 });

} else {
  //create Contact and Account, and send to Salesforce with payment data 


  //create Account 
     const AccountData = {
       Name: name + " Household",
       Type: "Household",
      /* RecordTypeId: '0128c00000224o0AAA'*/
     }

     conn.sobject("Account").create(AccountData, function(err, ret) {
       if (err || !ret.success) { return console.error(err, ret); }
       console.log("Created account id : " + ret.id);
       let AccountId = ret.id
       OpportunityData.AccountId = AccountId;

       const ContactData = {
          LastName: name,
          Email: email,
          AccountId: AccountId
        }

         //create Contact 
         conn.sobject("Contact").create(ContactData, function(err, ret) {
           if (err || !ret.success) { return console.error(err, ret); }
           console.log("Created contact id : " + ret.id);


              // Account update -- add primary contact 
              conn.sobject("Account").update({ 
                Id : AccountId,
                npe01__One2OneContact__c: ret.id
              }, function(err, ret) {
                if (err || !ret.success) { return console.error(err, ret); }
                console.log('Account updated Successfully : ' + AccountId);
              });

         });

        //create payment 
         conn.sobject("Opportunity").create(OpportunityData, function(err, ret) {
           if (err || !ret.success) { return console.error(err, ret); }
           console.log("Created donation id : " + ret.id);
         });
   
     

 });

}
// end else 
 
 
  });
  //end of conn.sobject().find

 
});
//end conn.login  
 



 }
 //end salesforce.action

 

 

export default allowCors(BenevityReportToSalesforce);