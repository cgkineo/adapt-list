define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  var ListView = ComponentView.extend({

    preRender: function() {
      this.checkIfResetOnRevisit();
    },

    postRender: function() {
      /* option to animate list items - except on touch devices */
      if (this.model.get('_animateList') && !$('html').hasClass('touch')) {
        this.$el.addClass('is-animated-list');
        this.$('.list__container').on('onscreen.animate', this.checkIfOnScreen.bind(this));
      }

      this.setReadyStatus();

      this.setupInviewCompletion('.component__widget');
    },

    checkIfResetOnRevisit: function() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    },

    /**
     * Kicks off the list item animation once the list container is at least 70% on screen
     */
    checkIfOnScreen: function(event, measurements) {
      if (measurements.percentFromTop >= 70) return;

      $(event.currentTarget).addClass('is-inview').off('onscreen.animate');

      this.animateListItems();
    },

    /**
     * animates the list items in one-by-one
     */
    animateListItems: function() {
      var $allListItems = this.$('.list__item');
      $allListItems.each(function(index, listItem) {
        setTimeout(function() {
          $(listItem).addClass('is-animating');
        }, 200 * index);
      });
    },

    remove: function() {
      this.$('.list__container').off('onscreen.animate');

      ComponentView.prototype.remove.call(this);
    }
  },
  {
    template: 'list'
  });

  return Adapt.register('list', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: ListView
  });

});
