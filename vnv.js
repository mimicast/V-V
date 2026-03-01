/**
 * Vice and Violence - A Foundry VTT System
 * The core system module that initializes and configures the Vice & Violence game system.
 */

// ==================== IMPORTS ====================
import { VNV } from "./modules/config.js";
import vnvActor from "./modules/objects/vnvActor.js";
import { VNVCharacterSheet } from "./modules/sheets/character-sheet.js";
import * as dice from "./modules/dice.js";
import * as dialog from "./modules/dialog.js";

// ==================== INITIALIZATION ====================
/**
 * Initialization hook - runs once when the system is first loaded.
 * Sets up configuration, loads templates, registers helpers, and registers document classes.
 */
Hooks.once("init", async () => {
    console.log("VNV | Initializing Vice and Violence System");
    
    // Register the system configuration object globally
    CONFIG.VNV = VNV;
    CONFIG.INIT = true;
    CONFIG.Actor.documentClass = vnvActor;

    // Register custom sheets and unregister the start sheets
    // Items.unregisterSheet("core", ItemSheet);
    
    const DocumentSheetConfig = foundry.applications.sheets.DocumentSheetConfig;
    //DocumentSheetConfig.unregisterSheet(Actor, "core", "ActorSheet");
    //DocumentSheetConfig.registerSheet(Actor, "vnv", VNVCharacterSheet, { types: ["character"], makeDefault: true, label: "VNV.SheetClassCharacter" });
    Actors.registerSheet("vnv", VNVCharacterSheet, { types: ["character"], makeDefault: true, label: "VNV.SheetClassCharacter" });
    // Load all Handlebars templates used in the system
    preloadHandlebarsTemplates();
    
    // Register custom Handlebars helpers for template rendering
    registerHandlebarsHelpers();
    
    // Register custom document classes (Actors and Items)
    //registerDocumentClasses();
    
    // Register sheet classes for different actor and item types
    //registerSheetClasses();
    
    console.log("VNV | Initialization complete");
});

// ==================== READY HOOK ====================
/**
 * Ready hook - runs after all modules are initialized and the canvas is ready.
 * Performs post-initialization setup and migrations.
 */
Hooks.once("ready", async () => {
    CONFIG.INIT = false;

    if (!game.user.isGM) return;
    console.log("VNV | System ready");
});

// ==================== TEMPLATE LOADING ====================
/**
 * Preloads all Handlebars templates from the templates directory.
 * This makes them available for rendering without loading delays.
 */
async function preloadHandlebarsTemplates() {
    // Define the template paths to preload
    const templatePaths = [
        // Character sheet templates
        "systems/vnv/templates/partials/character-sheet-character.hbs",
        "systems/vnv/templates/partials/character-sheet-background.hbs",
        "systems/vnv/templates/partials/character-sheet-skills.hbs",
        "systems/vnv/templates/partials/character-sheet-combat.hbs",
        //"systems/vnv/templates/partials/character-sheet-progression.hbs",
        
        // Partial templates for common UI elements
        // "systems/vnv/templates/partials/actor-header.hbs",
        // "systems/vnv/templates/partials/tabs.hbs",
        // "systems/vnv/templates/partials/attribute-row.hbs",
        
        // Chat templates
        // "systems/vnv/templates/chat/roll-result.hbs",
        // "systems/vnv/templates/chat/damage-roll.hbs",
        
        // App templates
        //"systems/vnv/templates/apps/configuration-dialog.hbs",
    ];

    // Load all templates
    return loadTemplates(templatePaths);
}

// ==================== HANDLEBARS HELPERS ====================
/**
 * Registers custom Handlebars helpers for template rendering.
 * These helpers provide utility functions for templates.
 */
function registerHandlebarsHelpers() {
    // Helper to check if two values are equal
    Handlebars.registerHelper("equals", function(a, b) {
        return a === b;
    });

    // Helper to check if a string contains a substring
    Handlebars.registerHelper("contains", function(element, search) {
        return element.includes(search);
    });
    
    // Helper to check if a value exists
    Handlebars.registerHelper("exists", function(value) {
        return value !== null && value !== undefined;
    });
    
    // Helper to concatenate multiple strings
    Handlebars.registerHelper("concat", function(s1, s2, se = "") {
        return s1 + se + s2;
    });
    
    // Helper to check if a value is greater than the other
    Handlebars.registerHelper("isGreater", function(p1, p2) {
        return p1 > p2;
    });

    // Helper to check if a value is greater than or equal to the other
    Handlebars.registerHelper("isEqualORGreater", function(p1, p2) {
        return p1 >= p2;
    });

    // Helper to check if a value is one or the other
    Handlebars.registerHelper("ifOR", function(conditional1, conditional2) {
        return conditional1 || conditional2;
    });

    // Helper to log values to the console for debugging
    Handlebars.registerHelper("doLog", function(value) {
        console.log(value);
    });

    // Helper to convert string "true"/"false" to boolean true/false
    Handlebars.registerHelper("toBoolean", function(string) {
        return string === "true";
    });

    // Helper to create a for loop in Handlebars templates
    Handlebars.registerHelper("for", function(from, to, increment, content) {
        let result = "";

        for (let i = from; i <= to; i += increment) {
            result += content.fn(i);
        }
        return result;
    });

    // Helper to repeat a block of content a specified number of times
    Handlebars.registerHelper("times", function(n, content) {
        let result = "";

        for (let i = 0; i < n; i++) {
            result += content.fn(i);
        }
        return result;
    });

    // Helper to check if a value is not empty (null, undefined, or empty string)
    Handlebars.registerHelper("notEmpty", function(value) {
        if (value == 0 || value == "0") return true;
        if (value == null || value == "") return false;
        return true;
    });

    // Helper to convert strings to uppercase
    Handlebars.registerHelper("uppercase", function(str) {
        return str ? String(str).toUpperCase() : "";
    });

    // Helper to convert strings to lowercase
    Handlebars.registerHelper("lowercase", function(str) {
        return str ? String(str).toLowerCase() : "";
    });


    // Helper to check if value is in an array
    Handlebars.registerHelper("includes", function(array, value) {
        return array && array.includes(value);
    });

    // Helper to multiply two numbers
    Handlebars.registerHelper("multiply", function(a, b) {
        return a * b;
    });

    // Helper to add two numbers
    Handlebars.registerHelper("add", function(a, b) {
        return a + b;
    });

    // Helper to subtract two numbers
    Handlebars.registerHelper("subtract", function(a, b) {
        return a - b;
    });

    console.log("VNV | Handlebars helpers registered");
}

// ==================== DOCUMENT CLASS REGISTRATION ====================
/**
 * Registers custom document classes for Actors and Items.
 * These classes extend the base Foundry classes with system-specific logic.
 */
function registerDocumentClasses() {
    // TODO: Import and register custom Actor class
    // CONFIG.Actor.documentClass = CustomActor;

    // TODO: Import and register custom Item class
    // CONFIG.Item.documentClass = CustomItem;

    console.log("VNV | Document classes registered");
}

// ==================== SHEET CLASS REGISTRATION ====================
/**
 * Registers sheet classes for different actor and item types.
 * Sheets define how actors and items are displayed and edited.
 */
function registerSheetClasses() {
    // TODO: Import sheet classes
    // import { VNVCharacterSheet } from "./modules/sheets/vnvCharacterSheet.js";
    // import { VNVNPCSheet } from "./modules/sheets/npc-sheet.js";
    // import { VNVItemSheet } from "./modules/sheets/item-sheet.js";

    // Register character sheet
    // Actors.registerSheet("vnv", VNVCharacterSheet, { types: ["character"], makeDefault: true });

    // Register NPC sheet
    // Actors.registerSheet("vnv", VNVNPCSheet, { types: ["npc"], makeDefault: true });

    // Register item sheet
    // Items.registerSheet("vnv", VNVItemSheet, { makeDefault: true });

    console.log("VNV | Sheet classes registered");
}