using {
    cuid,
    managed,
} from '@sap/cds/common';

context Talent {
    entity Candidates:  cuid, managed {
        firstName: String(50);
        lastName: String(50);
        dateOfBirth: Date;
        residence: String(100);
        email: String(100);
        department: Association to Departments;
        contractType: Association to ContractTypes;
        reportsTo: String(100);
        preferredLanguage: String(10); // "EN", "NL", "DE", "FR"
        startDate: Date;
        seniority: Integer;
        status: String(10); // "Approved", "Rejected"
    }

    entity Departments:  managed {
        key code: String(3);
        description: String(50);
    }

    entity ContractTypes:  managed {
        key type: String(20);
    }
}
