import *  as React from 'react';
import { Component } from 'react';
import { TweenMax } from 'gsap';

interface Props {
    textSize?: number;
}

export default class Staggered extends Component<Props, {}> {

    render() {
        const { children } = this.props;

        if (children && (Array.isArray(children) || typeof children === 'string')) {
            return (
                <div>
                    {
                        this.renderChildren(children)
                    }
                </div>
            );
        } else {
            return null;
        }
    }

    renderChildren = (Children: React.ReactNode) => {
        if (Children) {
            if (typeof Children === 'string') {
                // const strArr = Children.split('');
                // const { textSize } = this.props;

                // <span
                //     key={i}
                //     style={{ opacity: style.opacity, fontSize: textSize ? `${textSize}em` : `2em` }}
                // >
                //     {strArr[i]}
                // </span>
                // );
                return null;
            } else {

                return null;
            }
        }
    }
}