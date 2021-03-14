import React from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryCandlestick } from "victory-native";
import Svg, {Line} from 'react-native-svg';
import { colors } from '../Styles/colors'


function formatLineChartData(data) {
    var chartData = [];
    for (var i = 0; i < data.length; i++) {
      var timestamp = data[i].timestamp;
      var datapoint = {x: new Date(timestamp), y: data[i].assetTotal};
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

function TransactionGraph({lineChartData, renderLabel}) {
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
    lineChartData = lineChartData.filter(data => data.y)
  
    return (
        <VictoryChart theme={chartTheme} containerComponent={<VictoryVoronoiContainer/>}>
  
            <VictoryLine
                height={300} 
                domainPadding={{y: [8, 8]}} 
                padding={{ top: 5, bottom: 10 }} 
                theme={VictoryTheme.material} 
                data={lineChartData}
                labels={renderLabel}
                style={{data: {stroke: "white", strokeWidth: 1}}}
            />
        </VictoryChart> 
    )
}
  
export {formatLineChartData, TransactionGraph, LineGraph}