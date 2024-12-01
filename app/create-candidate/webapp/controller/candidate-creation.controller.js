sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("createcandidate.controller.candidate-creation", {

        onInit: function () {
            // Initieer een JSONModel om kandidaatdata op te slaan
            const oCandidateModel = new JSONModel({
                firstName: null,
                lastName: null,
                dateOfBirth: null,
                residence: null,
                email: null,
                department: null,
                contractType: null,
                startDate: null,
                status: "Pending", // Standaardwaarde
                reportsTo: null,
                preferredLanguage: null,
                seniority: null
            });

            // Koppel het JSONModel aan de view met een naam
            this.getView().setModel(oCandidateModel, "candidateModel");
        },

        onCreateCandidate: function () {
            const oODataModel = this.getView().getModel(); // Ophalen van het OData-model
            const oCandidateData = this.getView().getModel("candidateModel").getData(); // Ophalen van de data uit het JSONModel

            // Data formatteren voor het payload-object
            const payload = {
                firstName: oCandidateData.firstName,
                lastName: oCandidateData.lastName,
                dateOfBirth: oCandidateData.dateOfBirth,
                residence: oCandidateData.residence,
                email: oCandidateData.email,
                department: oCandidateData.department,
                contractType: oCandidateData.contractType,
                startDate: oCandidateData.startDate,
                status: oCandidateData.status,
                reportsTo: oCandidateData.reportsTo,
                preferredLanguage: oCandidateData.preferredLanguage,
                seniority: oCandidateData.seniority
            };

            console.log("Payload:", payload);

            // Binding voor de Candidates entiteit
            const oListBinding = oODataModel.bindList("/Candidates", undefined, undefined, undefined, { $$updateGroupId: "createCandidate" });

            // Nieuwe kandidaat aanmaken via binding
            const oContext = oListBinding.create(payload);

            // Wijzigingen indienen via een batch
            oODataModel.submitBatch("createCandidate").then(() => {
                // Succesbericht
                MessageToast.show("Kandidaat succesvol aangemaakt!");
                console.log("Aangemaakte kandidaat context:", oContext.getPath());

                // JSONModel resetten voor een nieuwe invoer
                this.getView().getModel("candidateModel").setData({
                    firstName: null,
                    lastName: null,
                    dateOfBirth: null,
                    residence: null,
                    email: null,
                    department: null,
                    contractType: null,
                    startDate: null,
                    status: "Pending", // Standaardwaarde
                    reportsTo: null,
                    preferredLanguage: null,
                    seniority: null
                });
            }).catch((oError) => {
                // Foutmelding tonen
                MessageBox.alert(oError.message, {
                    icon: sap.m.MessageBox.Icon.ERROR,
                    title: "Onverwachte fout"
                });
                console.error("Error bij submitBatch:", oError.message || oError);
            });
        }
    });
});
