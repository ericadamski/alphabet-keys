import React, { Component } from "react";
import styled from 'styled-components';

const SVG = styled.svg`
  fill: currentColor;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 8px;
`;

const Container = styled.div`
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
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const SelectorListWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  display: flex;

  ${({ isOpen }) => {
	if (isOpen) {
	  return `
		pointer-events: auto;
		opacity: 1;
		transition: opacity 0.5s ease;
	  `;
	}

	return undefined;
  }}
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
  overflow: auto;
`;

const SelectorListItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px 0;
  flex-grow: 0;
  flex-shrink: 0;

  &:first-child {
    margin-top: auto;
  }

  &:last-child {
    margin-bottom: auto;
  }
`;

const SelectorButton = styled(BaseButton)`
  margin: 0 10px;
`;

const SelectorListButton = styled(BaseButton)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CloseButton = styled(BaseButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Chevron = () => (
  <SVG viewBox="0 0 32 32" ariaHidden="true">
    <path d="M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z" />
  </SVG>
);

const Close = () => (
  <SVG viewBox="0 0 32 32" ariaHidden="true"><path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z"/></SVG>
);

class Selector extends Component {
  state = {
    open: false
  };

  onSelect = key => {
	this.props.onSelect(key);

    this.setState({
      open: false
    });
  };

  toggle = () => {
	console.log(this.state.open);
    this.setState((state) => ({
      open: !state.open
    }));
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

    return (
      <Container>
        <SelectorButton onClick={this.toggle}>
          {label} <Chevron />
        </SelectorButton>
        <SelectorListWrapper isOpen={open}>
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
      </Container>
    );
  }
}

export default Selector;
