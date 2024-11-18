const cds = require('@sap/cds');

module.exports = cds.service.impl(async (srv) => {
    const { Candidates, Departments, ContractTypes, WorkflowRounds } = cds.entities('Talent');

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

    srv.on('READ', 'Candidates', async () => {
        return [
            { firstName: 'John', lastName: 'Doe', department: { code: 'HR' }, contractType: { type: 'Full Time' }, reportsTo: 'Manager A', preferredLanguage: 'EN', startDate: '2024-01-01', seniority: 5, status: 'Approved' },
            { firstName: 'Jane', lastName: 'Smith', department: { code: 'MKT' }, contractType: { type: 'Stage' }, reportsTo: 'Manager B', preferredLanguage: 'NL', startDate: '2024-02-01', seniority: 1, status: 'Pending' }
        ];
    });

    srv.on('READ', 'WorkflowRounds', async () => {
        return [
            { candidate: { firstName: 'John', lastName: 'Doe' }, department: { code: 'HR' }, round: 1, maxCandidates: 5, currentCandidates: 3 },
            { candidate: { firstName: 'Jane', lastName: 'Smith' }, department: { code: 'MKT' }, round: 2, maxCandidates: 4, currentCandidates: 2 }
        ];
    });
});
