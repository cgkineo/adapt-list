import Adapt from 'core/js/adapt';
import React from 'react';
import { templates, classes, html, compile } from 'core/js/reactHelpers';

export default function List({ _columns, _orderedList, _items, ...props }) {
  const hasColumns = _columns > 1;

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
          {_items && _items.map(({ _isActive, _imageSrc, alt, title, body }, index) =>
            <div
              key={index}
              className={classes([
                'list__item',
                _isActive && 'is-animating'
              ])}
              role="listitem"
              style={(hasColumns && Adapt.device.screenSize === 'large' && { width: `${100 / _columns}%` }) || null}
            >
              <div className="list__item-inner">
                {!_imageSrc ?
                  <div className="list__item-bullet"></div> :
                  <templates.image
                    _src={_imageSrc}
                    alt={alt}
                    classNamePrefixes={[ 'list__item' ]}
                  />
                }
                <div className="list__item-content">
                  {title &&
                    <div className={classes([
                      'list__item-title',
                      body && 'has-margin'
                    ])}>
                      <div className="list__item-title-inner">{html(compile(title))}</div>
                    </div>
                  }
                  {body &&
                    <div className="list__item-body">
                      <div className="list__item-body-inner">{html(compile(body))}</div>
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
