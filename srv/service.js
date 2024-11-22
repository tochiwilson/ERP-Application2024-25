const cds = require('@sap/cds');

module.exports = cds.service.impl(async (srv) => {
    const { Candidates, Departments, ContractTypes, WorkflowRounds } = cds.entities('Talent');
    
    // Voor het aanmaken van een nieuwe kandidaat
    srv.on('CREATE', 'Candidates', async (req) => {
        const { firstName, lastName, dateOfBirth, residence, email, department, contractType, reportsTo, preferredLanguage, startDate, seniority } = req.data;

        // Logica voor het opslaan van de kandidaat
        const newCandidate = await INSERT.into(Candidates).entries({
            firstName,
            lastName,
            dateOfBirth,
            residence,
            email,
            department,
            contractType,
            reportsTo,
            preferredLanguage,
            startDate,
            seniority,
            status: 'Pending'  // Standaard status voor een nieuwe kandidaat
        });

        // Workflow aanmaken voor de nieuwe kandidaat
        const candidate = newCandidate[0]; // Aangenomen dat INSERT retourneert als array
        const newWorkflow = await INSERT.into(WorkflowRounds).entries({
            candidate: candidate.ID,  // Koppeling naar de nieuwe kandidaat
            department: department,   // Afdeling van de kandidaat
            round: 1,                 // Eerste ronde
            maxCandidates: 5,         // Maximaal aantal kandidaten per ronde
            currentCandidates: 1      // Huidig aantal kandidaten in de ronde
        });

        return newCandidate;
    });

    // Suggesties voor de afdelingen en contracttypes
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
