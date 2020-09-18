define([
  'core/js/views/componentView'
], function (ComponentView) {

  var ListView = ComponentView.extend({

    preRender: function () {
      this.checkIfResetOnRevisit();
    },

    postRender: function () {
      this.setReadyStatus();

      this.setupInviewCompletion('.component__widget');

      if (!this.model.get('_animateList')) return;

      this.$el.addClass('is-animated-list');
      this.$('.list__container').on('onscreen.animate', this.checkIfOnScreen.bind(this));
    },

    checkIfResetOnRevisit: function () {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    },

    /**
     * Kicks off the list item animation once the list container is at least xx% on screen
     */
    checkIfOnScreen: function (event, measurements) {
      const percentage = this.model.get('_percentInviewVertical') || 70;
      if (measurements.percentInviewVertical < percentage) return;

      $(event.currentTarget).addClass('is-inview').off('onscreen.animate');

      this.animateListItems();
    },

    /**
     * animates the list items in one-by-one
     */
    animateListItems: function () {
      if (this.$el.hasClass('has-animated')) return;

      this.$('.list__item').each(function (index, listItem) {
        setTimeout(function () {
          $(listItem).addClass('is-animating');
        }, 200 * index);
      });

      this.$el.addClass('has-animated');
    },

    remove: function () {
      this.$('.list__container').off('onscreen.animate');

      ComponentView.prototype.remove.call(this);
    }
  }, {
    template: 'list'
  });

  return ListView;

});