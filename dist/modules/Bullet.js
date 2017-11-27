'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bullet = function Bullet(_ref) {
  var active = _ref.active,
      index = _ref.index,
      onClick = _ref.onClick;

  var style = {
    display: 'block',
    height: '20px',
    width: '20px'
  };

  var handleClick = function handleClick() {
    onClick(index, true);
  };

  var classes = (0, _classnames2.default)('viewport-slider-paginator-bullet', {
    'is-active': active
  });

  return _react2.default.createElement('a', {
    href: '#viewport-slide-' + index,
    className: classes,
    onClick: handleClick,
    style: style
  });
};

Bullet.propTypes = {
  active: _propTypes2.default.bool,
  index: _propTypes2.default.number.isRequired,
  onClick: _propTypes2.default.func
};

exports.default = Bullet;