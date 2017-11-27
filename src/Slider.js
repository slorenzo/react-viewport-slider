'use strict';

import PropTypes from 'prop-types';

import React, { Component } from 'react';

import Item from './Item';
import Paginator from './Paginator';
import scrollToY from 'scroll-to-y';

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = { activeIndex: 1 };

    this.setActive = this.setActive.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.lastScroll = 0;

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.isAnimating) {
      return;
    }

    const { activeIndex } = this.state;

    // up
    if (
      window.scrollY > this.lastScroll &&
      window.innerHeight + window.scrollY >
        window.innerHeight * activeIndex + window.innerHeight / 2
    ) {
      this.setActive(activeIndex + 1);
      // down
    } else if (
      window.scrollY < this.lastScroll &&
      window.innerHeight + window.scrollY <
        window.innerHeight * activeIndex - window.innerHeight / 1.5
    ) {
      this.setActive(activeIndex - 1);
    }

    this.lastScroll = window.scrollY;
  }

  setActive(index, scrollTo) {
    this.setState({ activeIndex: index }, () => {
      if (scrollTo) {
        this.isAnimating = true;
        scrollToY(
          this.refs[`slide-${index}`].offsetTop,
          500,
          'easeInOutQuint',
          () => {
            this.isAnimating = false;
          }
        );
      }
    });
  }

  render() {
    const { 
      children,
      paginator
    } = this.props;
    const { activeIndex } = this.state;

    if (!children) {
      return null;
    }

    return (
      <div className="viewport-slider">
        { paginator && <Paginator
          activeIndex={activeIndex}
          bullets={children.length}
          onClick={this.setActive}
        />
      }

        {children.map((child, key) => {
          let index = key + 1;

          return (
            <div ref={`slide-${index}`} key={index}>
              {React.cloneElement(child, {
                index,
                hideButton: index === children.length,
                onClick: this.setActive
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

Slider.defaultProps = {
  paginator: true
};

Slider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  paginator: PropTypes.bool
};

Slider.Item = Item;
