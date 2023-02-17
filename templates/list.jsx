import Adapt from 'core/js/adapt';
import React from 'react';
import a11y from 'core/js/a11y';
import { templates, classes, compile } from 'core/js/reactHelpers';

export default function List({ _columns, _orderedList, _items, ...props }) {
  const hasColumns = _columns > 1;
  const {
    _id,
    _ariaLevel
  } = props;
  const itemAriaLevel = _.isNumber(_ariaLevel) && _ariaLevel !== 0 ? _ariaLevel + 1 : _ariaLevel;
  return (
    <div className="component__inner list__inner">
      <templates.header {...props} />
      <div className="component__widget list__widget">
        <div
          className={classes([
            'list__container',
            hasColumns && 'has-columns',
            _orderedList && 'is-ordered-list'
          ])}
          role="list"
        >
          {_items.map(({ _isActive, title, body, _classes, _graphic }, index) =>
            <div
              key={index}
              className={classes([
                'list-item',
                _isActive && 'is-animating',
                _graphic.src && 'has-image',
                _classes
              ])}
              role="listitem"
              style={(hasColumns && Adapt.device.screenSize === 'large' && { width: `${100 / _columns}%` }) || null}
            >
              <div className="list-item__inner">
                {!_graphic.src ?
                  <div className="list-item__bullet" aria-hidden="true"></div> :
                  <templates.image {..._graphic}
                    classNamePrefixes={['component-item', 'list-item']}
                    attributionClassNamePrefixes={['component', 'list']}
                  />
                }

                <div className="list-item__content">
                  {title &&
                    <div
                      className={classes([
                        'list-item__title',
                        body && 'has-margin'
                      ])}
                      role="heading"
                      aria-level={a11y.ariaLevel({ id: _id, level: 'componentItem', override: _ariaLevel ?? itemAriaLevel })}
                    >
                      <div className="list-item__title-inner" dangerouslySetInnerHTML={{ __html: compile(title, props) }} />
                    </div>
                  }

                  {body &&
                    <div className="list-item__body">
                      <div className="list-item__body-inner" dangerouslySetInnerHTML={{ __html: compile(body, props) }} />
                    </div>
                  }
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
