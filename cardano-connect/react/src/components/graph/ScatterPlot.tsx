import React, {useEffect} from "react";
import * as d3 from "d3";
import {AxisX} from "./AxisX";
import {AxisY} from "./AxisY";
import {useCallback, useRef, useState} from "react";
import {classMap, formatNumberShort} from "../../library/utils";

export const ScatterPlot = ({
    width,
    height,
    data,
    color = '#D2D7D3',
    margin = {
        top: 58,
        right: 40,
        bottom: 80,
        left: 100
    },
    axisX,
    axisY,
    axisMax,
    scaleMax = 1000,
    ToolTip,
}: GraphScatterComponent<GraphPlot<PoolData>>) => {

    // Local state

    const boundsWidth = width - margin.right - margin.left;
    const boundsHeight = height - margin.top - margin.bottom;
    let maxX = 0
    let maxY = 0;
    data.map(a => {
        maxX = a.x > maxX ? a.x : maxX
        maxY = a.y > maxY ? a.y : maxY
    })
    maxX = axisMax ? axisMax(maxX) : maxX
    maxY = axisMax ? axisMax(maxY) : maxY

    const graph = useRef<SVGSVGElement>(null)
    const xAxis = useRef<SVGGElement>(null)
    const yAxis = useRef<SVGGElement>(null)
    const graphContainer = useRef<HTMLDivElement>(null)
    const tooltipContainer = useRef<HTMLDivElement>(null)
    const xScale = d3.scaleLinear().domain([0, maxX]).range([0, boundsWidth]);
    const yScale = d3.scaleLinear().domain([0, maxY]).range([boundsHeight, 0]);

    const [zoom, setZoom] = useState(null);
    const [plotToolTip, setPlotToolTip] = useState<GraphPlot<PoolData>|null>(null)
    const [hoverPosition, setHoverPosition] = useState<{x:number; y:number; dataX: number; dataY: number;}|null>(null)

    // Configure D3 zoom

    if (zoom) {
        xScale.domain(zoom.rescaleX(xScale).domain())
        yScale.domain(zoom.rescaleY(yScale).domain())
    }

    useEffect(() => {
        const d3Zoom = d3.zoom()
            .scaleExtent([1, scaleMax])
            .translateExtent([[0, 0], [boundsWidth, boundsHeight]])
            .extent([[0, 0], [boundsWidth, boundsHeight]])
            .on("zoom", ({ transform }) => {
                setZoom(transform);
            })
        d3.select(graph.current).call(d3Zoom)
            .on('mousemove', function(event) {
                const coords = d3.pointer( event );
                setHoverPosition({
                    x: coords[0] - margin.left,
                    y: coords[1] - margin.top,
                    dataX: xScale.invert(coords[0] - margin.left),
                    dataY: yScale.invert(coords[1] - margin.top)
                })
            });
    }, [
        xScale,
        yScale
    ]);

    // Methods

    const getPlots = data.map((d, i) => {
        return (
            <circle
                key={i}
                opacity={1}
                cx={xScale(d.x)}
                cy={yScale(d.y)}
                r={d.radius || 7}
                stroke={d.stroke || color}
                fill={d.fill || color}
                fillOpacity={d.fillOpacity || 0.2}
                strokeWidth={d.strokeWidth || 1}
                onClick={() => setPlotToolTip(d)}
            />
        );
    });
    const getPlotPosition = useCallback((plot: GraphPlot<PoolData>): { top: number; left: number } => {
        const containerHeight = graphContainer.current.offsetHeight
        const hoverHeight = tooltipContainer.current.offsetHeight
        const containerWidth = graphContainer.current.offsetWidth
        const hoverWidth = tooltipContainer.current.offsetWidth
        let plotPosition = {
            top: yScale(plot.y) + margin.top + plot.radius,
            left: xScale(plot.x) + margin.left + plot.radius
        }
        const diffHeight = (plotPosition.top + hoverHeight) - containerHeight - margin.top + margin.bottom;
        const diffWidth = (plotPosition.left + hoverWidth) - containerWidth - margin.right + margin.left;

        // Out of bounds height

        if (diffHeight > 0) {
            plotPosition.top = plotPosition.top-diffHeight
        }

        // Out of bounds width

        if (diffWidth > 0) {
            plotPosition.left = plotPosition.left - (hoverWidth) -+plot.radius
        }

        return plotPosition
    }, [yScale, xScale, margin, graphContainer, tooltipContainer])

    return (
        <div ref={graphContainer} className={classMap.graphContainer} style={{width}}>
            <svg ref={graph} width={width} height={height}>
                <g transform={`translate(${[margin.left, margin.top].join(',')})`}>
                    <g ref={xAxis} transform={`translate(0, ${boundsHeight})`}>
                        <AxisX
                            xScale={xScale}
                            height={boundsHeight}
                            label={axisX?.label}
                            tick={axisX?.tick}
                            color={color}
                        />
                    </g>
                    <g ref={yAxis}>
                        <AxisY
                            yScale={yScale}
                            width={boundsWidth}
                            label={axisY?.label}
                            tick={axisY?.tick}
                            color={color}
                        />
                    </g>
                    {(hoverPosition?.y > 0 && hoverPosition?.y < boundsHeight) ? <g transform={`translate(0, ${hoverPosition.y})`}>
                        <path stroke="green" d={`M0 0 l${boundsWidth} 0`} strokeDasharray="4,4"/>
                    </g> : null}
                    {(hoverPosition?.x > 0 && hoverPosition?.x < boundsWidth) ? <g transform={`translate(${hoverPosition.x}, ${0})`}>
                        <path stroke="green" d={`M0 0 V${boundsHeight} 0`} strokeDasharray="6,6"/>
                    </g> : null}
                    <g>
                        {getPlots}
                    </g>
                </g>
            </svg>
            {!plotToolTip && (hoverPosition?.y > 0 && hoverPosition?.y < boundsHeight) && (hoverPosition?.x > 0 && hoverPosition?.x < boundsWidth) ? (
                <div className={classMap.graphHover} style={{ right: margin.right, top: hoverPosition.y + margin.top + 8}}>
                    <div>
                        <span>{axisY.label.label}:</span> {formatNumberShort(hoverPosition.dataY, null, 2)}
                    </div>
                    <div>
                        <span>{axisX.label.label}:</span> {formatNumberShort(hoverPosition.dataX, null, 2)}
                    </div>
                </div>
            ) : null}
            <div ref={tooltipContainer} className={classMap.plotContainer}
                 style={{
                     opacity: plotToolTip ? 1 : 0,
                     pointerEvents: plotToolTip ? 'initial' : 'none',
                     top: plotToolTip ? getPlotPosition(plotToolTip).top : 0,
                     left: plotToolTip ? getPlotPosition(plotToolTip).left : 0
                 }}>
                <ToolTip plot={plotToolTip} hide={() => setPlotToolTip(null)}/>
            </div>
        </div>
    )
}