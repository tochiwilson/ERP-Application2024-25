using TalentService as service from '../../srv/service';

annotate service.Candidates with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: '{i18n>FirstName}',
                Value: firstName,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>DateOfBirth1}',
                Value: dateOfBirth,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>LastName}',
                Value: lastName,
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
            {
                $Type: 'UI.DataField',
                Label: '{i18n>Department}',
                Value: department_code,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>ContractType}',
                Value: contractType_type,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>ReportsTo}',
                Value: reportsTo,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>PreferredLanguage}',
                Value: preferredLanguage,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>StartDate}',
                Value: startDate,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>Seniority}',
                Value: seniority,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>Status}',
                Value: status,
            },
        ],
    },
    UI.HeaderInfo: {
        $Type: 'UI.HeaderInfoType',
        TypeName: 'Candidates',
        TypeNamePlural: 'Candidates',
        Description: {
            $Type: 'UI.DataField',
            Value: department_code
        },
        Title: {
            $Type: 'UI.DataField',
            Value: lastName
        }
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
    UI.SelectionFields : [
        
    ],
);

annotate service.Candidates with {
    department @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'Departments',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: department_code,
                ValueListProperty: 'code',
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
                LocalDataProperty: contractType_type,
                ValueListProperty: 'type',
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
annotate service.Candidates with {
    lastName @Common.Label : 'lastName'
};

