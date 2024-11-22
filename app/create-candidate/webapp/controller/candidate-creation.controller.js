sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("createcandidate.controller.candidate-creation", {
        onCreateCandidate: function () {
            var oView = this.getView();
            var oModel = this.getView().getModel();
      
            // Verkrijg de waarden van de velden
            var oData = {
              firstName: oView.byId("firstName").getValue(),
              lastName: oView.byId("lastName").getValue(),
              birthDate: oView.byId("birthDate").getDateValue(),
              city: oView.byId("city").getValue(),
              email: oView.byId("email").getValue(),
              department: oView.byId("department").getSelectedKey(),
              contractType: oView.byId("contractType").getSelectedKey(),
              startDate: oView.byId("startDate").getDateValue()
            };
      
            // Maak een POST-aanroep naar de backend om de kandidaat aan te maken
            oModel.create("/Candidates", oData, {
              success: function () {
                MessageToast.show("Kandidaat succesvol aangemaakt");
              },
              error: function () {
                MessageToast.show("Er is iets misgegaan");
              }
            });
        }
    });
});
