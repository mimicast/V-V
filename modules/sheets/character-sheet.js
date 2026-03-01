export class VNVCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["vnv", "sheet", "actor", "character"],
      template: "systems/vnv/templates/sheets/character-sheet.html",
      width: 800,
      height: 700
    });
  }

  getData(options) {
    const data = super.getData(options);
    // Expose actor system data and convenience shortcuts
    data.system = data.actor.system || {};
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
    // Add sheet-specific listeners here
  }
}
