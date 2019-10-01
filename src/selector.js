import React, { Component } from "react";
import styled from 'styled-components';

import { Close } from './icon/close'
import { Chevron } from './icon/chevron';

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
