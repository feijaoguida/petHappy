"use strict";

const Establishment = use("App/Models/Establishment");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with establishments
 */
class EstablishmentController {
  /**
   * Show a list of all establishments.
   * GET establishments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const { latitude, longitude } = request.all();

    const establishments = Establishment.query()
      .with("images")
      .nearBy(latitude, longitude, 30)
      .fetch();

    return establishments;
  }

  /**
   * Render a form to be used for creating a new establishment.
   * GET establishments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async store({ auth, request, response }) {
    const { id } = auth.user;
    const data = request.only([
      "title",
      "address",
      "latitude",
      "longitude",
      "price"
    ]);

    const establishment = await Establishment.create({ ...data, user_id: id });

    return establishment;
  }

  /**
   * Display a single establishment.
   * GET establishments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const establishment = await Establishment.findOrFail(params.id);

    await establishment.load("images");

    return establishment;
  }

  /**
   * Render a form to update an existing establishment.
   * GET establishments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async update({ params, request, response }) {
    const establishment = await Establishment.findOrFail(params.id);

    const data = request.only([
      "title",
      "address",
      "latitude",
      "longitude",
      "price"
    ]);

    establishment.merge(data);

    await establishment.save();

    return establishment;
  }

  /**
   * Delete a establishment with id.
   * DELETE establishments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const establishment = await Establishment.findOrFail(params.id);

    if (establishment.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Não Autorizado" });
    }

    await establishment.delete();
  }
}

module.exports = EstablishmentController;
