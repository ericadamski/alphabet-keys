import React, { Component } from "react";
import classnames from "classnames";
import styled from 'styled-components';

const SVG = styled.svg`
  fill: currentColor;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 8px;
`;

const Selector = styled.div`
  display: flex;
  overflow: hidden;
  padding: 4px;
  flex-direction: column;
`;

const BaseButton = styled.button`
  background: transparent;
  border: 0;
  box-shadow: none;
  color: currentColor;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  padding: 0;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;

const SelectorButton = styled(BaseButton)`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const SelectorListWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  display: flex;

  .is-open & {
    pointer-events: auto;
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;

const SelectorList = styled.ul`
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: #FFFFCC;
  padding: 20px;
`;

const SelectorListItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;

  &:first-child {
    margin-top: auto;
  }

  &:last-child {
    margin-bottom: auto;
  }
`;

const SelectorListButton = styled(BaseButton)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CloseButton = styled(BaseButton)`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

const Chevron = () => (
  <SVG viewBox="0 0 32 32" ariaHidden="true">
    <path d="M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z" />
  </SVG>
);

const Close = () => (
  <SVG viewBox="0 0 32 32" ariaHidden="true"><path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z"/></SVG>
);

class LanguageSelector extends Component {
  state = {
    open: false
  };

  onSelect = key => {
    const {onSelectLanguage} = this.props

    console.log(onSelectLanguage, key)
    onSelectLanguage(key)
    this.setState({
      open: false
    });
  };

  toggle = e => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  };

  close = e => {
    this.setState({
      open: false
    });
  };

  render() {
    const { open } = this.state;
    const { data, selected } = this.props;
    const { label } = data.filter(d => d.key === selected)[0]
    const css = classnames({
      "is-open": open
    });

    return (
      <Selector className={css}>
        <SelectorButton onClick={this.toggle}>
          {label} <Chevron />
        </SelectorButton>
        <SelectorListWrapper>
          <CloseButton onClick={this.close}>
            <Close />
          </CloseButton>
          <SelectorList>
            {data.filter(d => d.key !== selected).map(({ label, key }) => {
              return (
                <SelectorListItem key={key}>
                  <SelectorListButton onClick={e => this.onSelect(key)}>{label}</SelectorListButton>
                </SelectorListItem>
              );
            })}
          </SelectorList>
        </SelectorListWrapper>
      </Selector>
    );
  }
}

export default LanguageSelector;
