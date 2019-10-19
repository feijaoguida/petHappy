"use strict";

const Route = use("Route");

Route.post("/users", "UserController.create");
Route.post("/sessions", "SessionController.create");

Route.resource("establishments", "EstablishmentController")
  .apiOnly()
  .middleware("auth");

Route.get("images/:path", "ImageController.show").middleware("auth");

Route.post("establishments/:id/images", "ImageController.store").middleware(
  "auth"
);
