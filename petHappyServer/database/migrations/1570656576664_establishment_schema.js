"use strict";

const Schema = use("Schema");

class EstablishmentSchema extends Schema {
  up() {
    this.create("establishments", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("title").notNullable();
      table.string("address").notNullable();
      table.string("price").notNullable();
      table.decimal("latitude", 9, 6).notNullable();
      table.decimal("longitude", 9, 6).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("establishments");
  }
}

module.exports = EstablishmentSchema;
