const cds = require('@sap/cds');
const httpclient = require("@sap-cloud-sdk/http-client");

module.exports = cds.service.impl(async (srv) => {
    const { Candidates, Departments, ContractTypes, WorkflowRounds } = cds.entities('Talent');

    // checks doen voor de business process
    srv.before('CREATE', 'Candidates', async (req) => {
        
        // de check
    });
    
    srv.after('CREATE', 'Candidates', async (req) => {
        
        let oData = {
            "definitionId": "us10.14954ddftrial.candidateapprovalworkflow.candidateApproval",
            "context": {
                "candidatedetails": {
                    "firstName": req.firstName,
                    "lastName": req.lastName,
                    "dateOfBirth": req.dateOfBirth,
                    "residence": req.residence,
                    "email": req.email,
                    "department": req.department,
                    "contractType": req.contractType,
                    "reportsTo": req.reportsTo,
                    "preferredLanguage": req.preferredLanguage,
                    "startDate": req.startDate,
                    "seniority": req.seniority,
                    "status": "Pending"
                }
            }
        }

        let oResponse = await startBusinessProcess(oData);
    });

    srv.on("TriggerBusinessProcess", async (oReq) => {
        // Wat krijgen we binnen:
        console.log(`We krijgen het volgende van data binnen: ${oReq.data.Context}`)
        // Context komt van de services.cds

        await startBusinessProcess(oReq.data.Context)
    })

    srv.on('READ', 'Departments', async () => {
        return [
            { code: 'HR', description: 'Human Resources' },
            { code: 'FIN', description: 'Finance' },
            { code: 'SAL', description: 'Sales' },
            { code: 'MKT', description: 'Marketing' },
            { code: 'DEV', description: 'Development' },
            { code: 'IT', description: 'IT department' }
        ];
    });

    srv.on('READ', 'ContractTypes', async () => {
        return [
            { type: 'Full Time' },
            { type: '4/5' },
            { type: '3/5' },
            { type: 'Halftijds' },
            { type: 'Stage' }
        ];
    });    
});

async function startBusinessProcess(payload) {
    try {
        let oResponse = await httpclient.executeHttpRequest({
            destinationName: 'spa_process_destination'
        }, {
            method: 'POST',
            url: '/workflow/rest/v1/workflow-instances',
            headers: {
                "Content-Type": 'application/json'
            },
            data: payload
        });
        return oResponse.data;
    } catch (oError) {
        console.log(`Error connecting to Build Process Automation destination: ${oError.message}`);
        return null;
    }
}
