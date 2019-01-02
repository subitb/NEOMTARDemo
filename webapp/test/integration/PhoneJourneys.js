jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"com/mycompany/northwind/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/mycompany/northwind/test/integration/pages/App",
	"com/mycompany/northwind/test/integration/pages/Browser",
	"com/mycompany/northwind/test/integration/pages/Master",
	"com/mycompany/northwind/test/integration/pages/Detail",
	"com/mycompany/northwind/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.mycompany.northwind.view."
	});

	sap.ui.require([
		"com/mycompany/northwind/test/integration/NavigationJourneyPhone",
		"com/mycompany/northwind/test/integration/NotFoundJourneyPhone",
		"com/mycompany/northwind/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});