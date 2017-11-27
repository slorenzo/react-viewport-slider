'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _Paginator = require('./Paginator');

var _Paginator2 = _interopRequireDefault(_Paginator);

var _scrollToY = require('scroll-to-y');

var _scrollToY2 = _interopRequireDefault(_scrollToY);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.state = { activeIndex: 1 };

    _this.setActive = _this.setActive.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.lastScroll = 0;

    window.addEventListener('scroll', _this.handleScroll);
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      if (this.isAnimating) {
        return;
      }

      var activeIndex = this.state.activeIndex;

      // up

      if (window.scrollY > this.lastScroll && window.innerHeight + window.scrollY > window.innerHeight * activeIndex + window.innerHeight / 2) {
        this.setActive(activeIndex + 1);
        // down
      } else if (window.scrollY < this.lastScroll && window.innerHeight + window.scrollY < window.innerHeight * activeIndex - window.innerHeight / 1.5) {
        this.setActive(activeIndex - 1);
      }

      this.lastScroll = window.scrollY;
    }
  }, {
    key: 'setActive',
    value: function setActive(index, scrollTo) {
      var _this2 = this;

      this.setState({ activeIndex: index }, function () {
        if (scrollTo) {
          _this2.isAnimating = true;
          (0, _scrollToY2.default)(_this2.refs['slide-' + index].offsetTop, 500, 'easeInOutQuint', function () {
            _this2.isAnimating = false;
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          paginator = _props.paginator;
      var activeIndex = this.state.activeIndex;


      if (!children) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'viewport-slider' },
        paginator && _react2.default.createElement(_Paginator2.default, {
          activeIndex: activeIndex,
          bullets: children.length,
          onClick: this.setActive
        }),
        children.map(function (child, key) {
          var index = key + 1;

          return _react2.default.createElement(
            'div',
            { ref: 'slide-' + index, key: index },
            _react2.default.cloneElement(child, {
              index: index,
              hideButton: index === children.length,
              onClick: _this3.setActive
            })
          );
        })
      );
    }
  }]);

  return Slider;
}(_react.Component);

exports.default = Slider;


Slider.defaultProps = {
  paginator: true
};

Slider.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  paginator: _propTypes2.default.bool
};

Slider.Item = _Item2.default;