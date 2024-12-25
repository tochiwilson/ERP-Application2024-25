using TalentService as service from '../../srv/service';

annotate service.Candidates with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'firstName',
                Value: firstName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'lastName',
                Value: lastName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'dateOfBirth',
                Value: dateOfBirth,
            },
            {
                $Type: 'UI.DataField',
                Label: 'residence',
                Value: residence,
            },
            {
                $Type: 'UI.DataField',
                Label: 'email',
                Value: email,
            },
            {
                $Type: 'UI.DataField',
                Label: 'department_code',
                Value: department_code,
            },
            {
                $Type: 'UI.DataField',
                Label: 'contractType_type',
                Value: contractType_type,
            },
            {
                $Type: 'UI.DataField',
                Label: 'reportsTo',
                Value: reportsTo,
            },
            {
                $Type: 'UI.DataField',
                Label: 'preferredLanguage',
                Value: preferredLanguage,
            },
            {
                $Type: 'UI.DataField',
                Label: 'startDate',
                Value: startDate,
            },
            {
                $Type: 'UI.DataField',
                Label: 'seniority',
                Value: seniority,
            },
            {
                $Type: 'UI.DataField',
                Label: 'status',
                Value: status,
            },
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup',
    }, ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: '{i18n>FirstName}',
            Value: firstName,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>LastName}',
            Value: lastName,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>DateOfBirth}',
            Value: dateOfBirth,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>Residence}',
            Value: residence,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>Email}',
            Value: email,
        },
    ],
);

annotate service.Candidates with {
    department @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'Departments',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: department_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'code',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
        ],
    }
};

annotate service.Candidates with {
    contractType @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'ContractTypes',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: contractType_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'type',
            },
        ],
    }
};
annotate service.Candidates with {
    firstName @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Candidates',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : firstName,
                    ValueListProperty : 'firstName',
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};

