sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("createcandidate.controller.candidate-creation", {

        onInit: function () {
            const oCandidateModel = new JSONModel({
                firstName: null,
                lastName: null,
                dateOfBirth: null,
                residence: null,
                email: null,
                department: null,
                contractType: null,
                startDate: null,
                status: "Pending",
                reportsTo: null,
                preferredLanguage: null,
                seniority: null
            });

            this.getView().setModel(oCandidateModel, "candidateModel");
        },

        onCreateCandidate: function () {
            const oODataModel = this.getView().getModel();
            const oCandidateData = this.getView().getModel("candidateModel").getData();

            const payload = {
                firstName: oCandidateData.firstName,
                lastName: oCandidateData.lastName,
                dateOfBirth: oCandidateData.dateOfBirth,
                residence: oCandidateData.residence,
                email: oCandidateData.email,
                department: { code: oCandidateData.department },
                contractType: {type: oCandidateData.contractType} ,
                startDate: oCandidateData.startDate,
                status: oCandidateData.status,
                reportsTo: oCandidateData.reportsTo,
                preferredLanguage: oCandidateData.preferredLanguage,
                seniority: oCandidateData.seniority
            };

            const oListBinding = oODataModel.bindList("/Candidates", undefined, undefined, undefined, { $$updateGroupId: "createCandidate" });
            const oContext = oListBinding.create(payload);

            oODataModel.submitBatch("createCandidate").then(function () {
				MessageBox.alert("Changes have been saved", {
					icon : sap.m.MessageBox.Icon.SUCCESS,
					title : "Success"
				});
			}, function (oError) {
				MessageBox.alert(oError.message, {
					icon : sap.m.MessageBox.Icon.ERROR,
					title : "Unexpected Error"
				});
			});
        }
    });
});
