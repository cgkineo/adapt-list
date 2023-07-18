import ComponentView from 'core/js/views/componentView';

class ListView extends ComponentView {

  className() {
    let classes = super.className();
    // don't animate when Visua11y 'no animations' is set
    if (this.model.get('_animateList') && (!$('html').hasClass('a11y-no-animations'))) {
      classes += ' is-animated-list';
    }

    return classes;
  }

  postRender() {
    this.setReadyStatus();
    this.setupInviewCompletion('.component__widget');
    this.contentAlignment();

    if (this.model.get('_animateList') && (!$('html').hasClass('a11y-no-animations'))) {
      this.$('.list__container').on('onscreen.animate', this.checkIfOnScreen.bind(this));
    }
  }

  contentAlignment() {
    const _horizontalAlignment = this.model.get('_itemHorizontalAlignment');
    const _bulletAlignment = this.model.get('_bulletAlignment');

    if (_horizontalAlignment) this.$el.addClass(`item-justify-${_horizontalAlignment}`);
    if (_bulletAlignment) this.$el.addClass(`bullet-align-${_bulletAlignment}`);
  }

  /**
   * Kicks off the list item animation once the list container is at least xx% on screen
   */
  checkIfOnScreen({ currentTarget }, options) {
    const { onscreen, percentInviewVertical } = options;
    if (!onscreen || percentInviewVertical < this.model.get('_percentInviewVertical')) return;

    $(currentTarget).off('onscreen.animate');
    this.animateListItems();
  }

  /**
   * animates the list items in one-by-one
   */
  animateListItems() {
    this.model.getChildren().forEach((listItem, index) => {
      setTimeout(listItem.toggleActive.bind(listItem, true), 200 * index);
    });
  }

  remove() {
    this.$('.list__container').off('onscreen.animate');

    super.remove();
  }
};

ListView.template = 'list.jsx';

export default ListView;
