sap.ui.define([
		"com/mycompany/northwind/model/GroupSortState",
		"sap/ui/model/json/JSONModel"
	], function (GroupSortState, JSONModel) {
	"use strict";

	QUnit.module("GroupSortState - grouping and sorting", {
		beforeEach: function () {
			this.oModel = new JSONModel({});
			// System under test
			this.oGroupSortState = new GroupSortState(this.oModel, function() {});
		}
	});

	QUnit.test("Should always return a sorter when sorting", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.sort("SupplierID").length, 1, "The sorting by SupplierID returned a sorter");
		assert.strictEqual(this.oGroupSortState.sort("CompanyName").length, 1, "The sorting by CompanyName returned a sorter");
	});

	QUnit.test("Should return a grouper when grouping", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.group("SupplierID").length, 1, "The group by SupplierID returned a sorter");
		assert.strictEqual(this.oGroupSortState.group("None").length, 0, "The sorting by None returned no sorter");
	});


	QUnit.test("Should set the sorting to SupplierID if the user groupes by SupplierID", function (assert) {
		// Act + Assert
		this.oGroupSortState.group("SupplierID");
		assert.strictEqual(this.oModel.getProperty("/sortBy"), "SupplierID", "The sorting is the same as the grouping");
	});

	QUnit.test("Should set the grouping to None if the user sorts by CompanyName and there was a grouping before", function (assert) {
		// Arrange
		this.oModel.setProperty("/groupBy", "SupplierID");

		this.oGroupSortState.sort("CompanyName");

		// Assert
		assert.strictEqual(this.oModel.getProperty("/groupBy"), "None", "The grouping got reset");
	});
});