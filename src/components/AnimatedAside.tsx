import { Motion, spring, presets } from 'react-motion';
import * as React from 'react';
import { Button } from 'antd';

const styles = {
    aside: {
        boxShadow: '-3px 0px 5px',
        top: 0,
        right: 0,
        bottom: 0,
        overflowY: 'hidden',
        padding: 10,
        position: 'absolute',
    } as React.CSSProperties
};

const AnimatedAside = (props: { isOn: boolean, toggle: () => void, children?: {}, bgColor?: string }) => {
    let {
        isOn,
        toggle,
        bgColor
    } = props;

    return (
        <Motion
            defaultStyle={{ right: 0, opacity: 1 }}
            style={
                {
                    right: isOn ? spring(0, presets.gentle) : spring(-400, presets.gentle),
                    opacity: isOn ? spring(1, presets.gentle) : spring(0.5, presets.gentle),
                }
            }
        >
            {
                m =>
                    <div
                        style={{
                            ...styles.aside,
                            marginRight: m.right,
                            opacity: m.opacity,
                            backgroundColor: bgColor || '#666666'
                        }}
                    >
                        <Button onClick={toggle} ghost={true}>X</Button>
                        {props.children}
                    </div>
            }
        </Motion >);
};

export default AnimatedAside;