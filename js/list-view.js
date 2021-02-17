define([
  'core/js/adapt',
  'core/js/views/componentView'
], function (Adapt, ComponentView) {

  var ListView = ComponentView.extend({

    preRender: function () {
      this.checkIfResetOnRevisit();
      this.listenTo(Adapt, 'device:resize', this.resizeControl);
    },

    postRender: function () {
      this.setReadyStatus();

      this.setupInviewCompletion('.component__widget');

      this.setUpColumns();

      if (!this.model.get('_animateList')) return;

      this.$el.addClass('is-animated-list');
      this.$('.list__container').on('onscreen.animate', this.checkIfOnScreen.bind(this));
    },

    resizeControl: function () {
      this.setUpColumns();
    },

    setUpColumns: function () {
      var columns = this.model.get('_columns');

      if (columns < 2) return;

      var isLarge = Adapt.device.screenSize === 'large';
      this.$('.list__item').css('width', isLarge ? (100 / columns) + '%' : '');
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