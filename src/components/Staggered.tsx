import *  as React from 'react';
import { Component } from 'react';
import { StaggeredMotion, PlainStyle } from 'react-motion';

export default class Staggered extends Component<Element[], {}> {

    render() {
        const { children } = this.props;

        return (
            <StaggeredMotion
                defaultStyles={(children) => this.getDefaultStyles()}
                styles={
                    prevInterpolatedStyles => prevInterpolatedStyles!.map((_, i) => {
                        return i === 0
                            ? { h: spring(100) }
                            : { h: spring(prevInterpolatedStyles![i - 1].h) };
                    })
                }
            >
                {children}
            </StaggeredMotion>
        );

    }

    getDefaultStyles = (children: Element[]) => {
        if (this.props && this.props.children) {
            return children.map((child) => { opacity: 0 });
        }
    }
}