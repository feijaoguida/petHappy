"use strict";

const Schema = use("Schema");

class ImageSchema extends Schema {
  up() {
    this.create("images", table => {
      table.increments();
      table
        .integer("establishment_id")
        .unsigned()
        .references("id")
        .inTable("establishments")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("path").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("images");
  }
}

module.exports = ImageSchema;
