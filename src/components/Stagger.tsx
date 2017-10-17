import * as React from 'react';
import { Component } from 'react';
import { TweenMax } from 'gsap';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: scroll;
`;

export default class Stagger extends Component<{}, {}> {
    node: React.ReactNode;

    componentWillUpdate() {
        TweenMax.staggerFrom('.gs', 0.7, { autoAlpha: 0 }, 0.3);
    }

    render() {
        let { children } = this.props;

        if (!Array.isArray(children)) {
            return null;
        }

        if (typeof children === 'string') {
            return null;
        }

        return (
            <MainContainer>
                {
                    this.renderChildren(React.Children.toArray(children))
                }
            </MainContainer>
        );
    }

    renderChildren(children: React.ReactChild[]) {
        if (!children) {
            return null;
        }

        return children.map((child: React.ReactChild, i) => {
            if (typeof child === 'string' || typeof child === 'number') {
                return null;
            }

            return React.cloneElement(child, { ...child.props, key: i, className: 'gs' });
        });
    }
}