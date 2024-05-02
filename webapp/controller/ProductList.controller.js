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
				currency: "EUR",
                percent:"%"
			});
			this.getView().setModel(oViewModel, "view");
		},
        onFilterProducts(oEvent){
            // build filter array
			let aFilter = [],
			 sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
			}
			// filter binding
			const oList = this.byId("productList"),
			 oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
        },
        onSuggest(oEvent) {
            let sValue = oEvent.getParameter("suggestValue").toUpperCase();
            let oSF = oEvent.getSource();
            let oSuggestionItems = oSF.getSuggestionItems();
            let aFilters = [];
        
            if (sValue) {
                aFilters = [
                    new Filter("title", FilterOperator.Contains, sValue)
                ];
            }
        
            // Ürün modelinden filtreleme yaparak yeni bir öneri listesi oluştur
            let oProductList = this.getView().getModel("product");
            let aFilteredProducts = oProductList.getProperty("/Products").filter(function(oProduct) {
                return aFilters.some(function(oFilter) {
                    return oFilter.fnTest(oProduct);
                });
            });
        
            // Yeni öneri listesini ayarla
            oSF.suggestionItems = aFilteredProducts.map(function(oProduct) {
                return new SuggestionItem({
                    text: oProduct.title
                });
            });
        
            oSF.suggest();
        },
        onPressForInfo(oEvent){
            const oItem = oEvent.getSource();
            const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail",{
                productPath: window.encodeURIComponent(oItem.getBindingContext("product").getPath().substr(1))
            });
        }
	});
});