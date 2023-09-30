function main(params) {
    return new Promise(function (resolve, reject) {
      const { CloudantV1 } = require("@ibm-cloud/cloudant");
      const { IamAuthenticator } = require("ibm-cloud-sdk-core");
      const authenticator = new IamAuthenticator({
        apikey: "nBCEM7dnCfeiu_EVIqpQm86GX2gK01ppgK-Nq52A59o-", // TODO: Replace with your API key
      });
      const cloudant = CloudantV1.newInstance({
        authenticator: authenticator,
      });
      cloudant.setServiceUrl("https://c17f6666-d70a-4bf8-b878-4fd067afaea5-bluemix.cloudantnosqldb.appdomain.cloud"); // TODO: Replace with your Cloudant service URL
      // add id to review
      doc = params.review;
      doc.id = Math.floor(Math.random() * (80 - 15) + 15);
      cloudant
        .postDocument({
          db: "reviews",
          document: doc,
        })
        .then((result) => {
          let code = 201;
          resolve({
            statusCode: code,
            headers: { "Content-Type": "application/json" },
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  // example invocation
  let result = main({
    json: {
      time: "2023-09-10T4:58:12.927873",
      name: "This is for test only",
      dealership: 29,
      review: "This is just another review from another person. Good enough.",
      purchase: false,
      purchase_date: "",
      car_make: "BMW",
      car_model: "V60 Recharge",
      car_year: "2023",
    },
  });
  result.then((message) => console.log(message));
