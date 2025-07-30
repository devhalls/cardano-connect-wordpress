import React from "react"
import * as d3 from "d3";
import {hexbin} from "d3-hexbin";
import {classMap} from "../../library/utils";
import {AxisX} from "./AxisX";
import {AxisY} from "./AxisY";

export const Density2d = ({
    width,
    height,
    data,
    color,
    margin = {
        top: 58,
        right: 40,
        bottom: 80,
        left: 100
    },
    axisX,
    axisY,
    axisMax,
    binSize = 6
} : GraphDensity2dComponent<PoolData>) => {

    const boundsWidth = width - margin.right - margin.left;
    const boundsHeight = height - margin.top - margin.bottom;
    let maxX = 0
    let maxY = 0;
    data.map(a => {
        maxX = a.x > maxX ? a.x : maxX
        maxY = a.y > maxY ? a.y : maxY
        return a
    })
    maxX = axisMax ? axisMax(maxX) : maxX
    maxY = axisMax ? axisMax(maxY) : maxY

    const xScale = d3.scaleLinear().domain([0, maxX]).range([0, boundsWidth]);
    const yScale = d3.scaleLinear().domain([0, maxY]).range([boundsHeight, 0]);

    const hexbinGenerator = hexbin()
        .radius(binSize)
        .extent([
            [0, 0],
            [boundsWidth, boundsHeight],
        ]);

    const hexbinData = hexbinGenerator(
        data.map((item) => [xScale(item.x), yScale(item.y)])
    );

    const maxItemPerBin = Math.max(...hexbinData.map((hex) => hex.length));

    const colorScale = d3
        .scaleSqrt<string>()
        .domain([0, maxItemPerBin])
        .range(["black", "#cb1dd1"]);

    const opacityScale = d3
        .scaleLinear<number>()
        .domain([0, maxItemPerBin])
        .range([0.2, 1]);

    const getHexes = hexbinData.map((d, i) => {
        return (
            <path
                key={i}
                d={hexbinGenerator.hexagon()}
                transform={"translate(" + d.x + "," + d.y + ")"}
                opacity={1}
                stroke={"white"}
                fill={colorScale(d.length)}
                // fillOpacity={opacityScale(d.length)}
                strokeOpacity={opacityScale(d.length)}
                strokeWidth={0.5}
            />
        );
    });

    return (
        <div className={classMap.graphContainer} style={{width}}>
            <svg width={width} height={height}>
                <g transform={`translate(${[margin.left, margin.top].join(',')})`}>
                    <g transform={`translate(0, ${boundsHeight})`}>
                        <AxisX
                            xScale={xScale}
                            height={boundsHeight}
                            label={axisX?.label}
                            tick={axisX?.tick}
                            color={color}
                        />
                    </g>
                    <g>
                        <AxisY
                            yScale={yScale}
                            width={boundsWidth}
                            label={axisY?.label}
                            tick={axisY?.tick}
                            color={color}
                        />
                    </g>
                    {getHexes}
                </g>
            </svg>
        </div>
    )
}