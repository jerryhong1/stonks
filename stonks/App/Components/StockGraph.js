import React from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryCandlestick } from "victory-native";
import Svg, {Line} from 'react-native-svg';
import { colors } from '../Styles/colors'

//converts milliseconds to date time 
function convertMillisToDay(millis) {
    var date = new Date(millis); 
    var prettyDate = date.toString().slice(4, 10) + " " + formatAMPM(date)
    return prettyDate; //returns string in format [month date time] ie Feb 22 2:00 PM
  }

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function formatLineChartData(data) {
    var chartData = [];
    for (var i = 0; i < data.length; i++) {
      var timestamp = data[i].timestamp;
      var label = convertMillisToDay(timestamp) + "\n $" + (data[i].assetTotal.toFixed(2)).toString()// t is the Unix Msec timestamp for the start of the aggregate window
      var datapoint = {x: new Date(timestamp), y: data[i].assetTotal, label: label};
      chartData.push(datapoint);
    }
    return chartData;
  }

function LineGraph({data, renderLabel}) {
    // TODO: set color based on the graph
    let strokeColor = colors.RED;
    return   (
    <VictoryGroup theme={VictoryTheme.material} height={150} domainPadding={{y: [0, 50]}} padding={{ top: 0, bottom: 0 }} containerComponent={<VictoryVoronoiContainer voronoiDimension="x"/>}>
        <VictoryLine 
        labelComponent={ renderLabel ? <VictoryTooltip renderInPortal={false} flyoutComponent={<CustomFlyout/>}
                            flyoutStyle={{stroke: "none", fill: "black"}} y={45}
                            style={{fill: "white", fontSize: 11, fontFamily: "Helvetica Neue"}}/> : null}
        labels={renderLabel}
        style={{data: { stroke: strokeColor, strokeWidth: 1.5 } }}
        theme={VictoryTheme.material}
        data={data}
        x="x"
        y="y"
        />
    </VictoryGroup>
    )
}


class CustomFlyout extends React.Component {
    render() {
        const {x, y} = this.props;
        return ( //svg height and width are hard coded right now 
        <Svg height="800" width="500" style="overflow: visible"> 
            <Line x1={x} y1="30" x2={x} y2="300" stroke="gray" strokeWidth="1" />
        </Svg>
        );
    }
}

function TransactionGraph({lineChartData, height, width}) {
    const chartTheme = {
        axis: {
          style: {
            tickLabels: {
                fill: 'white',
                padding: 10,
            },
            axis: {
                stroke: "#756f6a"
            },
          },
        },
    };
    // catch cases where y is undefined (for legacy accounts)
    // lineChartData = lineChartData.filter(data => data.y)
    return (
        <VictoryGroup theme={VictoryTheme.material} height={height} width={width} domainPadding={{y: [0, 50]}} padding={{ top: 0, bottom: 0, left:0, right:0}} containerComponent={<VictoryVoronoiContainer voronoiDimension="x"/>}>
            <VictoryLine 
            labelComponent={ <VictoryTooltip renderInPortal={false} flyoutComponent={<CustomFlyout/>}
                                flyoutStyle={{stroke: "none", fill: "black"}} y={45}
                                style={{fill: "white", fontSize: 11, fontFamily: "Helvetica Neue"}}/>}
            labels={({ datum }) => datum.x + datum.label}
            style={{data: { stroke: "#ff3a3d", strokeWidth: 1.5 } }}
            theme={VictoryTheme.material}
            data={lineChartData}
            x="x"
            y="y"
            />
        </VictoryGroup> 
    )
}
  
export {formatLineChartData, TransactionGraph, LineGraph}