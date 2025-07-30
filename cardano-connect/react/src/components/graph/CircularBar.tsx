import React from "react";
import * as d3 from "d3";

export const CircularBar = ({
    width,
    height,
    data,
    color = '#9d174d',
    axisMax,
    innerRadius = 120,
    barSpacing = 0, // decimal
    ToolTip
}: GraphCircularBarComponent<GraphPlot<PoolData>>) => {

    let maxY = 0;
    data.map(a => {
        maxY = a.y > maxY ? a.y : maxY
        return a
    })
    maxY = axisMax ? axisMax(maxY) : maxY

    const dataGroups = data.sort((a, b) => a.y - b.y).map(a => a.id)
    const xScale = d3
        .scaleBand()
        .domain(dataGroups)
        .range([0, 2 * Math.PI])
        .padding(barSpacing)

    const yScale = d3
        .scaleRadial()
        .domain([0, maxY])
        .range([innerRadius, Math.min(height, width) / 2])

    const arcPathGenerator = d3.arc();
    const getBars = data.map((group, i) => {
        const path = arcPathGenerator({
            innerRadius: innerRadius,
            outerRadius: yScale(group.y),
            startAngle: xScale(group.id),
            endAngle: xScale(group.id) + xScale.bandwidth(),
        });
        return (
            <g key={i}>
                <path
                    d={path}
                    opacity={group.opacity || 0.7}
                    stroke={group.stroke || color}
                    fill={group.fill || color}
                    fillOpacity={0.3}
                    strokeWidth={1}
                    rx={1}
                />
            </g>
        );
    });

    return (
        <div>
            <svg width={width} height={height}>
                <g
                    transform={
                        "translate(" +
                        (width / 2) +
                        "," +
                        (height / 2) +
                        ")"
                    }
                >
                    {getBars}
                </g>
            </svg>
        </div>
    );
}
