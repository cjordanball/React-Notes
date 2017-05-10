import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

const average = (data) => {
	const len = data.length;
	const mean = data.reduce((val1, val2) => val1 + val2, 0) / len;
	return Math.round(mean);
};

const Chart = props => (
	<td>
		<Sparklines svgHeight={60} svgWidth={90} data={props.data}>
			<SparklinesLine color={props.color} />
			<SparklinesReferenceLine type="avg" />
		</Sparklines>
		<div>{average(props.data)} {props.units}</div>
	</td>
);

export default Chart;
