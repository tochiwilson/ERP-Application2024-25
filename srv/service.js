const cds = require('@sap/cds');
const httpclient = require("@sap-cloud-sdk/http-client");

module.exports = cds.service.impl(async (srv) => {
    const { Candidates, Departments, ContractTypes, WorkflowRounds } = cds.entities('Talent');

    // checks doen voor de business process
    srv.before('CREATE', 'Candidates', async (req) => {
        
        // de checks voor de business process
        if (req.department === 'HR' || req.department === 'FIN' || req.department === 'IT') {
            const count = await cds.run(SELECT.from(Candidates).where({ department: req.department }));
            if (count.length >= 5) {
                req.reject(400, `Maximum aantal kandidaten voor afdeling ${req.department} bereikt`);
            }
        }

        if (req.department === 'SAL' || req.department === 'MKT') {
            const count = await cds.run(SELECT.from(Candidates).where({ department: req.department }));
            if (count.length >= 3) {
                req.reject(400, `Maximum aantal kandidaten voor afdeling ${req.department} bereikt`);
            }
        }

        if (req.department === 'DEV') {
            const count = await cds.run(SELECT.from(Candidates).where({ department: req.department }));
            if (count.length >= 10) {
                req.reject(400, `Maximum aantal kandidaten voor afdeling ${req.department} bereikt`);
            }
        }
    });
    
    srv.after('CREATE', 'Candidates', async (req) => {
        
        // creëer candidate en start business process
        try {
            let oData = {
                "definitionId": "us10.73653315trial.candidatemanagementproject.candidateApprovalProcess",
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
        } catch (oError) {
            console.log(`Error starting business process: ${oError.message}`);
        }
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
