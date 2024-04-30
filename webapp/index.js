sap.ui.define([
	"sap/ui/core/ComponentContainer"
], (ComponentContainer) => {
	"use strict";

	new ComponentContainer({
		name: "sapui5hw",
		settings : {
			id : "sapui5hw"
		},
		async: true
	}).placeAt("content");
});