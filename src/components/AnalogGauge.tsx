import * as React from 'react';

const styles = {
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'salmon',
        width: 80,
        height: 80,
        padding: 5,
    } as React.CSSProperties,
    leftContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 40,
        borderStyle: 'solid',
        borderWidth: 0,
        overflow: 'hidden',
    } as React.CSSProperties,
    rightContainer: {

    } as React.CSSProperties,
};

interface AnalogProps {
    value: number;
}

const GaugeItem = (props: { ind: number, value: number }) => {
    let { ind, value } = props;

    return (
        <div
            style={
                {
                    height: 5,
                    backgroundColor: (value >= (10 - ind) * 10) ? 'red' : 'black',
                    width: 40,
                    borderRadius: 1,
                    marginTop: 3,
                } as React.CSSProperties
            }
        />
    );
};

const renderGauges = (num: number, value: number) => {
    let gauges = [];

    for (let i = 0; i < num; i++) {
        gauges.push(
            <GaugeItem
                key={i}
                ind={i}
                value={value}
            />
        );
    }

    return gauges;
};

export const AnalogGauge = (props: AnalogProps) => {
    let { value } = props;

    return (
        <div style={styles.mainContainer}>

            <div style={styles.leftContainer}>
                {
                    renderGauges(10, value)
                }
            </div>
            <div>
                <h4>{value}%</h4>
            </div>
        </div>
    );
};

export default AnalogGauge;