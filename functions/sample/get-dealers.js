function main(params) {
    return new Promise(function (resolve, reject) {
      const { CloudantV1 } = require("@ibm-cloud/cloudant");
      const { IamAuthenticator } = require("ibm-cloud-sdk-core");
      const authenticator = new IamAuthenticator({
        apikey: "nBCEM7dnCfeiu_EVIqpQm86GX2gK01ppgK-Nq52A59o-", // TODO: Replace with your own API key
      });
      const cloudant = CloudantV1.newInstance({
        authenticator: authenticator,
      });
      cloudant.setServiceUrl("https://c17f6666-d70a-4bf8-b878-4fd067afaea5-bluemix.cloudantnosqldb.appdomain.cloud"); // TODO: Replace with your own service URL
      if (params.st) {
        // return dealership with this state
        cloudant
          .postFind({ db: "dealerships", selector: { st: params.st } })
          .then((result) => {
            let code = 200;
            if (result.result.docs.length == 0) {
              code = 404;
            }
            resolve({
              statusCode: code,
              headers: { "Content-Type": "application/json" },
              body: result.result.docs,
            });
          })
          .catch((err) => {
            reject(err);
          });
      } else if (params.dealerId) {
        id = parseInt(params.dealerId);
        // return dealership with this id
        cloudant
          .postFind({
            db: "dealerships",
            selector: {
              id: parseInt(params.dealerId),
            },
          })
          .then((result) => {
            let code = 200;
            if (result.result.docs.length == 0) {
              code = 404;
            }
            resolve({
              statusCode: code,
              headers: { "Content-Type": "application/json" },
              body: result.result.docs,
            });
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        // return all documents
        cloudant
          .postAllDocs({ db: "dealerships", includeDocs: true })
          .then((result) => {
            let code = 200;
            if (result.result.rows.length == 0) {
              code = 404;
            }
            resolve({
              statusCode: code,
              headers: { "Content-Type": "application/json" },
              body: result.result.rows,
            });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
  
  // example invocation
  let result = main({});
  result.then((dealers) => console.log(dealers));
