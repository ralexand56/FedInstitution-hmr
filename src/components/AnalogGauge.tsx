import * as React from 'react';
import { Motion, spring, presets } from 'react-motion';

const styles = {
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: 140,
        height: 80,
        padding: 5,
    } as React.CSSProperties,
    leftContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 5,
        overflow: 'hidden',
    } as React.CSSProperties,
    rightContainer: {
        padding: 5,
        flex: 1,
    } as React.CSSProperties,
};

interface AnalogProps {
    value: number;
}

// const GaugeItem = (props: { ind: number, value: number }) => {
//     let { ind, value } = props;
//     let activeColor = 'red';

//     if (value > 30 && value < 80) {
//         activeColor = 'yellow';
//     } else if (value >= 80) {
//         activeColor = 'green';
//     } else {
//         activeColor = 'red';
//     }

//     return (
//         <div
//             style={
//                 {
//                     height: 5,
//                     backgroundColor: (value >= (10 - ind) * 10) ? activeColor : 'black',
//                     width: 40,
//                     borderRadius: 1,
//                     marginTop: 3,
//                 } as React.CSSProperties
//             }
//         />
//     );
// };

const renderGauges = (num: number, value: number) => {
    // let gauges = [];

    // for (let i = 0; i < num; i++) {
    //     gauges.push(
    //         <GaugeItem
    //             key={i}
    //             ind={i}
    //             value={value}
    //         />
    //     );
    // }

    // return gauges;
    return null;
};

export const AnalogGauge = (props: AnalogProps) => {
    let { value } = props;

    return (
        <Motion defaultStyle={{ x: 0 }} style={{ x: spring(value, presets.wobbly) }}>
            {
                newVal => <div style={styles.mainContainer}>

                <div style={styles.leftContainer}>
                    {
                        renderGauges(10, value)
                    }
                </div>
                <div style={styles.rightContainer}>
                    <h4>{newVal.x.toFixed(1)}%</h4>
                </div>
            </div>}
        </Motion>
    );
};

export default AnalogGauge;