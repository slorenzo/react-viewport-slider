'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
  var children = _ref.children,
      index = _ref.index,
      onClick = _ref.onClick;

  var style = {
    bottom: '50px',
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    zIndex: 2
  };

  var handleClick = function handleClick() {
    onClick(index + 1, true);
  };

  return _react2.default.createElement(
    'a',
    {
      className: 'viewport-slider-button',
      onClick: handleClick,
      style: style
    },
    children
  );
};

Button.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  index: _propTypes2.default.number.isRequired,
  onClick: _propTypes2.default.func
};

exports.default = Button;