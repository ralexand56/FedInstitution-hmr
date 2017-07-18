import *  as React from 'react';
import { Component } from 'react';
import { StaggeredMotion, PlainStyle, spring } from 'react-motion';

interface Props {
    textSize?: number;
}

export default class Staggered extends Component<Props, {}> {

    render() {
        const { children } = this.props;

        if (children && (Array.isArray(children) || typeof children === 'string')) {
            const styles = this.getDefaultStyles(children);

            console.dir(styles);
            return (
                <StaggeredMotion
                    defaultStyles={styles}
                    styles={prevInterpolatedStyles => prevInterpolatedStyles!.map((_, i) => {
                        return  { h: spring(1)  };
                    })}
                >
                    {
                        (interpolatingStyles: PlainStyle[]) =>
                            <div>
                                {
                                    this.renderChildren(interpolatingStyles, children)
                                }
                            </div>
                    }
                </StaggeredMotion>
            );
        } else {
            return null;
        }
    }

    renderChildren = (styles: PlainStyle[], Children: React.ReactNode) => {
        if (Children) {
            if (typeof Children === 'string') {
                const strArr = Children.split('');
                const { textSize } = this.props;

                return styles.map((style, i) => (
                    <span
                        key={i}
                        style={{ opacity: style.opacity, fontSize: textSize ? `${textSize}em` : `2em` }}
                    >
                        {strArr[i]}
                    </span>)
                );
            } else {
                // console.dir(Children);
                return styles.map((style, i) => {
                    if (Children[i]) {
                        return React.cloneElement(Children[i], {
                            key: Children[i].key,
                            style: { ...Children[i].props.style, opacity: style.opacity }
                        });
                    }

                    return null;
                });
            }
        } else {
            return null;
        }
    }

    getDefaultStyles = (children: {}[] | string): PlainStyle[] | undefined => {
        if (children) {
            if (typeof children === 'string') {
                return children.toString().split('').map((child) => {
                    return { opacity: 0 };
                });
            } else {
                return children.map((child) => {
                    return { opacity: 0 };
                });
            }
        }

        return undefined;
    }
}