import { Motion, spring, presets } from 'react-motion';
import * as React from 'react';

const styles = {
    aside: {
        top: 0,
        right: 0,
        bottom: 0,
        overflowY: 'auto',
        padding: 10,
        position: 'absolute',
        borderLeft: 'solid 1px',
    } as React.CSSProperties
};

const AnimatedAside = (props: { isOn: boolean, toggle: () => void,  children?: {} }) => {
    let { isOn, toggle } = props;

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
                    <div style={{ ...styles.aside, marginRight: m.right, opacity: m.opacity }}>
                        <button onClick={toggle}>X</button>
                        {props.children}
                    </div>
            }
        </Motion >);
};

export default AnimatedAside;