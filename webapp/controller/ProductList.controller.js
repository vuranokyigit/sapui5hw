sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel,Filter,FilterOperator) => {
	"use strict";

	return Controller.extend("sapui5hw.controller.ProductList", {
		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},
        onFilterProducts(oEvent){
            // build filter array
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
			}
			// filter binding
			const oList = this.byId("productList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
        },
        onPressForInfo(){
            const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail");
        }
	});
});