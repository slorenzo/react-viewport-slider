'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function Item(props) {
  var buttonLabel = props.buttonLabel,
      className = props.className,
      children = props.children,
      hideButton = props.hideButton,
      index = props.index,
      onClick = props.onClick,
      style = props.style;


  var itemStyle = {
    boxSizing: 'border-box',
    height: '100vh',
    position: 'relative',
    width: '100%'
  };

  var classes = (0, _classnames2.default)('viewport-slider-item', 'viewport-slider-item-' + index, className);

  var propsClone = Object.create(props || {});
  delete propsClone.children;

  var renderButton = function renderButton() {
    return _react2.default.createElement(
      _Button2.default,
      { index: index, onClick: onClick },
      buttonLabel
    );
  };

  return _react2.default.createElement(
    'div',
    _extends({}, propsClone, {
      className: classes,
      style: Object.assign(itemStyle, style)
    }),
    children,
    hideButton ? null : renderButton()
  );
};

Item.defaultProps = {
  buttonLabel: 'next',
  hideButton: false,
  style: {}
};

Item.propTypes = {
  buttonLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.object]),
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  hideButton: _propTypes2.default.bool,
  index: _propTypes2.default.number,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  onClick: _propTypes2.default.func
};

exports.default = Item;