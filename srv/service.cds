using { Talent as my } from '../db/schema';

service TalentService { 
    entity Candidates as projection on my.Candidates;
    entity ContractTypes as projection on my.ContractTypes;
    entity Departments as projection on my.Departments;
    entity WorkflowRounds as projection on my.WorkflowRounds;
}
