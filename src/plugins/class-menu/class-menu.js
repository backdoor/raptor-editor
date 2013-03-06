/**
 * @fileOverview Contains the class menu class code.
 * @author  David Neilsen <david@panmedia.co.nz>
 * @author  Michael Robinson <michael@panmedia.co.nz>
 * @author Melissa Richards <melissa@panmedia.co.nz>
 */

/**
 * @class The select menu class.
 * @constructor
 * @augments select menu
 *
 * @param {Object} options
 */
function ClassMenu(options) {
    SelectMenu.call(this, {
        name: 'classMenu'
    });
}

ClassMenu.prototype = Object.create(SelectMenu.prototype);

/**
 * Initialises the class menu.
 *
 * @todo type and desc for result
 * @returns {unresolved} result
 */
ClassMenu.prototype.init = function() {
    var result = SelectMenu.prototype.init.call(this);
    if (typeof this.options.classes !== 'undefined' &&
            Object.keys(this.options.classes).length > 0) {
        this.raptor.bind('selectionChange', this.updateButton.bind(this));
        return result;
    }
};

/**
 * Toggles a given set of classes on a selection.
 *
 * @param {Object} classes
 */
ClassMenu.prototype.changeClass = function(classes) {
    selectionToggleBlockClasses(classes, [], this.raptor.getElement());
};

/**
 * Applies the class on click.
 *
 * @param event The click event to apply the class at.
 */
ClassMenu.prototype.apply = function(event) {
    this.raptor.actionApply(function() {
        this.changeClass([$(event.currentTarget).data('value')]);
    }.bind(this));
};

/**
 * Puts the selection into preview mode for the chosen class.
 *
 * @param event The click event to enable preview mode.
 */
ClassMenu.prototype.preview = function(event) {
    this.raptor.actionPreview(function() {
        this.changeClass([$(event.currentTarget).data('value')]);
    }.bind(this));
};

/**
 * Restores the selection from preview mode.
 *
 * @param event The click event to disable preview mode.
 */
ClassMenu.prototype.previewRestore = function(event) {
    this.raptor.actionPreviewRestore();
};
 /**
  * Updates the class menu button.
  */
ClassMenu.prototype.updateButton = function() {
};

//ClassMenu.prototype.getButton = function() {
//    if (!this.button) {
//        this.button = new Button({
//            name: this.name,
//            action: this.show.bind(this),
//            preview: false,
//            options: this.options,
//            icon: false,
//            text: 'Class Selector',
//            raptor: this.raptor
//        });
//    }
//    return this.button;
//};

/**
 * Prepare and return the menu items to be used in the Raptor UI.
 * @returns {Object} The menu items.
 */
ClassMenu.prototype.getMenuItems = function() {
    var items = '';
    for (var label in this.options.classes) {
        items += this.raptor.getTemplate('class-menu.item', {
            label: label,
            value: this.options.classes[label]
        });
    }
    return $(items)
        .click(this.apply.bind(this))
        .mouseenter(this.preview.bind(this))
        .mouseleave(this.previewRestore.bind(this));
};

Raptor.registerUi(new ClassMenu());